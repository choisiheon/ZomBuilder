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

    const handlePost = async () => {
        if (!job_id || !trait_ids || !comment || !password) {
            alert("모든 필드를 입력해주세요!");
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
                alert("성공적으로 제출되었습니다!");
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

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <h1 className={styles.modalHeader}>내 빌드 공유하기</h1>
                <input
                    type="text"
                    placeholder="코멘트 입력"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={styles.modalInput}
                />
                <input
                    type="password"
                    placeholder="수정 및 삭제 비밀번호 설정"
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