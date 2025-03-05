"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";
import Logo from '@/assets/logo2.svg';

function Hero() {
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const [playingForward, setPlayingForward] = useState(true);

    useEffect(() => {
        const currentVideo = playingForward ? videoRef1.current : videoRef2.current;
        const nextVideo = playingForward ? videoRef2.current : videoRef1.current;

        if (!currentVideo || !nextVideo) return;

        currentVideo.style.opacity = "1";
        nextVideo.style.opacity = "0";

        currentVideo.play();
    }, [playingForward]);

    const handleVideoEnd = () => {
        setPlayingForward((prev) => !prev);
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
                    onEnded={handleVideoEnd}
                >
                    <source src="/assetss/secondv.mp4" type="video/mp4" />
                </video>

                <video
                    ref={videoRef2}
                    autoPlay
                    muted
                    playsInline
                    className={styles.videoBackground}
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
