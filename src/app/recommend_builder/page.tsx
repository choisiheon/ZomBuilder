import React from "react";
import Image from 'next/image'; // next/image에서 Image를 임포트
import Link from 'next/link';
import styles from "../../../styles/recommend_builder/recommend.module.css";

type Job = {
  job: string;
}

// 각 Trait 아이템의 타입 정의
type Trait = {
  name: string;
  points: number;
};

// 기본 Job 데이터 (예시)
const job = [
  { job: "무직", image: "../image/Job/Jobless.png" },
  { job: "소방관", image: "../image/Job/Firefighter.png" },
  { job: "경찰관", image: "../image/Job/Police.png" },
  { job: "공원경비원", image: "../image/Job/Sheriff.png" },
  { job: "건축인부" },
  { job: "목수" },
  { job: "무직" },
  { job: "주방장" },
  { job: "정비사" },
  { job: "농부" },
  { job: "어부" },
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
            <img src="../image/modeLogo.png" alt="modeLogo" className={styles.modeLogo} />More Traits
          </button>
          <button className={styles.modeButton}>
            <img src="../image/modeLogo.png" alt="modeLogo" className={styles.modeLogo} />More Simple Traits (MST)
          </button>
          <button className={styles.modeButton}>
            <img src="../image/modeLogo.png" alt="modeLogo" className={styles.modeLogo} />Simple Overhaul Traits and Occupations (SOTO)
          </button>
        </div>
      </div>

      <div className={styles.jobPick}>
        {job.map((job, index) => (
          <button key={index} className={styles.jobButton}>
            <img src={job.image} alt={""} className={styles.jobImage} />
            {job.job}
          </button>
        ))}
      </div>

      <div className={styles.searchContainer}>
        <img src="../image/searchIcon.png" alt="Search Icon" className={styles.searchIcon} />
        <input type="text" placeholder="Search for a Build" className={styles.searchBuildInput} />
      </div>

      <div className={styles.gridMain}>
        <h2 className={styles.youtuberTitle}>YouTuber Recommendation Build</h2>
        <h2 className={styles.positiveTitle}>Positive Traits</h2>
        <h2 className={styles.negativeTitle}>Negative Traits</h2>
        {/* 유튜버 추천 빌드 */}
        <div className={styles.youtubeRecommendationTop}>
          <h3>YouTuber Recommendation Build</h3>
          <div className={styles.youtubeContent}>
            <Image
              src=""
              alt="추천 빌드"
              width={200}
              height={100}
            />
          </div>
        </div>
        <div className={styles.youtubeRecommendationBottom}>
          <h3>YouTuber Recommendation Build</h3>
          <div className={styles.youtubeContent}>
            <Image
              src=""
              alt="추천 빌드"
              width={200}
              height={100}
            />
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