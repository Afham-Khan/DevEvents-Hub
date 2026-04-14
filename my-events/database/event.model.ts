import { Schema, model, models, Document } from 'mongoose';

// TypeScript interface
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ['online', 'offline', 'hybrid'],
      required: true,
    },
    audience: {
      type: String,
      required: true,
    },
    agenda: {
      type: [String],
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ FIXED (no async + next conflict)
EventSchema.pre('save', function () {
  const event = this as IEvent;

  if (event.isModified('title') || event.isNew) {
    event.slug = event.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  }
});

const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;