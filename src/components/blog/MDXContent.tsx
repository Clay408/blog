'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import { CodeBlock } from './CodeBlock';

interface MDXContentProps {
  code: string;
}

const mdxComponents = {
  pre: CodeBlock,
};

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose prose-invert max-w-none">
      <Component components={mdxComponents} />
    </div>
  );
}
