
import styles from "./values.module.css"


const Values = () => {
    return (
        <section id="values" className={styles.values}>
             <div className={styles.image_container}></div>
        <div className={styles.stext_container}>
        <h1>Наши ценности</h1>

        <h2>Качество, надежность, <br className={styles.br}/>безопасность</h2>
        <p>Строим долговечно, используя лучшие<br className={styles.brr}/>материалы и технологии.</p>

        <h2>Ориентированность <br className={styles.brr}/>на клиента</h2>
        <p>Учитываем потребности клиентов, <br className={styles.brr}/>обеспечивая комфорт и безопасность.</p>

        <h2>Инновации</h2>
        <p>Внедряем передовые технологии <br className={styles.br}/>в строительный процесс, повышая ценность объектов.</p>
    </div>
        </section>
    );

    


};

export default Values