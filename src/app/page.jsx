import styles from "./page.module.css";
import About from "@/components/home/about/about";
import Hero from "@/components/home/hero/hero";
import Values from "@/components/home/values/values";
import Contacts from "@/components/home/contacts/contacts"

export default function Home() {
  return (
      <main className={styles.main}>
      <Hero />
      <About />
      <Values />
      <Contacts />
      </main>

  );
}
