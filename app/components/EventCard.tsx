import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  image: string
  slug: string
  location: string
  date: string
  time: string
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return <div>
    <Link href={`/events/${slug}`}>
      <Image src={image} alt="image" width={410} height={300} className="poster" />
      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p>{location}</p>

      </div>
      <p className="title">{title}</p>

      <div className="date-time">
        <div className="flex flex-row gap-2">
          <Image src="/icons/calendar.svg" alt="calendar" width={14} height={14} />
          <p className="date">{date}</p>
        </div>
        <div className="flex flex-row gap-2">
          <Image src="/icons/clock.svg" alt="clock" width={14} height={14} />
          <p className="time">{time}</p>
        </div>
      </div>
    </Link>
  </div>;
};

export default EventCard;
