import Link from "next/link";

function News() {
  return (
    <div>
      <Link href="/news/1">News 1</Link>
      <br />
      <Link href="/news/2">News 2</Link>
      <br />
      <Link href="/news/3">News 3</Link>
    </div>
  );
}

export default News;
