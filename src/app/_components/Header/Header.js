import HorizontalNav from "../HorizontalNav/HorizontalNav";
import "./header.css";

export default function Header({ items, tagline }) {
  return (
    <header className="header">
      <p>{tagline}</p>
      <nav>
        <HorizontalNav items={items} />
      </nav>
    </header>
  );
}
