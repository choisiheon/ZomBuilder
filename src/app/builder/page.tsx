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
    mode: string;
};

// 직업 데이터 타입 정의
type Job = {
    job: string;
    image?: string; // 이미지는 선택적
    description: string;
    mode: string;
    active_trait: Trait[];
};

const Jobs: Job[] = [
    { job: "무직", image: "/image/Job/Jobless.png", description: "특별한 기술이 없는 일반적인 상태입니다.", active_trait: [{ name: "민첩한", points: -2, icon: "/icons/agility.png", description: "움직임이 더 민첩해집니다.", disabled_traits: ["덤벙댐"], mode: "1" }], mode: '1' },
    { job: "소방관", image: "/image/Job/Firefighter.png", description: "화재 진압 및 긴급 구조를 전문으로 합니다.", active_trait: [{ name: "강한 회복력", points: -4, icon: "/icons/strong_recovery.png", description: "부상이 빠르게 회복됩니다.", disabled_traits: ["약한 회복력"], mode: "2" }], mode: '2' },
    { job: "경찰관", image: "/image/Job/Police.png", description: "법과 질서를 유지하며 범죄를 예방합니다.", active_trait: [{ name: "고집불통", points: -3, icon: "/icons/stubborn.png", description: "정신력이 더 강해집니다.", disabled_traits: ["겁쟁이"], mode: "1" }], mode: '1' },
    { job: "공원경비원", image: "/image/Job/Sheriff.png", description: "공원의 안전을 책임지며 시설 관리를 합니다.", active_trait: [{ name: "튼튼한 폐", points: -2, icon: "/icons/strong_lungs.png", description: "스태미나가 더 오래 지속됩니다.", disabled_traits: ["약한 폐"], mode: "2" }], mode: '3' },
    { job: "건축인부", image: "/image/Job/ConstructionWorker.png", description: "건축 현장에서 육체 노동을 수행합니다.", active_trait: [{ name: "강철 위장", points: -3, icon: "/icons/iron_stomach.png", description: "오염된 음식을 먹어도 식중독에 걸릴 확률이 낮아집니다.", disabled_traits: ["약한 위장"], mode: "2" }], mode: '2' },
    { job: "목수", image: "/image/Job/Carpenter.png", description: "목재를 다루는 전문가로 가구 제작 및 수리를 합니다.", active_trait: [{ name: "속독", points: -2, icon: "/icons/fast_reading.png", description: "책 읽는 속도가 빨라집니다.", disabled_traits: ["정독"], mode: "2" }], mode: '1' },
    { job: "주방장", image: "/image/Job/Chef.png", description: "고급 요리를 전문으로 하는 주방 책임자입니다.", active_trait: [{ name: "잠이 없는", points: -2, icon: "/icons/no_sleep.png", description: "잠이 줄어도 피로가 적게 쌓입니다.", disabled_traits: ["불면증"], mode: "1" }], mode: '1' },
    { job: "정비사", image: "/image/Job/Mechanic.png", description: "기계 및 차량의 유지 보수를 담당합니다.", active_trait: [{ name: "난사꾼", points: -4, icon: "/icons/wild_shooter.png", description: "사격 속도가 빨라집니다.", disabled_traits: ["정밀 사격"], mode: "2" }], mode: '2' },
    { job: "농부", image: "/image/Job/Farmer.png", description: "작물 재배 및 가축 사육을 전문으로 합니다.", active_trait: [{ name: "등산애호가", points: -2, icon: "/icons/climber.png", description: "높은 지형에서도 더 안전하게 이동할 수 있습니다.", disabled_traits: ["겁쟁이"], mode: "1" }], mode: '1' },
    { job: "어부", image: "/image/Job/Fisherman.png", description: "물고기 및 기타 해양 자원을 잡는 일을 합니다.", active_trait: [{ name: "고양이의 눈", points: -2, icon: "/icons/cat_eye.png", description: "야간 시야가 증가합니다.", disabled_traits: [], mode: "1" }], mode: '2' },
    { job: "의사", image: "/image/Job/Doctor.png", description: "환자의 진단과 치료를 책임지는 전문가입니다.", active_trait: [{ name: "강한 회복력", points: -4, icon: "/icons/strong_recovery.png", description: "부상이 빠르게 회복됩니다.", disabled_traits: ["약한 회복력"], mode: "2" }], mode: '2' },
    { job: "필라테스 강사", image: "/image/Job/PilatesInstructor.png", description: "건강과 체력 강화를 위한 필라테스 전문가입니다.", active_trait: [{ name: "민첩한", points: -2, icon: "/icons/agility.png", description: "움직임이 더 민첩해집니다.", disabled_traits: ["덤벙댐"], mode: "1" }], mode: '1' },
    { job: "전기공", image: "/image/Job/Electrician.png", description: "전기 설비의 설치 및 수리를 담당합니다.", active_trait: [{ name: "속독", points: -2, icon: "/icons/fast_reading.png", description: "책 읽는 속도가 빨라집니다.", disabled_traits: ["정독"], mode: "2" }], mode: '1' },
    { job: "기술자", image: "/image/Job/Technician.png", description: "전문 기술을 바탕으로 다양한 작업을 수행합니다.", active_trait: [{ name: "난사꾼", points: -4, icon: "/icons/wild_shooter.png", description: "사격 속도가 빨라집니다.", disabled_traits: ["정밀 사격"], mode: "2" }], mode: '2' },
    { job: "용접공", image: "/image/Job/Welder.png", description: "금속을 연결하거나 수리하는 용접 전문가입니다.", active_trait: [{ name: "강철 위장", points: -3, icon: "/icons/iron_stomach.png", description: "오염된 음식을 먹어도 식중독에 걸릴 확률이 낮아집니다.", disabled_traits: ["약한 위장"], mode: "1" }], mode: '1' },
    { job: "자동차 정비사", image: "/image/Job/AutoMechanic.png", description: "자동차의 유지 보수 및 수리를 담당합니다.", active_trait: [{ name: "난사꾼", points: -4, icon: "/icons/wild_shooter.png", description: "사격 속도가 빨라집니다.", disabled_traits: ["정밀 사격"], mode: "2" }], mode: '2' },
    { job: "홈도둑", image: "/image/Job/Burglar.png", description: "은신 및 잠입 기술이 뛰어난 인물입니다.", active_trait: [{ name: "튼튼한 폐", points: -2, icon: "/icons/strong_lungs.png", description: "스태미나가 더 오래 지속됩니다.", disabled_traits: ["약한 폐"], mode: "1" }], mode: '2' },
    { job: "벌목꾼", image: "/image/Job/Lumberjack.png", description: "나무를 베어내는 전문가입니다.", active_trait: [{ name: "등산애호가", points: -2, icon: "/icons/climber.png", description: "높은 지형에서도 더 안전하게 이동할 수 있습니다.", disabled_traits: ["겁쟁이"], mode: "2" }], mode: '2' },
    { job: "간호사", image: "/image/Job/Nurse.png", description: "환자를 돌보고 치료를 지원하는 의료 전문가입니다.", active_trait: [{ name: "강한 회복력", points: -4, icon: "/icons/strong_recovery.png", description: "부상이 빠르게 회복됩니다.", disabled_traits: ["약한 회복력"], mode: "1" }], mode: '1' },
    { job: "햄버거 조리사", image: "/image/Job/BurgerCook.png", description: "햄버거와 간단한 요리를 전문으로 합니다.", active_trait: [{ name: "튼튼한 폐", points: -2, icon: "/icons/strong_lungs.png", description: "스태미나가 더 오래 지속됩니다.", disabled_traits: ["약한 폐"], mode: "2" }], mode: '1' },
    { job: "경비원", image: "/image/Job/SecurityGuard.png", description: "시설 및 자산의 안전을 책임지는 직업입니다.", active_trait: [{ name: "고집불통", points: -3, icon: "/icons/stubborn.png", description: "정신력이 더 강해집니다.", disabled_traits: ["겁쟁이"], mode: "1" }], mode: '1' },
];

const positiveTraits: Trait[] = [
    { name: "속도광", points: -1, icon: "/icons/speed.png", description: "속도가 매우 빨라집니다.", disabled_traits: ["서투른"], mode: '1' },
    { name: "고양이의 눈", points: -2, icon: "/icons/cat_eye.png", description: "야간 시야가 증가합니다.", disabled_traits: [], mode: '2' },
    { name: "민첩한", points: -2, icon: "/icons/agility.png", description: "움직임이 더 민첩해집니다.", disabled_traits: ["덤벙댐"], mode: '2' },
    { name: "등산애호가", points: -2, icon: "/icons/climber.png", description: "높은 지형에서도 더 안전하게 이동할 수 있습니다.", disabled_traits: ["겁쟁이"], mode: '1' },
    { name: "속독", points: -2, icon: "/icons/fast_reading.png", description: "책 읽는 속도가 빨라집니다.", disabled_traits: ["정독"], mode: '1' },
    { name: "잠이 없는", points: -2, icon: "/icons/no_sleep.png", description: "잠이 줄어도 피로가 적게 쌓입니다.", disabled_traits: ["불면증"], mode: '2' },
    { name: "강철 위장", points: -3, icon: "/icons/iron_stomach.png", description: "오염된 음식을 먹어도 식중독에 걸릴 확률이 낮아집니다.", disabled_traits: ["약한 위장"], mode: '1' },
    { name: "강한 회복력", points: -4, icon: "/icons/strong_recovery.png", description: "부상이 빠르게 회복됩니다.", disabled_traits: ["약한 회복력"], mode: '2' },
    { name: "난사꾼", points: -4, icon: "/icons/wild_shooter.png", description: "사격 속도가 빨라집니다.", disabled_traits: ["정밀 사격"], mode: '2' },
    { name: "고집불통", points: -3, icon: "/icons/stubborn.png", description: "정신력이 더 강해집니다.", disabled_traits: ["겁쟁이"], mode: '1' },
    { name: "튼튼한 폐", points: -2, icon: "/icons/strong_lungs.png", description: "스태미나가 더 오래 지속됩니다.", disabled_traits: ["약한 폐"], mode: '1' },
];

// Negative Traits 샘플 데이터
const negativeTraits: Trait[] = [
    { name: "초보운전", points: +1, icon: "/icons/beginner_driver.png", description: "운전 속도가 느려지고 사고를 낼 가능성이 높아집니다.", disabled_traits: [], mode: '1' },
    { name: "서투른", points: +2, icon: "/icons/clumsy.png", description: "소리를 더 많이 내며, 은신 능력이 감소합니다.", disabled_traits: ["속도광"], mode: '2' },
    { name: "덤벙댐", points: +2, icon: "/icons/careless.png", description: "행동이 조심스럽지 못해 부상을 입기 쉽습니다.", disabled_traits: ["민첩한"], mode: '2' },
    { name: "겁쟁이", points: +2, icon: "/icons/coward.png", description: "공포 상태에 더 쉽게 빠집니다.", disabled_traits: ["고집불통"], mode: '1' },
    { name: "정독", points: +2, icon: "/icons/slow_reader.png", description: "책 읽는 속도가 느립니다.", disabled_traits: ["속독"], mode: '1' },
    { name: "불면증", points: +2, icon: "/icons/insomnia.png", description: "잠을 자도 피로가 잘 해소되지 않습니다.", disabled_traits: ["잠이 없는"], mode: '2' },
    { name: "약한 위장", points: +3, icon: "/icons/weak_stomach.png", description: "오염된 음식에 더 취약합니다.", disabled_traits: ["강철 위장"], mode: '1' },
    { name: "약한 회복력", points: +4, icon: "/icons/weak_recovery.png", description: "부상이 회복되기까지 시간이 더 오래 걸립니다.", disabled_traits: ["강한 회복력"], mode: '1' },
    { name: "정밀 사격", points: +4, icon: "/icons/precision_shooter.png", description: "사격 속도가 느리지만 명중률이 높습니다.", disabled_traits: ["난사꾼"], mode: '2' },
    { name: "약한 폐", points: +2, icon: "/icons/weak_lungs.png", description: "스태미나가 빠르게 소모됩니다.", disabled_traits: ["튼튼한 폐"], mode: '1' },
    { name: "공포증", points: +3, icon: "/icons/phobia.png", description: "특정 상황에서 스트레스가 빠르게 증가합니다.", disabled_traits: [], mode: '2' },
];

const CustomBuilder: React.FC = () => {
    const [chosenTraits, setChosenTraits] = useState<Trait[]>([]);
    const [disabledTraits, setDisabledTraits] = useState<string[]>([]);
    const [hoveredTrait, setHoveredTrait] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [selectedJob, setSelectedJob] = useState<string | null>(null);
    const [mode, setMode] = useState<string>("1");

    // Job 클릭 핸들러
    const handleJobClick = (job: Job) => {
        setSelectedJob(job.job); // 선택된 직업을 상태로 설정

        // 직업의 활성 특성을 기반으로 선택된 특성을 초기화
        const newTraits = job.active_trait;
        setChosenTraits(newTraits);

        // 활성 특성의 비활성화 리스트를 갱신
        const newDisabledTraits = newTraits.flatMap((trait) => trait.disabled_traits);
        setDisabledTraits(newDisabledTraits);
    };

    // 현재 모드에 맞는 데이터 필터링
    const filteredJobs = Jobs.filter((job) => job.mode === mode);
    const filteredPositiveTraits = positiveTraits.filter((trait) => trait.mode === mode);
    const filteredNegativeTraits = negativeTraits.filter((trait) => trait.mode === mode);

    // Mode 변경 핸들러
    const handleModeChange = (newMode: string) => {
        setMode(newMode);
        setSelectedJob(null); // 직업 선택 초기화
        setChosenTraits([]); // 선택한 특성 초기화
        setDisabledTraits([]); // 비활성화 특성 초기화
    };

    // 모드 설명 데이터
    const modeDescriptions: { [key: string]: string } = {
        "1": "좀보이드 기본모드로 순정상태에 모드입니다",
        "2": "[모드 설정]\nMore Traits\nMore Traits - Disable Prepared Traits\nMore Traits - Disable Specialization Traits\nSimple Overhaul: Traits and Occupations (SOTO)\nMod Manager",
    };

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

        // 직업에서 활성화된 특성인지 확인
        const isJobTrait = Jobs.some((job) =>
            job.job === selectedJob && job.active_trait.some((t) => t.name === traitName)
        );

        // 직업 특성은 제거 불가
        if (isJobTrait) {
            return;
        }

        if (traitToRemove) {
            // 선택된 특성에서 제거
            setChosenTraits(chosenTraits.filter((trait) => trait.name !== traitName));
            // 비활성화된 특성 목록 갱신
            setDisabledTraits(
                disabledTraits.filter((disabled) => !traitToRemove.disabled_traits.includes(disabled))
            );
        }
    };

    // 초기화 버튼 핸들러
    const handleReset = () => {
        setSelectedJob(null); // 직업 초기화
        setChosenTraits([]); // 선택된 특성 초기화
        setDisabledTraits([]); // 비활성화된 특성 초기화
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
                    {["1", "2"].map((modeKey) => (
                        <button
                            key={modeKey}
                            className={styles.modeButton}
                            onClick={() => handleModeChange(modeKey)}
                            onMouseEnter={() => setHoveredTrait(`mode-${modeKey}`)} // 모드 설명을 hoveredTrait로 처리
                            onMouseLeave={() => setHoveredTrait(null)}
                            onMouseMove={handleMouseMove}
                        >
                            <img src="../image/modeLogo.png" alt="modeLogo" className={styles.modeLogo} />
                            {modeKey === "1" && "Vanilla"}
                            {modeKey === "2" && "More Simple Traits (MST) & Simple Overhaul Traits and Occupations (SOTO)"}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.grid}>

                <h2 className={styles.jobTitle}>직업</h2>
                <h2 className={styles.positiveTitle}>긍정 특성</h2>
                <div className={styles.selectedTraitsHeader}>
                    <h2 className={styles.selectedTraitsTitle}>선택한 특성</h2>
                    <span className={styles.totalPoints}>특성 합계: {totalPoints}</span>
                </div>

                <div className={styles.occupations}>
                    <ul className={styles.traitsList}>
                        {filteredJobs.map((job, index) => (
                            <li
                                key={index}
                                className={`${styles.traitItem} ${selectedJob === job.job ? styles.selected : ""
                                    }`}
                                onClick={() => handleJobClick(job)}
                                onMouseEnter={() => setHoveredTrait(job.job)}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={() => setHoveredTrait(null)}
                            >
                                <img src={job.image || ''} alt={job.job} className={styles.traitIcon} />
                                <span className={styles.traitName}>{job.job}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.positiveTraits}>
                    <ul className={styles.traitsList}>
                        {filteredPositiveTraits.map((trait, index) => (
                            <li
                                key={index}
                                className={`${styles.traitItem} ${chosenTraits.find((t) => t.name === trait.name) ? styles.selected : ""
                                    } ${disabledTraits.includes(trait.name) ? styles.disabled : ""}`}
                                onClick={() =>
                                    !disabledTraits.includes(trait.name) && handleTraitClick(trait)
                                }
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

                <h2 className={styles.negativeTitle}>부정 특성</h2>
                <h2 className={styles.acquiredSkillsTitle}>취득 기술</h2>

                <div className={styles.negativeTraits}>
                    <ul className={styles.traitsList}>
                        {filteredNegativeTraits.map((trait, index) => (
                            <li
                                key={index}
                                className={`${styles.traitItem} ${chosenTraits.find((t) => t.name === trait.name) ? styles.selected : ""
                                    } ${disabledTraits.includes(trait.name) ? styles.disabled : ""}`}
                                onClick={() =>
                                    !disabledTraits.includes(trait.name) && handleTraitClick(trait)
                                }
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
                <button className={styles.button} onClick={handleReset}>초기화</button>
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
                    {modeDescriptions[hoveredTrait.replace("mode-", "")]
                        ? modeDescriptions[hoveredTrait.replace("mode-", "")]
                            .split("\n") // 줄바꿈으로 분리
                            .map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))
                        : positiveTraits.find((trait) => trait.name === hoveredTrait)?.description ||
                        negativeTraits.find((trait) => trait.name === hoveredTrait)?.description ||
                        Jobs.find((job) => job.job === hoveredTrait)?.description}
                </div>
            )}
        </div>
    );
};


export default CustomBuilder;