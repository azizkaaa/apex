"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./header.module.css"
import Logo from '@/assets/apex.svg';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.head}>
        <Image src={Logo} width={66} height={45} alt="Лого" className={styles.logo} />

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <a href="#first" className={styles.navbar} onClick={() => setMenuOpen(false)}>О компании</a>
          <a href="#projects" className={styles.navbar} onClick={() => setMenuOpen(false)}>Ценности бренда</a>
          <a href="#contact" className={styles.navbar} onClick={() => setMenuOpen(false)}>Контакты</a>
        </nav>


        <div className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </header>
    );
};


export default Header;