import HorizontalNav from "../HorizontalNav/HorizontalNav";
import "./footer.css";

export default function Footer({ items, children }) {
  return (
    <footer className="footer">
      <nav>
        <HorizontalNav items={items} />
      </nav>
      <div className="footer__legal">{children}</div>
    </footer>
  );
}
