export function WelcomeProjectsSection() {
  return (
    <section className="flex flex-col space-y-2 text-zinc-900 dark:text-zinc-50">
      <h2 className="inline-flex items-center justify-between border-b text-xl font-semibold dark:border-zinc-700 sm:text-2xl">
        Projects{' '}
        <a
          href="https://github.com/DrBarnabus"
          target="_blank"
          rel="noopener"
          className="cursor-pointer text-base text-accent no-underline hover:text-accent/80 hover:underline"
        >
          GitHub
        </a>
      </h2>

      <a
        href="https://github.com/DrBarnabus/Mimic"
        target="_blank"
        rel="noopener"
        className="text-base font-semibold text-accent no-underline hover:text-accent/80 hover:underline"
      >
        Mimic
      </a>
      <a
        href="https://github.com/DrBarnabus/DacTools"
        target="_blank"
        rel="noopener"
        className="text-base font-semibold text-accent no-underline hover:text-accent/80 hover:underline"
      >
        DacTools
      </a>
      <a
        href="https://github.com/DrBarnabus/pullrequest-automation"
        target="_blank"
        rel="noopener"
        className="text-base font-semibold text-accent no-underline hover:text-accent/80 hover:underline"
      >
        GitHub Actions: Pull request automation
      </a>
    </section>
  );
}
