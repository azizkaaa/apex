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

    const sendToTelegramAndSheets = async () => {
        if (!name || !phone) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        if (name.length > 20) {
            alert("Имя не должно превышать 20 символов");
            return;
        }

        if (phone.length > 13) {
            alert("Номер не должен превышать 13 символов");
            return;
        }

        const botToken = "7150075831:AAHqZQLttMVywI8N_uStev59LpU9mNl1uk8";
        const chatId = "-1002350005179";
        const message = `Новая заявка!\nИмя: ${name}\nТелефон: ${phone}`;

        try {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: chatId, text: message }),
            });
        } catch (error) {
            console.error("Ошибка при отправке в Telegram:", error);
        }

        const scriptURL = "https://script.google.com/macros/s/AKfycbyOfa1SCPphv4P4Ee9TDqQfPtv5LLRx0o69ZVL6zJ52uWCu3BkuR4g8M1qpRw1bvKgH/exec";

        try {
            await fetch(scriptURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone }),
                mode: "no-cors"
            });
        } catch (error) {
            console.error("Ошибка при отправке в Google Sheets:", error);
        }

        setName("");
        setPhone("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !phone) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        if (name.length > 20) {
            alert("Имя не должно превышать 20 символов");
            return;
        }

        if (phone.length > 13) {
            alert("Телефон должен содержать 13 символов");
            return;
        }

        await sendToTelegramAndSheets();


        try {
            const response = await fetch("/api/google-sheets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone }),
            });

            const data = await response.json();
            console.log("Ответ от сервера:", data);

          
        } catch (error) {
            console.error("Ошибка при отправке формы:", error);
        }

        setName("");
        setPhone("");
    };

    return (
        <section id="contactss" className={styles.container}>
            <Image src={Logo} alt="Logo" width={560} height={189} className={styles.logo} />

            <div className={styles.formWrapper}>
                <h2 className={styles.tit}>Оставьте заявку <br className={styles.brr}/> и вы узнаете <br /> о старте продаж первым</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
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
                    <button className={styles.button} type="submit">Оставить заявку</button>
                </form>
            </div>

            <p className={styles.social}>Следите за нами в соцсетях</p>
            <div className={styles.socials}>
                <a href="https://facebook.com/apexdevelopment.uz" target="_blank" rel="noopener noreferrer">
                    <Image src={Facebook} alt="Facebook" width={38} height={39} />
                </a>
                <a href="https://instagram.com/apex.development" target="_blank" rel="noopener noreferrer">
                    <Image src={Instagram} alt="Instagram" width={38} height={39} />
                </a>
                <a href="https://t.me/apex_development" target="_blank" rel="noopener noreferrer">
                    <Image src={Telegram} alt="Telegram" width={38} height={39} />
                </a>
                <a href="https://linkedin.com/company/apex-development-uz" target="_blank" rel="noopener noreferrer">
                    <Image src={Linkedin} alt="LinkedIn" width={38} height={39} />
                </a>
                <a href="mailto:info@apexdev.uz">
                    <Image src={Email} alt="Email" width={38} height={39} />
                </a>
            </div>

            <p className={styles.copyright}>© 2025 Apex Development. <br className={styles.hr}/> All rights reserved.</p>
        </section>
    );
}

export default Contacts;

