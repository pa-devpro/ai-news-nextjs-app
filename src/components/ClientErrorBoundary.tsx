'use client';

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = () => {
  return <div>Something went wrong.</div>;
};

const ClientErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default ClientErrorBoundary;
