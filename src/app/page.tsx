import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/MainPage.module.css";

export default function Home() {
  return (
    <div className={styles.background}>
      {/* 배경 이미지 */}
      <Image
        src="/image/mainpagebackground.png"
        alt="메인 배경 이미지"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      {/* 좌측 상단 좀빌더 로고 */}
      <div className={styles.zomBuilderLogo}>
        <Link href="/">
          <Image
            src="/image/zombuilderlogo.png"
            alt="좀빌더 로고"
            layout="intrinsic"
            width={250} 
            height={100} 
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>

      {/* 우측 상단 인디스톤 로고 */}
      <div className={styles.indieStoneLogo}>
        <Link href="https://projectzomboid.com/blog/about-us/"
              target="_blank"
              rel="noopener noreferrer">
            <Image
              src="/image/indiestonelogo.png"
              alt="인디스톤 로고"
              layout="intrinsic"
              width={100} 
              height={100} 
              style={{ cursor: "pointer" }}
            />
        </Link>
      </div>

      {/* 중앙 텍스트 */}
      <div className={styles.centerText}>
        "이것은 당신의 죽음에 관한 이야기이다"
      </div>

      {/* NewBuild, Recommend Builder 버튼 */}
      <div className={styles.buttonContainer}>
        <Link href="/new-build">
          <button className={styles.button}>New Build</button>
        </Link>
        <Link href="/recommend-builder">
          <button className={styles.button}>Recommend Builder</button>
        </Link>
      </div>

      {/* 슬라이더 */}
      <div className={styles.sliderContainer}>
        <div className={styles.sliderRow}>
          <div className={styles.slider}>
            <span>#좀보이드</span>
            <span>#특성</span>
            <span>#좀빌더</span>
            <span>#생존</span>
            <span>#전략</span>
          </div>
        </div>
        <div className={styles.sliderRow}>
          <div className={styles.sliderReverse}>
            <span>#생존</span>
            <span>#전략</span>
            <span>#좀보이드</span>
            <span>#특성</span>
            <span>#좀빌더</span>
          </div>
        </div>
        <div className={styles.sliderRow}>
          <div className={styles.slider}>
            <span>#좀빌더</span>
            <span>#생존</span>
            <span>#전략</span>
            <span>#좀보이드</span>
            <span>#특성</span>
          </div>
        </div>
      </div>

    </div>
  );
}
