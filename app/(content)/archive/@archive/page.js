import { getAvailableNewsYears } from "@/lib/news";
import Link from "next/link";

function Archivepage() {
  return (
    <header id="archive-header">
      <nav>
        <ul>
          {getAvailableNewsYears().map((link) => (
            <li key={link}>
              <Link href={`/archive/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Archivepage;
