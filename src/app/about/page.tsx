'use client';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-[var(--card-foreground)] sm:text-5xl">
          About Me
        </h1>

        <div className="space-y-6 text-[var(--muted-foreground)]">
          <p className="text-lg">
            Hi! I&apos;m Zhe, a passionate software developer and tech enthusiast.
          </p>

          <p>
            This blog is where I share my thoughts, tutorials, and insights
            about web development, programming, and technology. I believe in
            continuous learning and sharing knowledge with the community.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-[var(--card-foreground)]">
            Tech Stack
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
              { category: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL'] },
              { category: 'Tools', skills: ['Git', 'Docker', 'VS Code'] },
              { category: 'Learning', skills: ['Three.js', 'WebGL', 'AI/ML'] },
            ].map((item) => (
              <div
                key={item.category}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <h3 className="mb-2 font-semibold text-[var(--card-foreground)]">
                  {item.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[var(--secondary)] px-3 py-1 text-sm text-[var(--secondary-foreground)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-2xl font-semibold text-[var(--card-foreground)]">
            Get In Touch
          </h2>

          <p>
            Feel free to reach out if you&apos;d like to collaborate or just have a
            chat about technology!
          </p>

          <div className="flex flex-wrap gap-4">
            {[
              { name: 'GitHub', url: 'https://github.com' },
              { name: 'Twitter', url: 'https://twitter.com' },
              { name: 'LinkedIn', url: 'https://linkedin.com' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3 font-medium text-[var(--card-foreground)] transition-colors hover:bg-[var(--secondary)]"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
