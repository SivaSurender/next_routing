import NewsList from "@/components/news-list";
import { getNewsForYear } from "@/lib/news";
import React from "react";

export default function FilteredNews({ params }) {
  console.log(params, "params");
  const year = params.year;
  const news = getNewsForYear(year);
  return <NewsList news={news} />;
}
