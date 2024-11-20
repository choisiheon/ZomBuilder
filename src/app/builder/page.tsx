"use client";

// pages/custom-page.tsx
import React, { useState } from 'react';
import Image from 'next/image'; // next/image에서 Image를 임포트
import styles from '../../../styles/builderpage/Builder.module.css'; // 스타일을 위한 CSS 모듈 임포트
import Link from 'next/link';

// Trait 데이터 타입 정의
type Trait = {
    name: string;
    points: number;
    icon: string;
    description: string;
    disabled_traits: string[];
};

// 샘플 데이터 (DB에서 받아올 예정)
const positiveTraits: Trait[] = [
    { name: '속도광', points: -1, icon: '/icons/speed.png', description: '속도가 매우 빨라집니다.', disabled_traits: ['서투른'] },
    { name: '고양이의 눈', points: -2, icon: '/icons/cat_eye.png', description: '야간 시야가 증가합니다.', disabled_traits: [] },
    { name: '민첩한', points: -2, icon: '/icons/agility.png', description: '움직임이 더 민첩해집니다.', disabled_traits: ['덤벙댐'] },
    { name: '등산애호가', points: -2, icon: '/icons/climber.png', description: '높은 지형에서도 더 안전하게 이동할 수 있습니다.', disabled_traits: ['겁쟁이'] },
    { name: '속독', points: -2, icon: '/icons/fast_reading.png', description: '책 읽는 속도가 빨라집니다.', disabled_traits: ['정독'] },
    { name: '잠이 없는', points: -2, icon: '/icons/no_sleep.png', description: '잠이 줄어도 피로가 적게 쌓입니다.', disabled_traits: ['불면증'] },
    { name: '강철 위장', points: -3, icon: '/icons/iron_stomach.png', description: '오염된 음식을 먹어도 식중독에 걸릴 확률이 낮아집니다.', disabled_traits: ['약한 위장'] },
    { name: '강한 회복력', points: -4, icon: '/icons/strong_recovery.png', description: '부상이 빠르게 회복됩니다.', disabled_traits: ['약한 회복력'] },
    { name: '난사꾼', points: -4, icon: '/icons/wild_shooter.png', description: '사격 속도가 빨라집니다.', disabled_traits: ['정밀 사격'] },
    { name: '고집불통', points: -3, icon: '/icons/stubborn.png', description: '정신력이 더 강해집니다.', disabled_traits: ['겁쟁이'] },
    { name: '튼튼한 폐', points: -2, icon: '/icons/strong_lungs.png', description: '스태미나가 더 오래 지속됩니다.', disabled_traits: ['약한 폐'] },
];

// Negative Traits 샘플 데이터
const negativeTraits: Trait[] = [
    { name: '초보운전', points: +1, icon: '/icons/beginner_driver.png', description: '운전 속도가 느려지고 사고를 낼 가능성이 높아집니다.', disabled_traits: [] },
    { name: '서투른', points: +2, icon: '/icons/clumsy.png', description: '소리를 더 많이 내며, 은신 능력이 감소합니다.', disabled_traits: ['속도광'] },
    { name: '덤벙댐', points: +2, icon: '/icons/careless.png', description: '행동이 조심스럽지 못해 부상을 입기 쉽습니다.', disabled_traits: ['민첩한'] },
    { name: '겁쟁이', points: +2, icon: '/icons/coward.png', description: '공포 상태에 더 쉽게 빠집니다.', disabled_traits: ['고집불통'] },
    { name: '정독', points: +2, icon: '/icons/slow_reader.png', description: '책 읽는 속도가 느립니다.', disabled_traits: ['속독'] },
    { name: '불면증', points: +2, icon: '/icons/insomnia.png', description: '잠을 자도 피로가 잘 해소되지 않습니다.', disabled_traits: ['잠이 없는'] },
    { name: '약한 위장', points: +3, icon: '/icons/weak_stomach.png', description: '오염된 음식에 더 취약합니다.', disabled_traits: ['강철 위장'] },
    { name: '약한 회복력', points: +4, icon: '/icons/weak_recovery.png', description: '부상이 회복되기까지 시간이 더 오래 걸립니다.', disabled_traits: ['강한 회복력'] },
    { name: '정밀 사격', points: +4, icon: '/icons/precision_shooter.png', description: '사격 속도가 느리지만 명중률이 높습니다.', disabled_traits: ['난사꾼'] },
    { name: '약한 폐', points: +2, icon: '/icons/weak_lungs.png', description: '스태미나가 빠르게 소모됩니다.', disabled_traits: ['튼튼한 폐'] },
    { name: '공포증', points: +3, icon: '/icons/phobia.png', description: '특정 상황에서 스트레스가 빠르게 증가합니다.', disabled_traits: [] },
];

const CustomBuilder: React.FC = () => {
    const [chosenTraits, setChosenTraits] = useState<Trait[]>([]);
    const [disabledTraits, setDisabledTraits] = useState<string[]>([]);
    const [hoveredTrait, setHoveredTrait] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    // 선택된 특성의 총 점수 계산
    const totalPoints = chosenTraits.reduce((sum, trait) => sum + trait.points, 0);

    // 마우스 움직임 핸들러
    const handleMouseMove = (event: React.MouseEvent) => {
        setTooltipPosition({ x: event.clientX + 10, y: event.clientY + 10 }); // 커서 근처에 표시
    };

    // Trait 클릭 핸들러
    const handleTraitClick = (trait: Trait) => {
        // 중복 추가 방지
        if (!chosenTraits.find((t) => t.name === trait.name)) {
            setChosenTraits([...chosenTraits, trait]);
            setDisabledTraits([...disabledTraits, ...trait.disabled_traits]);
        }
    };

    // 선택된 Trait 제거 핸들러
    const handleRemoveTrait = (traitName: string) => {
        const traitToRemove = chosenTraits.find((trait) => trait.name === traitName);
        if (traitToRemove) {
            setChosenTraits(chosenTraits.filter((trait) => trait.name !== traitName));
            // 비활성화 해제
            setDisabledTraits(
                disabledTraits.filter((disabled) => !traitToRemove.disabled_traits.includes(disabled))
            );
        }
    };

    return (
        <div className={styles.builderpage}>
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

            <div className={styles.grid}>

                <h2 className={styles.title}>직업</h2>
                <h2 className={styles.title}>긍정 특성</h2>
                <div className={styles.selectedTraitsHeader}>
                    <h2 className={styles.title}>선택한 특성</h2>
                    <span className={styles.totalPoints}>특성 합계: {totalPoints}</span>
                </div>

                <div className={styles.occupations}>
                    <p>무직</p>
                </div>

                <div className={styles.traits}>
                    <ul className={styles.traitsList}>
                        {positiveTraits.map((trait, index) => (
                            <li
                                key={index}
                                className={`${styles.traitItem} ${disabledTraits.includes(trait.name) ? styles.disabled : ""
                                    }`}
                                onClick={() => !disabledTraits.includes(trait.name) && handleTraitClick(trait)}
                                onMouseEnter={() => setHoveredTrait(trait.name)}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={() => setHoveredTrait(null)}
                            >
                                <img src={trait.icon} alt={trait.name} className={styles.traitIcon} />
                                <span className={styles.traitName}>{trait.name}</span>
                                <span className={styles.traitPoints}>{trait.points}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.chosenTraits}>
                    <ul className={styles.traitsList}>
                        {chosenTraits.map((trait, index) => (
                            <li
                                key={index}
                                className={styles.traitItem}
                                onClick={() => handleRemoveTrait(trait.name)}
                                onMouseEnter={() => setHoveredTrait(trait.name)}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={() => setHoveredTrait(null)}
                            >
                                <img src={trait.icon} alt={trait.name} className={styles.traitIcon} />
                                <span className={styles.traitName}>{trait.name}</span>
                                <span className={styles.traitPoints}>{trait.points}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <h2 className={styles.title}>부정 특성</h2>
                <h2 className={styles.title}>Major Skills</h2>

                <div className={styles.traits}>
                    <ul className={styles.traitsList}>
                        {negativeTraits.map((trait, index) => (
                            <li
                                key={index}
                                className={`${styles.traitItem} ${disabledTraits.includes(trait.name) ? styles.disabled : ""
                                    }`}
                                onClick={() => !disabledTraits.includes(trait.name) && handleTraitClick(trait)}
                                onMouseEnter={() => setHoveredTrait(trait.name)}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={() => setHoveredTrait(null)}
                            >
                                <img src={trait.icon} alt={trait.name} className={styles.traitIcon} />
                                <span className={styles.traitName}>{trait.name}</span>
                                <span className={styles.traitPoints}>{trait.points}</span>
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
            {/* 설명 박스 */}
            {hoveredTrait && (
                <div
                    className={styles.tooltip}
                    style={{
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y}px`,
                    }}
                >
                    {
                        positiveTraits.find((trait) => trait.name === hoveredTrait)?.description ||
                        negativeTraits.find((trait) => trait.name === hoveredTrait)?.description
                    }
                </div>
            )}
        </div>
    );
};

export default CustomBuilder;