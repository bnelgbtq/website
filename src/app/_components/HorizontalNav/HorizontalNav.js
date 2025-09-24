import Link from "next/link";
import "./horizontalNav.css";
export default function ({ items }) {
  return (
    <ol className="horizontal-nav">
      {items.map((item) => (
        <li key={item.url}>
          <Link href={item.url}>{item.shortTitle}</Link>
        </li>
      ))}
    </ol>
  );
}
