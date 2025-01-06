import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news";
import React from "react";

function LatestNews() {
  const latestNews = getLatestNews();
  console.log(latestNews, "latestNews");
  return (
    <>
      <h2>LatestNews</h2>
      <NewsList news={latestNews} />
    </>
  );
}

export default LatestNews;
