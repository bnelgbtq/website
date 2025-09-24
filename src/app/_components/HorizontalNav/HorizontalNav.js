"use client";
import Link from "next/link";
import "./horizontalNav.css";
import { usePathname } from "next/navigation";
export default function ({ items }) {
  const pathname = usePathname();
  return (
    <ol className="horizontal-nav">
      {items.map((item) => (
        <li
          key={item.url}
          className={pathname === item.url ? "horizontal-nav__active" : ""}
        >
          <Link href={item.url}>{item.shortTitle}</Link>
        </li>
      ))}
    </ol>
  );
}
