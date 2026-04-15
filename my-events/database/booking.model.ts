import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

// Interface
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// ✅ FIXED (ONLY async, no next)
BookingSchema.pre('save', async function () {
  const booking = this as IBooking;

  if (booking.isModified('eventId') || booking.isNew) {
    const eventExists = await Event.findById(booking.eventId);

    if (!eventExists) {
      throw new Error('Event does not exist');
    }
  }
});

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;