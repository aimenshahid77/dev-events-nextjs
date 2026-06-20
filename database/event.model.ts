import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * Interface representing the Event document structure in TypeScript.
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // Stored in normalized ISO format
  time: string; // Stored in normalized consistent format
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image path or URL is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      trim: true,
    },
    mode: {
      type: String,
      required: [true, "Mode is required"],
      trim: true,
    },
    audience: {
      type: String,
      required: [true, "Audience description is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Agenda array is required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "Agenda must contain at least one item.",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Tags array is required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "Tags must contain at least one tag.",
      },
    },
  },
  {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Unique index on slug to optimize routing and lookup speed
eventSchema.index({ slug: 1 }, { unique: true });

/**
 * Pre-save middleware to handle validation, slug generation, and normalization.
 * Since this is an async function, we can throw Errors directly to reject the save operation.
 */
eventSchema.pre<IEvent>("save", async function () {
  // 1. Validate that all required string fields are non-empty after trimming
  const requiredStringFields: (keyof IEvent)[] = [
    "title",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "organizer",
  ];

  for (const field of requiredStringFields) {
    const val = this[field];
    if (typeof val === "string" && val.trim() === "") {
      throw new Error(`Field "${field}" cannot be empty or just whitespace.`);
    }
  }

  // 2. Auto-generate URL-friendly slug if title is new or has changed
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      // Remove all non-alphanumeric characters (except spaces and hyphens)
      .replace(/[^\w\s-]/g, "")
      // Replace spaces, underscores, and consecutive hyphens with a single hyphen
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-");
  }

  // 3. Validate and normalize the date field to ISO format
  if (this.isModified("date")) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`Invalid date string provided: "${this.date}"`);
    }
    this.date = parsedDate.toISOString();
  }

  // 4. Normalize the time field to a consistent format (trimmed, uppercase, single spaces)
  if (this.isModified("time")) {
    this.time = this.time.trim().toUpperCase().replace(/\s+/g, " ");
  }
});

// Prevention of duplicate model compiling when hot-reloading in Next.js development
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

export default Event;
