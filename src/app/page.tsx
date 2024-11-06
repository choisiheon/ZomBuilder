import Image from "next/image";
import styles from "../../styles/mainpage/MainPage.module.css";
export default function Home() {
  return <div className={styles.background}>
    <Image
        src="/image/mainpagebackground.png"
        alt="메인 배경 이미지"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
    />
  </div>
}
