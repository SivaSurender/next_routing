import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data";

export default function Events() {
  const allEvents = getAllEvents();
  const router = useRouter();
  function findEventsHandle(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <EventSearch onSearch={findEventsHandle} />
      <EventList events={allEvents} />
    </>
  );
}
