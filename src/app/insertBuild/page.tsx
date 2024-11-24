"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const CommentPage: React.FC = () => {
    const searchParams = useSearchParams();
    const job_id = searchParams.get("job_id"); // URL에서 job_id 가져오기
    const trait_ids = searchParams.get("trait_ids"); // URL에서 trait_ids 가져오기

    const [comment, setComment] = useState<string>(""); // 코멘트 입력 상태
    const [password, setPassword] = useState<string>(""); // 패스워드 입력 상태
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // 성공 메시지 상태

    const jobId = job_id ? parseInt(job_id, 10) : null; // 직업 ID
    const traits = trait_ids ? trait_ids.split(",").map((id) => parseInt(id, 10)) : []; // 특성 ID 배열

    // POST 요청 함수
    const postToServer = async () => {
        if (!jobId || traits.length === 0 || !comment || !password) {
            setErrorMessage("모든 필드를 입력해주세요.");
            return;
        }

        try {
            const response = await fetch("https://server.zombuilder.com/post/cPosts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    job_id: jobId, // 전달받은 직업 ID
                    trait_id: traits.join(","), // 전달받은 특성 ID (콤마 구분)
                    comment, // 코멘트
                    password, // 패스워드
                }),
            });

            if (response.ok) {
                setSuccessMessage("데이터가 성공적으로 제출되었습니다!");
                setComment("");
                setPassword("");
            } else {
                const errorData = await response.json();
                setErrorMessage(`오류 발생: ${errorData.message}`);
            }
        } catch (error) {
            setErrorMessage("서버와의 통신 중 문제가 발생했습니다.");
        }
    };

    // 제출 핸들러
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postToServer();
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <h1>코멘트와 패스워드 입력</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {/* 읽어온 직업 ID와 특성 ID */}
                <div>
                    <p><strong>직업 ID:</strong> {jobId || "없음"}</p>
                    <p><strong>특성 ID:</strong> {traits.length > 0 ? traits.join(", ") : "없음"}</p>
                </div>

                {/* 코멘트 입력 */}
                <textarea
                    placeholder="코멘트를 입력하세요"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        resize: "none",
                    }}
                    rows={5}
                ></textarea>

                {/* 패스워드 입력 */}
                <input
                    type="password"
                    placeholder="패스워드를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />

                {/* 에러 메시지 */}
                {errorMessage && (
                    <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>
                )}

                {/* 성공 메시지 */}
                {successMessage && (
                    <p style={{ color: "green", fontSize: "14px" }}>{successMessage}</p>
                )}

                {/* 제출 버튼 */}
                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        backgroundColor: "#0070f3",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    제출
                </button>
            </form>
        </div>
    );
};

export default CommentPage;