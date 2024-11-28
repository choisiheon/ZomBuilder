import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../../../styles/Modal_Main/Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isClient, setIsClient] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false); // 체크박스 상태

  useEffect(() => {
    setIsClient(true); // 클라이언트 환경 확인
  }, []);

  if (!isOpen || !isClient) return null;

  const handleClose = () => {
    if (dontShowToday) {
      const today = new Date();
      const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
      localStorage.setItem("modalClosedUntil", tomorrow.toISOString()); // 오늘 하루 보지 않음 설정 저장
    }
    onClose(); // 모달 닫기
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* 오늘 하루 보지 않기 체크박스 */}
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="dontShowToday"
            checked={dontShowToday}
            onChange={(e) => setDontShowToday(e.target.checked)}
          />
          <label htmlFor="dontShowToday">오늘 하루 보지 않기</label>
        </div>

        {/* 공지사항 내용 */}
        {children}

        {/* 닫기 버튼 */}
        <div className={styles.modalActions}>
          <button onClick={handleClose} className={styles.closeButton}>
            닫기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;