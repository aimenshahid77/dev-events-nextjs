import EventCard from "./components/EventCard";
import ExploreBtn from "./components/ExploreBtn";
import { events } from "@/lib/constants";

export default function Home() {
  return (
    <section>
      <h1 className="text-center mt-18">
        The Hub for Every Developer <br />
        Events that you cannot miss
      </h1>
      <p className="text-center mt-5">
        Hackathon, Meetups, Discussion events and Competitions\Quizes that you
        cannot <br />
        afford to miss, whether as a senior or junior developer!
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events list-none">
          {events.map((event) => (
            <li key={event.title}>
              {" "}
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
