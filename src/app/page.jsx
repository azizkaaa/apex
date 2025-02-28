import styles from "./page.module.css";
import About from "@/components/home/about/about";
import Hero from "@/components/home/hero/hero";
export default function Home() {
  return (
      <main className={styles.main}>
      <Hero />
      <About />
      </main>
  );
}
