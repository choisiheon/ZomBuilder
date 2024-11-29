"use client";

import React, { useState } from 'react';
import styles from '../../../styles/Modal_Builder/modal.module.css';

type ModalProps = {
    job_id: number | null;
    trait_ids: string;
    mode: string; 
    onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ job_id, trait_ids, mode, onClose }) => {
    const [comment, setComment] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // 금지된 단어 목록
    const forbiddenWords = ["노", "무현", "대림", "머림", "재명", "응디", "좆", "부랄", "할카스", "디시", "부랄"];

    const handlePost = async () => {
        if (!job_id || !trait_ids || !comment || !password) {
            alert("빌드 제목과 비밀번호를 모두 입력해주세요!");
            return;
        }

        // 댓글에 금지어 포함 여부 확인
        const hasForbiddenWord = forbiddenWords.some((word) =>
            comment.includes(word)
        );
        if (hasForbiddenWord) {
            alert("입력한 제목에 금지된 단어가 포함되어 있습니다. 필드가 초기화됩니다.");
            setComment(''); // 제목 필드 초기화
            return;
        }

        try {
            const response = await fetch("https://server.zombuilder.com/post/cPosts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    job_id,
                    trait_id: trait_ids,
                    mode: mode,
                    comment,
                    password,
                }),
            });

            if (response.ok) {
                alert(`"${comment}" 빌드가 등록되었습니다!`);
                onClose(); // 모달 닫기
            } else {
                const errorData = await response.json();
                alert(`오류 발생: ${errorData.message || "서버 문제입니다."}`);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("서버와의 통신 중 문제가 발생했습니다.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        // 금지된 단어 실시간 확인
        const hasForbiddenWord = forbiddenWords.some((word) => value.includes(word));
        if (hasForbiddenWord) {
            alert("금지된 단어를 입력할 수 없습니다.");
            setComment(''); // 필드 초기화
            return;
        }

        setComment(value); // 금지된 단어가 없을 경우만 상태 업데이트
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <h1 className={styles.modalHeader}>내 빌드 공유하기</h1>
                <input
                    type="text"
                    placeholder="빌드 제목 입력"
                    value={comment}
                    onChange={handleInputChange} // 입력값 변경 처리
                    className={styles.modalInput}
                />
                <input
                    type="password"
                    placeholder="삭제시 비밀번호 설정"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.modalInput}
                />
                <div className={styles.modalButtonGroup}>
                    <button onClick={handlePost} className={styles.submitButton}>
                        공유하기
                    </button>
                    <button onClick={onClose} className={styles.cancelButton}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;