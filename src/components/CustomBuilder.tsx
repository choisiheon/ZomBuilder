"use client";

// pages/custom-page.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // next/image에서 Image를 임포트
import styles from '../../styles/builderpage/Builder.module.css'; // 스타일을 위한 CSS 모듈 임포트
import Link from 'next/link';
import Modal from '../app/Modal_Builder/Modal';
import { useSearchParams } from "next/navigation"; // 모달 컴포넌트 임포트

// 직업 데이터 타입 정의
type Job = {
    id: number;
    name: string;
    description: string;
    point: number;
    effect: string;
    active_trait: string;
    image: string;
    mode: string;
}

// Trait 데이터 타입 정의
type Trait = {
    id: number;
    group: string;
    trait_name: string;
    description: string;
    effect: string;
    points: number;
    disabled_traits: string;
    disabled_jobs: string;
    mode: string;
    image: string;
    selected?: boolean; // 선택된 특성 여부
    locked?: boolean;   // 직업에 의해 추가된 특성 여부
};

// MajorSkill 데이터 타입 정의
type MajorSkill = {
    name: string;
    points: number;
};

interface CustomBuilderProps {
    id: string;
}

const CustomBuilder: React.FC<CustomBuilderProps> = ({ id }) => {
    const searchParams = useSearchParams(); // 쿼리 파라미터 가져오기
    const [postId, setPostId] = useState<number | null>(null); // 게시글 ID 상태
    const [jobs, setJobs] = useState<Job[]>([]); // 직업 선택
    const [currentMode, setCurrentMode] = useState<string>('X'); // 현재 선택된 모드 표시
    const [positiveTraits, setPositiveTraits] = useState<Trait[]>([]); // 긍정 특성
    const [negativeTraits, setNegativeTraits] = useState<Trait[]>([]); // 부정 특성
    const [disabledTraits, setDisabledTraits] = useState<string[]>([]); // 비활성화된 특성
    const [totalPoints, setTotalPoints] = useState<number>(0); // 특성 점수 계산
    const [selectedJob, setSelectedJob] = useState<number | null>(null); // 선택된 직업
    const [selectedTraits, setSelectedTraits] = useState<Trait[]>([]); // 선택된 특성
    const [majorSkills, setMajorSkills] = useState<MajorSkill[]>([
        { name: "체력", points: 5 },
        { name: "근력", points: 5 },
    ]); // 기본값 포함한 획득한 기술
    const [isOverLimit, setIsOverLimit] = useState<boolean>(false); // 경고 상태
    const [hoveredTrait, setHoveredTrait] = useState<string | null>(null); // 설명
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }); // 설명 표시 위치설정
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [modalData, setModalData] = useState<{ job_id: number | null; trait_ids: string; mode: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태
    const [isBlocked, setIsBlocked] = useState(false); // 입력 차단 상태

    const fetchJobs = async (mode: string) => {
        setCurrentMode(mode);

        try {
            const response = await fetch(`https://server.zombuilder.com/api/jobs?mode=${mode}`);
            const data = await response.json();

            if (data.success) {
                setJobs(data.data);
                return data.data; // 데이터를 반환합니다.
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching job data:', error);
            return [];
        }
    };

    // 데이터 가져오기
    const fetchTraits = async (mode: string) => {
        setCurrentMode(mode);
        try {
            const positiveUrl =
                mode === "X"
                    ? "https://server.zombuilder.com/api/vTraits?group=positive"
                    : "https://server.zombuilder.com/api/mTraits?group=positive";
            const negativeUrl =
                mode === "X"
                    ? "https://server.zombuilder.com/api/vTraits?group=negative"
                    : "https://server.zombuilder.com/api/mTraits?group=negative";

            const [positiveResponse, negativeResponse] = await Promise.all([
                fetch(positiveUrl),
                fetch(negativeUrl),
            ]);

            const positiveData = await positiveResponse.json();
            const negativeData = await negativeResponse.json();

            if (positiveData.success) setPositiveTraits(positiveData.data);
            if (negativeData.success) setNegativeTraits(negativeData.data);

            return {
                positiveTraits: positiveData.success ? positiveData.data : [],
                negativeTraits: negativeData.success ? negativeData.data : [],
            };
        } catch (error) {
            console.error("Error fetching traits:", error);
            return { positiveTraits: [], negativeTraits: [] };
        }
    };

    // 초기 데이터 설정
    useEffect(() => {
        fetchJobs("X"); // 초기 모드는 "X"
        fetchTraits("X");
    }, []);

    // 빌드 데이터 가져오기
    useEffect(() => {
        if (!id) return;

        const fetchBuildData = async () => {
            try {
                const response = await fetch(`https://server.zombuilder.com/post/rPosts/${id}`);
                const data = await response.json();

                if (!data.success || !data.data) {
                    console.warn('API 응답이 예상한 형식이 아닙니다.');
                    return;
                }

                const { job_id, trait_id, modecheck } = data.data;

                // 모드 설정
                if (modecheck === 'X' || modecheck === 'O') {
                    setCurrentMode(modecheck);
                } else {
                    console.warn('유효하지 않은 modecheck 값:', modecheck);
                    return;
                }

                // 모드 데이터 로드 후 직업 및 특성 설정
                const fetchedJobs = await fetchJobs(modecheck);
                const fetchedTraits = await fetchTraits(modecheck);

                // 직업 선택
                const job = fetchedJobs.find((j: Job) => j.id === job_id);
                if (job) {
                    handleJobSelect(job, fetchedTraits);
                } else {
                    console.warn(`job_id ${job_id}에 해당하는 직업을 찾을 수 없습니다.`);
                }

                // 특성 선택
                if (trait_id) {
                    const traitIds = trait_id.split(',').map((id: string) => Number(id.trim()));
                    traitIds.forEach((traitId: number) => {
                        const trait =
                            fetchedTraits.positiveTraits.find((t: Trait) => t.id === traitId) ||
                            fetchedTraits.negativeTraits.find((t: Trait) => t.id === traitId);

                        if (trait) {
                            handleTraitSelect(trait);
                        } else {
                            console.warn(`trait_id ${traitId}에 해당하는 특성을 찾을 수 없습니다.`);
                        }
                    });
                }
            } catch (error) {
                console.error('Error during job and trait selection:', error);
            }
        };

        fetchBuildData();
    }, [id]);




    // effect 데이터 가공
    const updateMajorSkills = (job: Job | null, traits: Trait[]) => {
        const effects: string[] = [];
        const initialSkills: Record<string, number> = {
            체력: 5,
            근력: 5,
        };

        // 선택된 직업과 특성의 effect 값만 가져옴
        if (job) {
            effects.push(...job.effect.split(',').map((e) => e.trim()));
        }
        traits
            .filter((trait) => trait.selected)
            .forEach((trait) =>
                effects.push(...trait.effect.split(',').map((e) => e.trim()))
            );

        const skillMap = { ...initialSkills };

        // effect 가공 및 정리
        effects.forEach((effect) => {
            if (!effect || effect.includes('X')) return;

            const [name, points] = effect.split('+').map((e) => e.trim());
            const value = parseInt(points, 10);

            if (!name || isNaN(value)) return;

            if (skillMap[name]) {
                skillMap[name] += value;
            } else {
                skillMap[name] = value;
            }
        });

        const skills = Object.entries(skillMap)
            .filter(([, points]) => points > 0)
            .map(([name, points]) => ({ name, points }));

        setMajorSkills(skills);

        // 경고 상태 업데이트
        const isLimitExceeded = skills.some((skill) => skill.points > 10);
        setIsOverLimit(isLimitExceeded);
    };

    // 검색 버튼 클릭 시 실행되는 핸들러
    const handleSearchClick = () => {
        if (searchQuery.trim() === "") {
            alert("검색어를 입력하세요.");
            return;
        }

        let found = false; // 검색 결과 상태 초기화

        // 직업 검색
        const matchingJob = jobs.find((job) =>
            job.name.toLowerCase() === searchQuery.trim().toLowerCase()
        );

        // 직업 선택 처리
        if (matchingJob) {
            handleJobSelect(matchingJob);
            found = true;
        }

        // 특성 검색
        const matchingTrait =
            positiveTraits.find((trait) =>
                trait.trait_name.toLowerCase() === searchQuery.trim().toLowerCase()
            ) ||
            negativeTraits.find((trait) =>
                trait.trait_name.toLowerCase() === searchQuery.trim().toLowerCase()
            );

        // 특성 선택 처리
        if (matchingTrait) {
            handleTraitSelect(matchingTrait);
            found = true;
        }

        // 검색 결과가 없는 경우에만 알림 표시
        if (!found) {
            alert("일치하는 직업 또는 특성을 찾을 수 없습니다.");
        }

        setSearchQuery(""); // 검색어 초기화
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !isBlocked &&
            event.nativeEvent.isComposing === false) {
            setIsBlocked(true); // 입력 차단 활성화
            handleSearchClick();

            // 1초 후 차단 해제
            setTimeout(() => {
                setIsBlocked(false);
            }, 500);
        }
    };

    // 직업 선택 핸들러
    const handleJobSelect = (
        job: Job,
        fetchedTraits?: { positiveTraits: Trait[]; negativeTraits: Trait[] }
    ) => {
        if (selectedJob === job.id) {
            // 이미 선택된 직업 클릭 시 선택 해제
            setSelectedJob(null);
            setTotalPoints((prev) => prev - job.point); // 직업 포인트 차감

            // 특성과 상태 초기화
            setPositiveTraits((traits) =>
                traits.map((t) => ({ ...t, selected: false, locked: false }))
            );
            setNegativeTraits((traits) =>
                traits.map((t) => ({ ...t, selected: false, locked: false }))
            );
            setDisabledTraits([]); // 비활성화 상태 초기화
            setSelectedTraits([]); // 선택된 특성 초기화
            updateMajorSkills(null, []); // 직업 초기화 시 majorSkills 초기화
        } else {
            // 새 직업 선택
            setSelectedJob(job.id);
            setTotalPoints(job.point); // 직업 포인트 추가

            // 초기화
            setPositiveTraits((traits) =>
                traits.map((t) => ({ ...t, selected: false, locked: false }))
            );
            setNegativeTraits((traits) =>
                traits.map((t) => ({ ...t, selected: false, locked: false }))
            );
            setDisabledTraits([]);
            setSelectedTraits([]);

            // 활성 특성 처리
            const activeTraits = job.active_trait.split(',').map((trait) => trait.trim());
            const newDisabledTraits: string[] = [];
            const updatedSelectedTraits: Trait[] = [];

            activeTraits.forEach((activeTraitName) => {
                const matchingTrait =
                    (fetchedTraits?.positiveTraits || positiveTraits).find((t) => t.trait_name === activeTraitName) ||
                    (fetchedTraits?.negativeTraits || negativeTraits).find((t) => t.trait_name === activeTraitName);

                if (matchingTrait) {
                    // 활성화된 특성을 선택 및 잠금
                    if (matchingTrait.group === "긍정") {
                        setPositiveTraits((traits) =>
                            traits.map((t) =>
                                t.trait_name === activeTraitName
                                    ? { ...t, selected: true, locked: true }
                                    : t
                            )
                        );
                    } else if (matchingTrait.group === "부정") {
                        setNegativeTraits((traits) =>
                            traits.map((t) =>
                                t.trait_name === activeTraitName
                                    ? { ...t, selected: true, locked: true }
                                    : t
                            )
                        );
                    }

                    updatedSelectedTraits.push({ ...matchingTrait, selected: true });
                    const disabled = matchingTrait.disabled_traits.split(',').map((t) => t.trim());
                    newDisabledTraits.push(...disabled);
                }
            });

            setDisabledTraits(newDisabledTraits);
            setSelectedTraits(updatedSelectedTraits);

            // **여기에서 바로 MajorSkills 업데이트**
            updateMajorSkills(job, updatedSelectedTraits);
        }
    };

    // 특성 선택 핸들러
    const handleTraitSelect = (trait: Trait) => {
        if (disabledTraits.includes(trait.trait_name) || trait.locked || trait.selected) {
            console.warn(`특성 ${trait.trait_name}은 선택 불가.`);
            return; // 이미 선택되었거나 잠긴 특성은 선택 불가
        }

        // 선택된 특성 상태 업데이트
        if (trait.group === "긍정") {
            setPositiveTraits((traits) =>
                traits.map((t) => (t.id === trait.id ? { ...t, selected: true } : t))
            );
        } else if (trait.group === "부정") {
            setNegativeTraits((traits) =>
                traits.map((t) => (t.id === trait.id ? { ...t, selected: true } : t))
            );
        }

        // 선택된 특성 추가
        setSelectedTraits((prev) => [...prev, { ...trait, selected: true }]);

        // 포인트 업데이트
        setTotalPoints((prev) => prev + trait.points);

        // 비활성화 상태 업데이트
        const disabledList = trait.disabled_traits.split(',').map((t) => t.trim());
        setDisabledTraits((prev) => Array.from(new Set([...prev, ...disabledList])));

        // MajorSkills 업데이트
        updateMajorSkills(
            jobs.find((job) => job.id === selectedJob) || null,
            [...positiveTraits, { ...trait, selected: true }]
        );
    };


    // 특성 선택 취소 핸들러
    const handleTraitDeselect = (trait: Trait) => {
        if (trait.locked) {
            return; // 직업에 의해 추가된 특성은 해제 불가
        }

        // 선택 상태 해제
        if (trait.group === "긍정") {
            setPositiveTraits((traits) =>
                traits.map((t) => (t.id === trait.id ? { ...t, selected: false } : t))
            );
        } else if (trait.group === "부정") {
            setNegativeTraits((traits) =>
                traits.map((t) => (t.id === trait.id ? { ...t, selected: false } : t))
            );
        }

        // 선택된 특성에서 제거
        setSelectedTraits((prev) => prev.filter((t) => t.id !== trait.id));

        // 포인트 업데이트
        setTotalPoints((prev) => prev - trait.points);

        // 비활성화 상태 재계산
        const disabledList = trait.disabled_traits.split(',').map((t) => t.trim());
        setDisabledTraits((prev) => {
            const activeTraits = [...positiveTraits, ...negativeTraits].filter((t) => t.selected && t.id !== trait.id);

            // 여전히 비활성화가 필요한 특성 계산
            const stillDisabled = activeTraits.reduce<string[]>((acc, activeTrait) => {
                const activeDisabledList = activeTrait.disabled_traits.split(',').map((t) => t.trim());
                return [...acc, ...activeDisabledList];
            }, []);

            // disabledTraits에서 필요한 항목만 남김
            return stillDisabled;
        });

        // MajorSkills 업데이트
        updateMajorSkills(
            jobs.find((job) => job.id === selectedJob) || null,
            [...positiveTraits.filter((t) => t.id !== trait.id), ...negativeTraits.filter((t) => t.id !== trait.id)]
        );
    };

    // 모드 설명 데이터
    const modeDescriptions: { [key: string]: string } = {
        "X": "좀보이드 기본모드로 순정상태에 모드입니다",
        "O": "[모드 설정]\nMore Traits\nMore Traits - Disable Prepared Traits\nMore Traits - Disable Specialization Traits\nSimple Overhaul: Traits and Occupations (SOTO)\nMod Manager",
    };

    // 마우스 움직임 핸들러
    const handleMouseEnter = (description: string, event: React.MouseEvent) => {
        setHoveredTrait(description); // 툴팁 내용 설정
        setTooltipPosition({ x: event.clientX + 10, y: event.clientY + 10 }); // 툴팁 위치 설정
    };

    const handleMouseLeave = () => {
        setHoveredTrait(null); // 툴팁 내용 초기화
    };

    // 모달 데이터
    const handleShareBuild = () => {
        if (!selectedJob || selectedTraits.length === 0) {
            alert("직업과 특성을 선택하세요.");
            return;
        }

        const traitIds = selectedTraits.map((trait) => trait.id).join(',');
        setModalData({ job_id: selectedJob, trait_ids: traitIds, mode: currentMode });
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    // 무작위 선택 핸들러 추가
    const handleRandomSelection = async () => {
        try {
            const response = await fetch("https://server.zombuilder.com/post/rPosts/random");
            const data = await response.json();

            if (!data.success || !data.data) {
                console.warn('API 응답이 예상한 형식이 아닙니다.');
                return;
            }

            const { job_id, trait_id, modecheck } = data.data;

            // 모드 설정
            if (modecheck === 'X' || modecheck === 'O') {
                setCurrentMode(modecheck);
            } else {
                console.warn('유효하지 않은 modecheck 값:', modecheck);
                return;
            }

            // 모드 데이터 로드 후 직업 및 특성 설정
            const fetchedJobs = await fetchJobs(modecheck);
            const fetchedTraits = await fetchTraits(modecheck);

            // 직업 선택
            const job = fetchedJobs.find((j: Job) => j.id === job_id);
            if (job) {
                handleJobSelect(job, fetchedTraits);
            } else {
                console.warn(`job_id ${job_id}에 해당하는 직업을 찾을 수 없습니다.`);
            }

            // 특성 선택
            if (trait_id) {
                const traitIds = trait_id.split(',').map((id: string) => Number(id.trim()));
                traitIds.forEach((traitId: number) => {
                    const trait =
                        fetchedTraits.positiveTraits.find((t: Trait) => t.id === traitId) ||
                        fetchedTraits.negativeTraits.find((t: Trait) => t.id === traitId);

                    if (trait) {
                        handleTraitSelect(trait);
                    } else {
                        console.warn(`trait_id ${traitId}에 해당하는 특성을 찾을 수 없습니다.`);
                    }
                });
            }
        } catch (error) {
            console.error('Error during random selection:', error);
        }
    };

    // 초기화 핸들러
    const handleReset = () => {
        setSelectedJob(null);
        setTotalPoints(0);
        setPositiveTraits((traits) =>
            traits.map((t) => ({ ...t, selected: false, locked: false }))
        );
        setNegativeTraits((traits) =>
            traits.map((t) => ({ ...t, selected: false, locked: false }))
        );
        setDisabledTraits([]);
        setMajorSkills([
            { name: "체력", points: 5 },
            { name: "근력", points: 5 },
        ]); // 기본값 복원
        setIsOverLimit(false); // 경고 상태 초기화
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
                <div className={styles.searchInputGroup}>
                    <input
                        type="text"
                        placeholder="직업 또는 특성 이름을 입력하세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // 검색어 상태 업데이트
                        className={styles.searchInput}
                        onKeyDown={handleKeyDown} // Enter 키 이벤트
                    />
                    <button className={styles.searchButton} onClick={handleSearchClick}>
                        <img src="../image/searchIcon.png" alt="search" className={styles.searchInputIcon} />
                    </button>
                </div>
            </div>

            {/* 모드 선택창 */}
            <div className={styles.modePick}>
                <h3>Mode Pick:</h3>
                <div className={styles.modeButtonGroup}>
                    {["X", "O"].map((modeKey) => (
                        <button
                            key={modeKey}
                            className={`${styles.modeButton} ${currentMode === modeKey ? styles.selected : ''}`}
                            onClick={() => {
                                setMajorSkills([
                                    { name: "체력", points: 5 },
                                    { name: "근력", points: 5 },
                                ]); // 모드 변경 시 획득 기술 초기화
                                fetchJobs(modeKey);
                                fetchTraits(modeKey);
                            }}
                            onMouseEnter={(event) => {
                                const description = modeDescriptions[modeKey];
                                handleMouseEnter(description, event);
                            }}
                            onMouseLeave={() => setHoveredTrait(null)}
                        >
                            <img
                                src={
                                    modeKey === "X"
                                        ? "../image/modeLogo1.png"  // Vanilla 모드 이미지
                                        : "../image/modeLogo2.png"      // MST 모드 이미지
                                }
                                alt={`${modeKey} mode logo`}
                                className={styles.modeLogo}
                            />
                            {modeKey === "X" && "Vanilla"}
                            {modeKey === "O" && "More Simple Traits (MST) & Simple Overhaul Traits and Occupations (SOTO)"}
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

                {/* 직업 선택창 */}
                <div className={styles.occupations}>
                    <ul className={styles.occupationsList}>
                        {jobs.map((job) => (
                            <li
                                key={job.id}
                                className={selectedJob === job.id ? styles.selected : ''} // 선택된 직업에 스타일 적용
                                onClick={() => handleJobSelect(job)} // 직업 선택 핸들러 호출
                                onMouseEnter={(event) => handleMouseEnter(job.description, event)}
                                onMouseLeave={handleMouseLeave}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={`../image/job/${job.image}`} alt={job.name} className={styles.jobIcon} />
                                <span className={styles.jobName}>{job.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 긍정 특성창 */}
                <div className={styles.positiveTraits}>
                    <ul className={styles.traitsList}>
                        {positiveTraits.map((trait) => (
                            <li key={trait.id}
                                className={
                                    disabledTraits.includes(trait.trait_name)
                                        ? styles.disabled
                                        : trait.selected
                                            ? styles.selected
                                            : ''
                                }
                                onClick={() => handleTraitSelect(trait)}
                                onMouseEnter={(event) => handleMouseEnter(trait.description, event)}
                                onMouseLeave={handleMouseLeave}
                                style={{ cursor: "pointer" }}
                            >
                                <img src={`../image/trait/${trait.image}`} alt={trait.trait_name} className={styles.traitIcon} />
                                <span className={styles.traitName}>{trait.trait_name}</span>
                                <span className={styles.positiveTraitPoints}>{trait.points > 0 ? `+ ${trait.points}` : `- ${Math.abs(trait.points)}`}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 선택 특성창 */}
                <div className={styles.chosenTraits}>
                    <ul className={styles.traitsList}>
                        {[...positiveTraits, ...negativeTraits]
                            .filter((trait) => trait.selected) // 선택된 특성만 필터링
                            .map((trait) => (
                                <li
                                    key={trait.id}
                                    onMouseEnter={(event) => handleMouseEnter(trait.description, event)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleTraitDeselect(trait)} // 선택 해제
                                    style={{ cursor: "pointer" }}
                                >
                                    <img
                                        src={`../image/trait/${trait.image}`}
                                        alt={trait.trait_name}
                                        className={styles.traitIcon}
                                    />
                                    <span className={styles.traitName}>{trait.trait_name}</span>
                                    {/* 0보다 작으면 빨간, 0보다 크면 초록 */}
                                    <span className={`${styles.traitPoints} ${trait.points > 0 ? styles.negativeTraitPoints : styles.positiveTraitPoints}`}>{trait.points > 0 ? `+ ${trait.points}` : `- ${Math.abs(trait.points)}`}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>

                <h2 className={styles.negativeTitle}>부정 특성</h2>
                <h2 className={styles.acquiredSkillsTitle}>취득 기술</h2>

                {/* 부정 특성창 */}
                <div className={styles.negativeTraits}>
                    <ul className={styles.traitsList}>
                        {negativeTraits.map((trait) => (
                            <li
                                key={trait.id}
                                className={
                                    disabledTraits.includes(trait.trait_name)
                                        ? styles.disabled
                                        : trait.selected
                                            ? styles.selected
                                            : ''
                                }
                                onClick={() => handleTraitSelect(trait)}
                                onMouseEnter={(event) => handleMouseEnter(trait.description, event)}
                                onMouseLeave={handleMouseLeave}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={`../image/trait/${trait.image}`}
                                    alt={trait.trait_name}
                                    className={styles.traitIcon}
                                />
                                <span className={styles.traitName}>{trait.trait_name}</span>
                                <span className={styles.negativeTraitPoints}>{trait.points > 0 ? `+ ${trait.points}` : `- ${Math.abs(trait.points)}`}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 획득 기술창 */}
                <div className={styles.majorSkills}>
                    <div className={styles.traitsList}>
                        {majorSkills.map((skill) => (
                            <li key={skill.name} className={styles.skillItem}>
                                <img src={`../image/skill/${skill.name}.png`} alt={skill.name} className={styles.traitIcon} />
                                <span className={styles.skillName}>{skill.name}</span>
                                <span className={styles.skillPointGroup}>
                                    {/* 포인트가 2로 나누어 떨어지는 경우, 이미지1 */}
                                    {Math.floor(skill.points / 2) > 0 &&
                                        [...Array(Math.min(Math.floor(skill.points / 2), 5))].map((_, index) => (
                                            <img key={`image1-${index}`} src="../image/skill/nemo2.png" alt="image1" className={styles.skillPointIcon} />
                                        ))
                                    }

                                    {/* 포인트가 소수점인 경우, 이미지2 */}
                                    {skill.points % 2 !== 0 && skill.points < 11 && (
                                        <img src="../image/skill/nemo1.png" alt="image2" className={styles.skillPointIcon2} />
                                    )}
                                </span>
                                {skill.points > 10 && (
                                    <span className={styles.warningIcon} title="값이 10을 초과했습니다!">
                                        ⚠️
                                    </span>
                                )}
                                <span className={styles.skillPoints}>{skill.points}</span>
                            </li>
                        ))}
                    </div>
                </div>

            </div>

            {/* 하단 버튼모음 */}
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={handleRandomSelection}>무작위</button>
                <button className={styles.button} onClick={handleReset}>초기화</button>
                <button
                    className={styles.buildShareButton}
                    onClick={handleShareBuild}
                    disabled={selectedJob === null || selectedTraits.length === 0}
                >
                    내 빌드 공유하기
                </button>
            </div>
            {isModalOpen && modalData && (
                <Modal job_id={modalData.job_id} trait_ids={modalData.trait_ids} mode={modalData.mode} onClose={closeModal} />
            )}
            {/* 설명 박스 */}
            {hoveredTrait && (
                <div
                    className={styles.tooltip}
                    style={{
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y}px`,
                    }}
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: hoveredTrait
                                .replace(/\n/g, '<br />') // \n을 <br />로 변환
                                .replace(/다,/g, (match, offset, str) => {
                                    // 괄호 안인지 확인
                                    const isInsideBrackets = str.slice(0, offset).split('(').length > str.slice(0, offset).split(')').length;
                                    return isInsideBrackets ? match : '다<br />';
                                })
                                .replace(/움,/g, '움<br />') // "움," 뒤에 움<br /> 추가
                                .replace(/득,/g, '득<br />') // "득," 뒤에 득<br /> 추가
                                .replace(/자,/g, '자<br />') // "자," 뒤에 자<br /> 추가
                                .replace(/가,/g, '가<br />') // "가," 뒤에 가<br /> 추가
                                .replace(/능,/g, '능<br />') // "능," 뒤에 능<br /> 추가
                                .replace(/소,/g, '소<br />') // "소," 뒤에 소<br /> 추가
                                .replace(/, \+/g, (match, offset, str) => {
                                    // 괄호 안인지 확인
                                    const isInsideBrackets = str.slice(0, offset).split('(').length > str.slice(0, offset).split(')').length;
                                    return isInsideBrackets ? match : '<br />+';
                                })
                                .replace(/, \-/g, (match, offset, str) => {
                                    // 괄호 안인지 확인
                                    const isInsideBrackets = str.slice(0, offset).split('(').length > str.slice(0, offset).split(')').length;
                                    return isInsideBrackets ? match : '<br />-';
                                })
                                .replace(/\), /g, ')<br />') // ")," 뒤에 )<br /> 추가
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomBuilder;