// pages/custom-page.tsx
import React from 'react';
import styles from '../../../styles/builderpage/Builder.module.css'; // 스타일을 위한 CSS 모듈 임포트

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
            <header className={styles.header}>
                <img src="/zomboid-logo.png" alt="Project Zomboid" className={styles.logo} />
                <h1>커스텀 빌더</h1>
            </header>

            <div className={styles.modePick}>
                <button className={styles.modeButton}>More Traits</button>
                <button className={styles.modeButton}>More Simple Traits (MST)</button>
                <button className={styles.modeButton}>Simple Overhaul Traits and Occupations (SOTO)</button>
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

            <div className={styles.buttons}>
                <button>무작위</button>
                <button>초기화</button>
                <button>캡쳐하기</button>
                <button>내 빌드 공유하기</button>
            </div>
        </div>
    );
};

export default CustomBuilder;