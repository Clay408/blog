'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import { CodeBlock } from './CodeBlock';
import { useEffect, useState } from 'react';

interface MDXContentProps {
  code: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxComponents: any = {
  pre: CodeBlock,
};

export function MDXContent({ code }: MDXContentProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Defer hook call to after mount to avoid SSR issues with Contentlayer
    // 这是一个已知的 Contentlayer + Next.js 静态导出问题
    // 参考: https://github.com/contentlayerdev/contentlayer/issues/674
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setComponent(() => useMDXComponent(code));
  }, [code]);

  if (!mounted || !Component) {
    return <div className="prose prose-invert max-w-none">Loading...</div>;
  }

  return (
    <div className="prose prose-invert max-w-none">
      <Component components={mdxComponents} />
    </div>
  );
}
