import React from "react";
import styles from "../../../styles/recommend_builder/recommend.module.css";

// 각 Trait 아이템의 타입 정의
type Trait = {
    name: string;
    points: number;
};

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
    <div>
      <header className={styles.header}>
        <img src="../image/zomboid-logo.png" alt="Project Zomboid" className={styles.leftLogo} />
        <img src="../image/logo.png" alt="Project Zomboid_logo" className={styles.rightLogo} />
      </header>

      <div className={styles.underHeader}>
        <div className={styles.menuTitle}>
          <img src="../image/menuLogo.png" alt="menu" className={styles.menuLogo} />
          <h1>Recommend Builder</h1>
        </div>      
        <input type="text" placeholder="All Search" className={styles.searchInput} />
      </div>

    <div className={styles.modePick}>
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

    <div className={styles.jobPick}>
      <button className={styles.jobButton}>
        <img src="../image/modeLogo.png" alt="jobImage" className={styles.modeLogo} />무직
      </button>
      <button className={styles.jobButton}>
        <img src="../image/modeLogo.png" alt="jobImage" className={styles.modeLogo} />소방관
      </button>
    </div>

    <div className={styles.searchContainer}>
      <img src="../image/searchIcon.png" alt="Search Icon" className={styles.searchIcon} />
      <input type="text" placeholder="Search for a Build" className={styles.searchBuildInput} />
    </div>

    

    <div className={styles.grid}>

        <h2 className={styles.title}>직업</h2>
        <h2 className={styles.title}>긍정 특성</h2>
        <h2 className={styles.title}>선택한 특성</h2>

        <div className={styles.occupations}>
            <p>무직</p>
        </div>

        <div className={styles.traits}>
            <ul>
                {positiveTraits.map((trait, index) => (
                    <li key={index}>
                        {trait.name} {trait.points}
                    </li>
                ))}
            </ul>
        </div>

        <div className={styles.chosenTraits}>
        </div>

        <h2 className={styles.title}>부정 특성</h2>
        <h2 className={styles.title}>Major Skills</h2>

        <div className={styles.traits}>
            <ul>
                {negativeTraits.map((trait, index) => (
                    <li key={index}>
                        {trait.name} {trait.points}
                    </li>
                ))}
            </ul>
        </div>

        <div className={styles.majorSkills}>
        </div>
    </div>


    </div>
  );
};

export default RecommendBuilder;
