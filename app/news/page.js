import NewsList from "@/components/news-list";
import { DUMMY_NEWS } from "@/dummy-new";
import Link from "next/link";

function News() {
  return (
    <>
      <h1>News Page</h1>
      <NewsList news={DUMMY_NEWS} />
    </>
  );
}

export default News;
