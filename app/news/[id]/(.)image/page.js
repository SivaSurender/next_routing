import { DUMMY_NEWS } from "@/dummy-new";

export default function InteceptedImageView({ params }) {
  const newsSlug = params.id;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);

  if (!newsItem) {
    notFound();
  }
  return (
    <>
      <h1>Intecepted</h1>
      <div className="fullscreen-image">
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
      </div>
    </>
  );
}
