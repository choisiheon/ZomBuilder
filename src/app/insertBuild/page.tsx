"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const CommentPage: React.FC = () => {
    const searchParams = useSearchParams(); // 쿼리 파라미터 가져오기
    const router = useRouter(); // 리다이렉트에 사용
    const jobId = searchParams.get("job_id");
    const traitIds = searchParams.get("trait_ids");

    const [comment, setComment] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (!jobId || !traitIds) {
            alert("URL에 필요한 데이터가 없습니다.");
            router.push("/"); // 데이터가 없으면 홈으로 리다이렉트
        }
    }, [jobId, traitIds, router]);

    const handlePost = async () => {
        if (!jobId || !traitIds || !comment || !password) {
            alert("모든 필드를 입력해주세요!");
            return;
        }

        try {
            const response = await fetch("https://server.zombuilder.com/post/cPosts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    job_id: Number(jobId), // job_id를 숫자로 변환
                    trait_id: traitIds, // trait_ids 그대로 전달
                    comment,
                    password,
                }),
            });

            if (response.ok) {
                alert("성공적으로 제출되었습니다!");
                router.push("/"); // 성공 후 홈으로 이동
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
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
            <h1>코멘트 입력</h1>
            <p><strong>직업 ID:</strong> {jobId || "알 수 없음"}</p>
            <p><strong>특성 IDs:</strong> {traitIds || "알 수 없음"}</p>
            <textarea
                placeholder="코멘트를 입력하세요"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
            <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
            <button
                onClick={handlePost}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                제출
            </button>
        </div>
    );
};

export default CommentPage;