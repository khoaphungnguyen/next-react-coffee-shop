import Image from "next/image";
import Link from "next/link";
import cls from "classnames"
import styles from "./card.module.css"

const Card = (prop) => {
    return (
        <Link href={prop.href}>
            <a className={styles.cardLink}>
            <div className={cls("glass",styles.container)}>
                <div className={styles.CardHeaderWrapper}>
                <h2 className={styles.cardHeader}>{prop.name}</h2>
                </div>"
                <div className={styles.cardImageWrapper}> <Image className={styles.cardImage} src={prop.imgUrl} width={260} height={160} />          
                </div>
                </div>
                </a>
        </Link>
    )
}


export default Card;