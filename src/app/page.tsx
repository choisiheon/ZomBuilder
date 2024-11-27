"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/mainpage/MainPage.module.css";

export default function Home() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const sliderWidth = slider.scrollWidth / 2; // 한 사이클의 슬라이더 길이
    const animateSlider = () => {
      setCount((prevCount) => {
        const newCount = prevCount - 1; // 슬라이더를 왼쪽으로 이동
        return Math.abs(newCount) >= sliderWidth ? 0 : newCount; // 끝에 도달하면 초기화
      });
    };

    const interval = setInterval(animateSlider, 16); // 약 60FPS
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  const sliderData = [
    { image: "/image/indiestoneimage.png", text: "#좀보이드" },
    { image: "/image/zomboidmoodle.png", text: "#특성" },
    { image: "/image/zomboidimage.png", text: "#좀빌더" },
    { image: "/image/bloodimage.png", text: "#생존" },
    { image: "/image/cigarette.png", text: "#전략" },
  ];

  return (
    <div className={styles.background}>
      {/* 배경 이미지 */}
      <div className={styles.backgroundImage}>
        <Image
          src="/image/mainpagebackground.png"
          alt="메인 배경 이미지"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      {/* 좌측 상단 좀빌더 로고 */}
      <div className={styles.zomBuilderLogo}>
        <Link href="/">
          <Image
            src="/image/zomboid-logo.png"
            alt="좀빌더 로고"
            width={250}
            height={100}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>

      {/* 우측 상단 인디스톤 로고 */}
      <div className={styles.indieStoneLogo}>
        <Link
          href="https://projectzomboid.com/blog/about-us/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/image/logo.png"
            alt="인디스톤 로고"
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
        <Link href="/builder">
          <button className={styles.button}>새로운 빌드 생성</button>
        </Link>
        <Link href="/recommend_builder">
          <button className={styles.button}>추천 빌드</button>
        </Link>
      </div>

      {/* 슬라이더 */}
      <div className={styles.sliderContainer}>
        {/* 첫 번째 라인 슬라이더 */}
        <div className={styles.sliderWrapper} style={{ transform: "rotate(-25deg)" }}>
          <div
            className={styles.slider}
            ref={sliderRef}
            style={{ transform: `translateX(${count}px)` }}
          >
            {Array(10)
              .fill(sliderData)
              .flat()
              .map((item, index) => (
                <div key={index} className={styles.sliderItem}>
                  <Image
                    src={item.image}
                    alt={item.text}
                    width={40}
                    height={40}
                  />
                  <span>{item.text}</span>
                </div>
              ))}
          </div>
        </div>

        {/* 두 번째 라인 슬라이더 */}
        <div className={styles.sliderWrapper} style={{ transform: "rotate(20deg)" }}>
          <div
            className={styles.slider}
            ref={sliderRef}
            style={{ transform: `translateX(${count}px)` }}
          >
            {Array(10)
              .fill(sliderData)
              .flat()
              .map((item, index) => (
                <div key={index} className={styles.sliderItem}>
                  <Image
                    src={item.image}
                    alt={item.text}
                    width={40}
                    height={40}
                  />
                  <span>{item.text}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}