import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    image: {
      type: 'string',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.sourceFileName.replace(/\.mdx$/, '')}`,
    },
  },
}));

export default makeSource({
  contentDirPath: './src/content/blog',
  documentTypes: [Post],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          keepBackground: false,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onVisitHighlightedLine(node: any) {
            node.properties.className?.push('line--highlighted');
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onVisitHighlightedChars(node: any) {
            node.properties.className = ['char--highlighted'];
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any, // Type assertion needed due to vfile version conflict between dependencies
    ],
  },
});
