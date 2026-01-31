'use client';

import dynamic from 'next/dynamic';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';

const ParticleBackground = dynamic(
  () => import('./ParticleBackground').then(mod => mod.ParticleBackground),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-[var(--background)]" />
    ),
  }
);

export function Canvas() {
  return (
    <ErrorBoundary
      fallback={<div className="fixed inset-0 -z-10 bg-[var(--background)]" />}
    >
      <ParticleBackground />
    </ErrorBoundary>
  );
}
