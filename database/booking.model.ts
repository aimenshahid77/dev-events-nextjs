import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * Interface representing the Booking document structure in TypeScript.
 */
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        // Validation regex for standard email layout
        validator: (email: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: (props) => `"${props.value}" is not a valid email address!`,
      },
    },
  },
  {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Index on eventId to speed up lookup/join queries for bookings of specific events
bookingSchema.index({ eventId: 1 });

/**
 * Pre-save middleware to verify reference integrity.
 * Since this is an async function, we can throw Errors directly to reject the save operation.
 */
bookingSchema.pre<IBooking>("save", async function () {
  // Only verify reference existence if eventId is modified or is new
  if (this.isModified("eventId")) {
    // Dynamic import or mongoose models lookup avoids circular dependencies
    const Event = mongoose.models.Event || mongoose.model("Event");
    
    const eventExists = await Event.exists({ _id: this.eventId });
    if (!eventExists) {
      throw new Error(`Referenced Event with ID "${this.eventId}" does not exist.`);
    }
  }
});

// Prevention of duplicate model compiling when hot-reloading in Next.js development
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
