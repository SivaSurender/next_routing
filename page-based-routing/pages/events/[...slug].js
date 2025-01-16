import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

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
    <>
      {" "}
      <ErrorAlert>
        <p>Invalid Filter, please adjust your values</p>
      </ErrorAlert>
      <div className="center">
        <Button link="/events">Show All Events</Button>
      </div>
    </>;
  }
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  return (
    <>
      <ResultsTitle date={new Date(numYear, numMonth - 1)} />
      <EventList events={filteredEvents} />
    </>
  );
}
