"use client";

// src/app/custom-page/page.tsx
import { useSearchParams } from 'next/navigation'; // next/navigation 사용
import CustomBuilder from '../builder/page'; // CustomBuilder 컴포넌트 경로 수정

const CustomPage: React.FC = () => {
    const searchParams = useSearchParams();
    const job_id = searchParams.get('job_id'); // job_id 값 가져오기
    const trait_ids = searchParams.get('trait_ids'); // trait_ids 값 가져오기

    return (
        <CustomBuilder
            job_id={job_id ? parseInt(job_id, 10) : undefined}
            trait_ids={trait_ids || ''}
        />
    );
};

export default CustomPage;