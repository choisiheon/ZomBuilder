// pages/custom-page.tsx
import React from 'react';
import Image from 'next/image'; // next/image에서 Image를 임포트
import styles from '../../../styles/builderpage/Builder.module.css'; // 스타일을 위한 CSS 모듈 임포트
import Link from 'next/link';

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

const CustomBuilder: React.FC = () => {
    return (
        <div>
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
                    <h1>Custom Builder</h1>
                </div>
                <div className={styles.searchGroup}>
                    <div className={styles.searchLabel}>All Search</div>
                    <input type="text" placeholder="" className={styles.searchInput} />
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

            <div className={styles.buttonGroup}>
                <button className={styles.button}>무작위</button>
                <button className={styles.button}>초기화</button>
                <button className={styles.button}>캡쳐하기</button>
            </div>
            <div className={styles.buildShareButtonPosition}>
                <button className={styles.buildShareButton}>내 빌드 공유하기</button>
            </div>
        </div>
    );
};

export default CustomBuilder;