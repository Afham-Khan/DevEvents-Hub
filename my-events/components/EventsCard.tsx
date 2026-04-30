"use client";

import Link from "next/link";
import Image from "next/image";

interface Props {
    // typescripts wants to know what will be the types of props so u should declare at very first
    title: string;
    image: string;
    slug: string;
    date: string;
    time: string;
    location: string;
}

const EventsCard = ({ title, image, slug, date, time, location }: Props) => {
    // typescripts wants to know what will be the types of props so u should declare at very first
    return (
        <Link href={`/events/${slug}`} id="event-card">
            <Image
                src={image}
                alt={title}
                width={410}
                height={1300}
                className="poster"
            />

            <div className="flex flex-row gap-2">
                <img src="/icons/pin.svg" alt="location" width={14} height={14} />
                <p>{location}</p>
            </div>

            <p className="title">{title}</p>

            <div className="datetime">
                <div>
                    <img src="/icons/clock.svg" alt="clock" width={14} height={14} />
                    {time}
                </div>
                <div>
                    <img src="/icons/calendar.svg" alt="calendar" width={14} height={14} />
                    {date}
                </div>
            </div>

        </Link>
    );
};

export default EventsCard;
