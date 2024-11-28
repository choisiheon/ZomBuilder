// src/app/custom-page/page.tsx
import React, { Suspense } from 'react';
import CustomBuilderWrapper from './CustomBuilderWrapper';

export default async function CustomPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomBuilderWrapper searchParams={resolvedSearchParams} />
    </Suspense>
  );
}