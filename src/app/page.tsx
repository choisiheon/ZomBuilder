"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal_Main/Modal"; // Modal 컴포넌트 import
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/mainpage/MainPage.module.css";

export default function Home() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal 상태

  useEffect(() => {
    // localStorage에서 모달 닫힌 상태 확인
    const modalClosedUntil = localStorage.getItem("modalClosedUntil");
    if (modalClosedUntil) {
      const now = new Date();
      const closedUntilDate = new Date(modalClosedUntil);

      if (now < closedUntilDate) {
        setIsModalOpen(false); // 오늘은 모달을 표시하지 않음
        return;
      }
    }
    setIsModalOpen(true); // 모달 표시
  }, []);

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
    { image: "/image/mainLine/indiestoneimage.png", text: "#좀보이드" },
    { image: "/image/mainLine/zomboidmoodle.png", text: "#특성" },
    { image: "/image/mainLine/zomboidimage.png", text: "#좀빌더" },
    { image: "/image/mainLine/bio.png", text: "#생존" },
    { image: "/image/mainLine/game.png", text: "#전략" },
    { image: "/image/mainLine/zombi.png", text: "#좀비" },
    { image: "/image/mainLine/horror.png", text: "#공포" },
    { image: "/image/mainLine/energy.png", text: "#스릴" },
  ];

  return (
    <div className={styles.background}>
      {/* Modal 컴포넌트 추가 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>공지사항</h2>
        <h3>서비스소개</h3>
        <p> ZomBuilder는 Project Zomboid의 빌드를 보다 편하게 계산해보고 공유할 수 있도록 제작한 서비스입니다.</p>
        <h3>버그 및 개선사항</h3>
        <p>
          추천 빌더 페이지에서 다른 사용자들의 빌드를 가져올 때 취득기술 창이 표현되지 않는 버그가 있습니다.
          <br/>
          (빌드를 가져오고 임의의 특성을 하나 추가함으로써 해결 할 수 있습니다)
          <br/>
          추가적인 버그 및 개선해야할 사항을 발견시 아래의 이메일로 제보해주세요.
        </p>
        <p>
          정보출처: Project Zomboid
          <br/>
          제작: 대림대학교 응용 S/W전공 (김건우, 안양우, 전주현, 최시헌)
          <br/>
          이메일: kgw3738@gmail.com
        </p>
      </Modal>
      {/* 배경 이미지 */}
      <div className={styles.backgroundImage}>
        <Image
          src="/image/mainpagebackground.png"
          alt="메인 배경 이미지"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className={styles.mainHeader}>
        {/* 좌측 상단 좀빌더 로고 */}
        <div className={styles.zomBuilderLogo}>
          <Link href="/">
            <Image
              src="/image/zomboid-logo.png"
              alt="좀빌더 로고"
              width={250}
              height={120}
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
              height={120}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
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