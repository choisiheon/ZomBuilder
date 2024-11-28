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

  useEffect(() => {
    setIsClient(true); // 클라이언트 환경 확인
  }, []);

  if (!isOpen || !isClient) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose} className={styles.closeButton}>
          닫기
        </button>
      </div>
    </div>,
    document.body // 클라이언트에서만 document.body에 렌더링
  );
};

export default Modal;