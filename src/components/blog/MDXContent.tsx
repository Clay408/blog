'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import { CodeBlock } from './CodeBlock';
import { Suspense, useEffect, useState } from 'react';

interface MDXContentProps {
  code: string;
}

const mdxComponents = {
  pre: CodeBlock,
};

export function MDXContent({ code }: MDXContentProps) {
  const [Component, setComponent] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setComponent(() => useMDXComponent(code));
  }, [code]);

  if (!mounted || !Component) {
    return <div className="prose prose-invert max-w-none">Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="prose prose-invert max-w-none">
        <Component components={mdxComponents} />
      </div>
    </Suspense>
  );
}
