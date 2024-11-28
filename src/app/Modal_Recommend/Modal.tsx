"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // useRouter 가져오기
import styles from "../../../styles/Modal_Recommend/modal.module.css";

type ModalProps = {
  id: number; // 게시글 ID
  jobId: number; // 직업 ID
  traitIds: string; // 특성 ID 문자열
  onClose: () => void; // 모달 닫기 함수
};



const RecommendModal: React.FC<ModalProps> = ({ id, jobId, traitIds, onClose }) => {
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // 라우터 객체 생성

  const handleDelete = async () => {
    if (!password) {
      alert("비밀번호를 입력해주세요!");
      return;
    }

    try {
      const response = await fetch(`https://server.zombuilder.com/post/dPosts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password, // 비밀번호를 JSON 형태로 전달
        }),
      });

      if (response.ok) {
        alert("해당 빌드가 삭제되었습니다!");
        onClose();
      } else {
        const errorData = await response.json();
        alert(`오류 발생: ${errorData.message || "서버 문제입니다."}`);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  const handleFetchBuild = () => {
    // 게시글 ID를 쿼리 파라미터로 전달
    router.push(`/builder?id=${id}`);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h1 className={styles.modalHeader}>빌드 복사 및 삭제</h1>
        <input
          type="password"
          placeholder="삭제시 비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.modalInput}
        />
        {/* 빌드 가져오기 버튼 */}
        <button onClick={handleFetchBuild} className={styles.fetchBuildButton}>
          빌드 가져오기
        </button>
        {/* 닫기와 삭제 버튼 */}
        <div className={styles.modalButtonGroup}>
          <button onClick={handleDelete} className={styles.deleteButton}>
            삭제
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendModal;
