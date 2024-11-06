import Image from "next/image";
import styles from "styles/MainPage.module.css";

const MainPage = () => {
    return <div className={styles.background}>
        <Image
            src="/image/mainpagebackground.svg"
            alt="메인 배경 이미지"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
        />
    </div>
}

export default MainPage;