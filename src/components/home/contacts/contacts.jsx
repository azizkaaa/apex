"use client";
import { useState, useEffect } from "react";
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
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const sendToTelegramAndSheets = async (name, phone) => {
        const botToken = "7150075831:AAHqZQLttMVywI8N_uStev59LpU9mNl1uk8";
        const chatId = "-1002350005179";
        const message = `Новая заявка!\nИмя: ${name}\nТелефон: ${phone}`;

        const telegramRequest = fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: message }),
        }).catch(error => console.error("Ошибка при отправке в Telegram:", error));
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



        await Promise.all([telegramRequest]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !phone) {
            setAlertTitle("Неверная попытка!");
            setAlertMessage("Пожалуйста, заполните все поля");
            setShowAlert(true);
            return;
        }

        if (name.length > 20) {
            setAlertTitle("Неверная попытка!");
            setAlertMessage("Имя не должно превышать 20 символов");
            setShowAlert(true);
            return;
        }

        if (phone.length > 13) {
            setAlertTitle("Неверная попытка!");
            setAlertMessage("Номер не должен превышать 13 символов");
            setShowAlert(true);
            return;
        }

        setAlertTitle("Ваша заявка принята! ");
        setAlertMessage("Мы сообщим вам о старте продаж.");
        setShowAlert(true);
        setName("");
        setPhone("");

        await sendToTelegramAndSheets(name, phone);
    };

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 2700);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <>
            {showAlert && (
                <div className={`${styles.overlay} ${styles.show}`} onClick={() => setShowAlert(false)}></div>
            )}
            {showAlert && (
                <div className={`${styles.alert} ${styles.show}`} style={{ transition: "opacity 0.3s", opacity: showAlert ? 1 : 0 }}>
                    <h1 className={styles.zayavka}>{alertTitle}</h1>
                    <p className={styles.answer}>{alertMessage}</p>
                </div>
            )}
            <section id="contactss" className={styles.container}>
                <Image src={Logo} alt="Logo" width={560} height={189} className={styles.logo} />
                <div className={styles.formWrapper}>
                    <h2 className={styles.tit}>Оставьте заявку <br className={styles.brr} /> и вы узнаете <br /> о старте продаж первым</h2>
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
                <p className={styles.copyright}>© 2025 Apex Development. <br className={styles.hr} /> All rights reserved.</p>
            </section>
        </>
    );
}

export default Contacts;

