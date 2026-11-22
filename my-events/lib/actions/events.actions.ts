'use server';

import connectDB from '@/lib/mongodb';
import { Event, Booking } from '@/database';

// Plain, serializable event shape that is safe to pass to Client Components.
export type EventItem = {
    _id: string;
    title: string;
    image: string;
    slug: string;
    date: string;
    time: string;
    location: string;
    venue?: string;
    mode: string;
    audience: string;
    overview: string;
    description: string;
    agenda: string[];
    organizer: string;
    tags: string[];
};

// Mongoose docs contain ObjectIds/Dates that can't cross the server/client boundary.
const toPlain = <T,>(data: unknown): T => JSON.parse(JSON.stringify(data));

// Some older events stored lists as one comma-joined string ("a,b,c"); split + trim them.
const normalizeList = (list: string[] = []): string[] =>
    list.flatMap((item) => item.split(',')).map((s) => s.trim()).filter(Boolean);

const normalizeEvent = (event: EventItem): EventItem => ({
    ...event,
    tags: normalizeList(event.tags),
    agenda: normalizeList(event.agenda),
});

export const getAllEvents = async (): Promise<EventItem[]> => {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 }).lean();
        return toPlain<EventItem[]>(events);
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return [];
    }
};

export const getEventBySlug = async (slug: string): Promise<EventItem | null> => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug: slug.trim().toLowerCase() }).lean();
        return event ? normalizeEvent(toPlain<EventItem>(event)) : null;
    } catch (error) {
        console.error('Failed to fetch event:', error);
        return null;
    }
};

export const getSimilarEventsBySlug = async (slug: string): Promise<EventItem[]> => {
    try {
        await connectDB();
        const all = toPlain<EventItem[]>(await Event.find().sort({ createdAt: -1 }).lean())
            .map(normalizeEvent);

        const current = all.find((e) => e.slug === slug);
        if (!current) return [];

        const tags = new Set(current.tags.map((t) => t.toLowerCase()));
        return all
            .filter((e) => e.slug !== slug && e.tags.some((t) => tags.has(t.toLowerCase())))
            .slice(0, 3);
    } catch (error) {
        console.error('Failed to fetch similar events:', error);
        return [];
    }
};

export const getBookingsCount = async (eventId: string): Promise<number> => {
    try {
        await connectDB();
        return await Booking.countDocuments({ eventId });
    } catch (error) {
        console.error('Failed to count bookings:', error);
        return 0;
    }
};

export const createBooking = async (
    eventId: string,
    email: string,
): Promise<{ success: boolean; message?: string }> => {
    try {
        await connectDB();
        await Booking.create({ eventId, email });
        return { success: true };
    } catch (error) {
        console.error('Failed to create booking:', error);
        return { success: false, message: 'Booking failed, please try again.' };
    }
};
