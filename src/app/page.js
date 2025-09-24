import Image from "next/image";
import styles from "./page.css";
import HeroItem from "./_components/HeroItem/HeroItem";

export default function Home() {
  return (
    <div>
      <p>
        Brisbane LGBT & Allies in Tech is a meet-up for LGBT tech folks & allies
        thereof; to bring the community together and celebrate diversity in
        tech. It’s a great place to meet and network with like-minded people.
      </p>

      <HeroItem>
        <img
          src="/group-illustration.webp"
          alt="Four cartoon women sit around a park bench with a laptop and game controllers"
          width="810"
          height="557"
        />
      </HeroItem>

      <p>
        First time attendee? Too easy - we're an easygoing low key bunch of
        folks. Feel free to message an organiser if you have any questions.
      </p>

      <p>
        Not sure if its for you? If your jam is working with tech & you're
        LGBTQIA+ or an ally, its definitely for you! Why not come along & find
        out? 🌈
      </p>
    </div>
  );
}
