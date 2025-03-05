import Image from "next/image";
import styles from "./hero.module.css";
import Logo from '@/assets/logo2.svg';

function Hero() {
    return (
        <section id="hero" className={styles.hero}>
           
           <video
    autoPlay
    loop
    muted
    playsInline
    className={styles.videoBackground}
    controlsList="nodownload nofullscreen noplaybackrate"
    disablePictureInPicture
>
    <source src="/assetss/vtoroy.mp4" type="video/mp4" />
    Ваш браузер не поддерживает видео.
</video>

            
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Девелопер <br className={styles.br} /> нового <br /> поколения
                </h1>
                <Image src={Logo} width={250} height={75} alt="Лого" className={styles.logo} />
            </div>
        </section>
    );
}

export default Hero;
