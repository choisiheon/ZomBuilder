"use client";

import React, { useState } from "react";
import Image from 'next/image'; // next/image에서 Image를 임포트
import Link from 'next/link';
import styles from "../../../styles/recommend_builder/recommend.module.css";

// 각 Trait 아이템의 타입 정의
type Trait = {
  name: string;
  points: number;
};

// 직업 데이터 타입 정의
type Job = {
  job: string;
  image?: string; // 이미지는 선택적
};

// 샘플 데이터 (DB에서 받아올 예정)
const Jobs: Job[] = [
  { job: "무직", image: "/image/Job/Jobless.png" },
  { job: "소방관", image: "/image/Job/Firefighter.png" },
  { job: "경찰관", image: "/image/Job/Police.png" },
  { job: "공원경비원", image: "/image/Job/Sheriff.png" },
  { job: "건축인부", image: "/image/Job/ConstructionWorker.png" },
  { job: "목수", image: "/image/Job/Carpenter.png" },
  { job: "주방장", image: "/image/Job/Chef.png" },
  { job: "정비사", image: "/image/Job/Mechanic.png" },
  { job: "농부", image: "/image/Job/Farmer.png" },
  { job: "어부", image: "/image/Job/Fisherman.png" },
  { job: "의사", image: "/image/Job/Doctor.png" },
  { job: "필라테스 강사", image: "/image/Job/PilatesInstructor.png" },
  { job: "전기공", image: "/image/Job/Electrician.png" },
  { job: "기술자", image: "/image/Job/Technician.png" },
  { job: "용접공", image: "/image/Job/Welder.png" },
  { job: "자동차 정비사", image: "/image/Job/AutoMechanic.png" },
  { job: "홈도둑", image: "/image/Job/Burglar.png" },
  { job: "벌목꾼", image: "/image/Job/Lumberjack.png" },
  { job: "간호사", image: "/image/Job/Nurse.png" },
  { job: "햄버거 조리사", image: "/image/Job/BurgerCook.png" },
  { job: "경비원", image: "/image/Job/SecurityGuard.png" },
];

// 기본 Trait 데이터 (예시)
const positiveTraits: Trait[] = [
  { name: "속도광", points: -1 },
  { name: "고양이의 눈", points: -2 },
  { name: "민첩한", points: -2 },
  { name: "등산애호가", points: -2 },
  { name: "속독", points: -2 },
  { name: "잠이 없는", points: -2 },
  { name: "강철 위장", points: -3 },
  { name: "강철 체력", points: -4 },
  { name: "난사고", points: -4 },
];

const negativeTraits: Trait[] = [
  { name: "초보운전", points: -1 },
  { name: "서투른", points: -2 },
  { name: "겁쟁이", points: -2 },
  { name: "덤벙댐", points: -2 },
  { name: "정독", points: -2 },
  { name: "짧은 시야", points: -2 },
  { name: "소음반향", points: -3 },
  { name: "골초", points: -4 },
  { name: "광장 공포증", points: -4 },
];

const RecommendBuilder: React.FC = () => {
  const [youtubeTitleTop, setYoutubeTitleTop] = useState("한국인이 좋아하는 속도 프로젝트 좀보이드 공략");
  const [youtubeTitleBottom, setYoutubeTitleBottom] = useState("영상 하나로 끝내는 프로젝트 좀보이드 공략");
  const [youtubeVideoUrlTop, setYoutubeVideoUrlTop] = useState("https://www.youtube.com/watch?v=0Xa360FLirY");
  const [youtubeVideoUrlBottom, setYoutubeVideoUrlBottom] = useState("https://www.youtube.com/watch?v=q9cyYL8P9O0&t=355s");

  // 유튜브 URL에서 ID 추출 함수
  const extractVideoId = (url: string) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };

  const videoIdTop = extractVideoId(youtubeVideoUrlTop);
  const videoIdBottom = extractVideoId(youtubeVideoUrlBottom);

  return (
    <div className={styles.recommendpage}>
      <div className={styles.mainHeader}>
        {/* 좌측 상단 좀빌더 로고 */}
        <div className={styles.zomBuilderLogo}>
          <Link href="/">
            <Image
              src="/image/zomboid-logo.png" // 절대 경로 사용
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
              src="/image/logo.png"
              alt="인디스톤 로고"
              layout="intrinsic"
              width={100}
              height={100}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
      </div>

      <div className={styles.underHeader}>
        <div className={styles.menuTitle}>
          <img src="../image/menuLogo.png" alt="menu" className={styles.menuLogo} />
          <h1>Recommend Builder</h1>
        </div>
        <div className={styles.searchGroup}>
          <div className={styles.searchLabel}>All Search</div>
          <div className={styles.searchInputGroup}>
            <input type="text" placeholder="" className={styles.searchInput} />
            <img src="../image/searchIcon.png" alt="search" className={styles.searchInputIcon} />
          </div>
        </div>
      </div>

      <div className={styles.modePick}>
        <h3>Mode Pick:</h3>
        <div className={styles.modeButtonGroup}>
          <button className={styles.modeButton}>
            <img src="../image/modeLogo.png" alt="modeLogo" className={styles.modeLogo} />Vanilla
          </button>
          <button className={styles.modeButton}>
            <img src="../image/modeLogo.png" alt="modeLogo" className={styles.modeLogo} />More Simple Traits (MST) & Simple Overhaul Traits and Occupations (SOTO)
          </button>
        </div>
      </div>

      <div className={styles.jobPick}>
        {Jobs.map((job, index) => (
          <button key={index} className={styles.jobButton}>
            {job.image && (
              <img src={job.image} alt={job.job} className={styles.jobImage} />
            )}
            <span className={styles.jobName}>{job.job}</span>
          </button>
        ))}
      </div>

      <div className={styles.searchContainer}>
        <img src="../image/searchIcon.png" alt="Search Icon" className={styles.searchIcon} />
        <input type="text" placeholder="Search for a Build" className={styles.searchBuildInput} />
      </div>

      <div className={styles.gridMain}>
        <h2 className={styles.youtuberTitle}>유튜브 인기 추천 빌드</h2>
        <h2 className={styles.positiveTitle}>긍정 특성</h2>
        <h2 className={styles.negativeTitle}>부정 특성</h2>
        {/* 유튜버 추천 빌드 */}
        <div className={styles.youtubeRecommendationTop}>
          <h3>{youtubeTitleTop}</h3>
          <div className={styles.youtubeContent}>
            {videoIdTop ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoIdTop}`}
                title={youtubeTitleTop}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>Invalid YouTube URL</p>
            )}
          </div>
        </div>
        <div className={styles.youtubeRecommendationBottom}>
          <h3>{youtubeTitleBottom}</h3>
          <div className={styles.youtubeContent}>
            {videoIdBottom ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoIdBottom}`}
                title={youtubeTitleBottom}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>Invalid YouTube URL</p>
            )}
          </div>
        </div>
        {/* 긍정 특성 */}
        <div className={styles.positiveTraits}>
          <ul>
            {positiveTraits.map((trait, index) => (
              <li key={index} className={styles.trait}>
                {trait.name} ({trait.points})
              </li>
            ))}
          </ul>
        </div>

        {/* 부정 특성 */}
        <div className={styles.negativeTraits}>
          <ul>
            {negativeTraits.map((trait, index) => (
              <li key={index} className={styles.trait}>
                {trait.name} ({trait.points})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.gridBottom}>
        <div className={styles.builderBox}></div>
        <div className={styles.builderBox}></div>
        <div className={styles.builderBox}></div>
        <div className={styles.builderBox}></div>
        <div className={styles.builderBox}></div>
        <div className={styles.builderBox}></div>
      </div>
    </div>
  );
};

export default RecommendBuilder;