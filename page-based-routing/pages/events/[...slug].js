import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";

export default function FilteredEventsPage() {
  const router = useRouter();

  const filteredValue = router.query.slug;
  console.log(filteredValue, "fdf");
  if (!filteredValue) {
    return <p className="center">Loading...</p>;
  }

  const numYear = +filteredValue[0];
  const numMonth = +filteredValue[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2100 ||
    numMonth < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    <p>Invalid Filter, please adjust your values</p>;
  }
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }
  return (
    <div>
      <EventList events={filteredEvents} />
    </div>
  );
}
