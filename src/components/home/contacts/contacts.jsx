"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./contacts.module.css";
import Logo from '@/assets/orangelogo.svg';
import Email from '@/assets/email.svg';
import Facebook from '@/assets/facebook.svg';
import Instagram from '@/assets/instagram.svg';
import Linkedin from '@/assets/linkedin.svg';
import Telegram from '@/assets/telegram.svg';

function Contacts() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const sendToTelegram = async () => {
        if (!name || !phone) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        const botToken = "7631087313:AAGPRl6_HVr_KaLInNUvrSjkv5ZOyOLm0Is";
        const chatId = "-1002350005179";
        const message = `Новая заявка !\nИмя: ${name}\nТелефон: ${phone}`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        setName("");
        setPhone("");
    };

    return (
        <section id="contacts" className={styles.container}>
  
            <Image src={Logo} alt="Logo" width={220} height={66} className={styles.logo} />

            <div className={styles.formWrapper}>
                <h2 className={styles.tit}>Оставьте заявку <br className={styles.brr}/> и вы узнаете <br /> о старте продаж первым</h2>
                <div className={styles.form}>
                    <input className={styles.input}
                        type="tel"
                        placeholder="Номер"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input className={styles.input}
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    
                    <button className={styles.button} onClick={sendToTelegram}>Оставить заявку</button>
                </div>
            </div>

            <p className={styles.social}>Следите за нами в соцсетях</p>
            <div className={styles.socials}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <Image src={Facebook} alt="Facebook" width={38} height={39} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Image src={Instagram} alt="Instagram" width={38} height={39} />
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                    <Image src={Telegram} alt="Telegram" width={38} height={39} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Image src={Linkedin} alt="LinkedIn" width={38} height={39} />
                </a>
                <a href="mailto:yourmail@example.com">
                    <Image src={Email} alt="Email" width={38} height={39} />
                </a>
            </div>

            <p className={styles.copyright}>© 2025 Apex Development. <br className={styles.brr}/> All rights reserved.</p>
        </section>
    );
}

export default Contacts;