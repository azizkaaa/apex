import Image from "next/image";
import styles from "./style.module.css";
import A_Big from "@/assets/bigA.svg"; 
import A from "@/assets/letter.svg"; 
import A_small from "@/assets/ad.svg"; 
import A_tablet from "@/assets/tablet.svg"; 

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.aboutContent}>
        <h1  className={styles.first}>
          История Apex Development началась с
          <strong>
            {" "}амбициозной идеи: превратить{" "}
            <span className={styles.highlight}> <br className={styles.brrr}/>15 лет опыта</span> <br className={styles.b}/>
            в нечто большее, <br className={styles.brrr}/>чем просто строительство.
          </strong>
        </h1>
        <p className={styles.second}>
          Опираясь на экспертные знания команды, передовые технологии  <br className={styles.brr} />и четкое видение цели, 
          мы создали прочный фундамент для развития новой девелоперской компании.
        </p>
        <p className={styles.third}> 
          Наш первый проект станет олицетворением современной городской жизни — яркой, 
          насыщенной и динамичной.
        </p>
        <p className={styles.forth}>
          Оставайтесь с нами и готовьтесь <br />
          к переменам в самом сердце столицы!
        </p>
      </div>

      <Image src={A_Big} alt="A" className={`${styles.aboutLetter} ${styles.aboutBig}`} />
      <Image src={A} alt="A" className={`${styles.aboutLetter} ${styles.aboutLetterDesktop}`} />
      <Image src={A_small} alt="A" width={320} height={220} className={`${styles.aboutLetter} ${styles.aboutLetterMobile}`} />
      <Image src={A_tablet} alt="A" width={452} height={310} className={`${styles.aboutLetter} ${styles.aboutLetterTablet}`} />
    </section>
  );
};

export default About;



 


