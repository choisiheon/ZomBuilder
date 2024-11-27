"use client";

import React from 'react';
import CustomBuilder from '../../components/CustomBuilder';

interface CustomBuilderWrapperProps {
  searchParams: Record<string, string | string[]>;
}

const CustomBuilderWrapper: React.FC<CustomBuilderWrapperProps> = ({ searchParams }) => {
  const idParam = searchParams['id'];
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  return <CustomBuilder id={id || ''} />;
};

export default CustomBuilderWrapper;