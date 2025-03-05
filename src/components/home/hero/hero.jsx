"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";
import Logo from '@/assets/logo2.svg';

function Hero() {
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const [playingForward, setPlayingForward] = useState(true);
    const [isLoaded, setIsLoaded] = useState({ first: false, second: false });

    // Проверяем, когда оба видео загружены
    useEffect(() => {
        if (isLoaded.first && isLoaded.second) {
            videoRef1.current.play(); // Запускаем первое видео, когда оба загружены
        }
    }, [isLoaded]);

    const handleLoadedData = (video) => {
        setIsLoaded((prev) => ({
            ...prev,
            [video]: true,
        }));
    };

    const handleVideoEnd = () => {
        const currentVideo = playingForward ? videoRef1.current : videoRef2.current;
        const nextVideo = playingForward ? videoRef2.current : videoRef1.current;

        if (!currentVideo || !nextVideo) return;

        // Сбрасываем второе видео на начало
        nextVideo.currentTime = 0; 
        nextVideo.play(); // Запускаем следующее видео

        // Делаем плавный переход
        nextVideo.style.transition = "opacity 0.5s ease-in-out"; 
        nextVideo.style.opacity = "1"; // Сделать видимым
        setTimeout(() => {
            currentVideo.style.opacity = "0"; // Скрыть текущее
        }, 500);

        // После окончания видео переключаем флаг для направления
        setPlayingForward((prev) => !prev);

        // Возвращаем первое видео на начало, если мы вернулись к первому
        if (!playingForward) {
            videoRef1.current.currentTime = 0;
        }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.videoContainer}>
                <video
                    ref={videoRef1}
                    autoPlay
                    muted
                    playsInline
                    className={styles.videoBackground}
                    onLoadedData={() => handleLoadedData("first")}
                    onEnded={handleVideoEnd}
                >
                    <source src="/assetss/secondv.mp4" type="video/mp4" />
                </video>

                <video
                    ref={videoRef2}
                    muted
                    playsInline
                    className={styles.videoBackground}
                    style={{ opacity: 0 }}
                    onLoadedData={() => handleLoadedData("second")}
                    onEnded={handleVideoEnd}
                >
                    <source src="/assetss/third.MOV" type="video/mp4" />
                </video>
            </div>

            <div className={styles.content}>
                <h1 className={styles.title}>
                    Девелопер нового <br /> поколения
                </h1>
                <Image src={Logo} width={250} height={75} alt="Лого" className={styles.logo} />
            </div>
        </section>
    );
}

export default Hero;
