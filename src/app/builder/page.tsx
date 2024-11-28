import React, { Suspense } from 'react';
import CustomBuilderWrapper from './CustomBuilderWrapper';

interface BuilderPageProps {
  searchParams: Promise<Record<string, string | string[]>>;
}

const BuilderPage = async ({ searchParams }: BuilderPageProps) => {
  const resolvedSearchParams = await searchParams;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomBuilderWrapper searchParams={resolvedSearchParams} />
    </Suspense>
  );
};

export default BuilderPage;