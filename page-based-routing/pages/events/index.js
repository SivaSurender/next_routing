import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data";

export default function Events() {
  const allEvents = getAllEvents();
  return (
    <>
      <EventSearch />
      <EventList events={allEvents} />
    </>
  );
}
