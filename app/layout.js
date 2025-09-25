import "./globals.css";

import site from "./_data/site.json";
import menuHeader from "./_data/menuHeader.json";
import menuFooter from "./_data/menuFooter.json";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";
import Rainbow from "./_components/Rainbow/Rainbow";

export const metadata = {
  title: "Brisbane LGBT+ in Tech",
  description: "A meetup for tech-minded peeps in the LGBTQIA+ community",
  favicon: "/favicon.svg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header items={menuHeader} tagline={site.description} />

        <article>{children}</article>

        <Footer items={menuFooter}>
          <p>
            Copyright &copy; 2025 <a href="https://ashk.au/">Ash Kyd</a> and
            contributors. Site design inspired by{" "}
            <a href="https://queerjs.com">queerjs.com</a>. Suggest{" "}
            <a href="https://github.com/bnelgbtq/bnelgbtq-website">
              changes on Github
            </a>
            .
          </p>
        </Footer>
        <div className="rainbow-sidebar">
          <Rainbow isClickable={true} />
        </div>
      </body>
    </html>
  );
}
