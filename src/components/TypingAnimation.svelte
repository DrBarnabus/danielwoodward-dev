<script lang="ts">
  import { onMount } from 'svelte';

  const statements = [
    'am a Software Developer',
    'code in C#',
    'develop full stack solutions',
    'blog about dotnet development',
    'build things for the web',
    'build web applications with Angular',
    'code in TypeScript',
    'build web applications with Next.js',
    'develop open source software',
    'blog about Next.js development',
    'code in C++',
  ];

  const TYPING_DELAY = 80;
  const BACKSPACE_DELAY = 60;
  const PAUSE_DELAY = 1500;

  let displayText = $state('');
  let cancelled = false;

  function sleep(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  async function typeText(text: string) {
    for (let i = 0; i < text.length; i++) {
      if (cancelled) return;
      displayText += text[i];
      await sleep(TYPING_DELAY);
    }
  }

  async function backspace(count: number) {
    for (let i = 0; i < count; i++) {
      if (cancelled) return;
      displayText = displayText.slice(0, -1);
      await sleep(BACKSPACE_DELAY);
    }
  }

  async function animate() {
    while (!cancelled) {
      for (const statement of statements) {
        const fullText = `${statement}.`;
        await typeText(fullText);
        await sleep(PAUSE_DELAY);
        await backspace(fullText.length);
      }
    }
  }

  onMount(() => {
    animate();
    return () => {
      cancelled = true;
    };
  });
</script>

<span>{displayText}</span><span class="cursor">|</span>

<style>
  .cursor {
    animation: blink 1.06s step-start infinite;
  }

  @keyframes blink {
    50% {
      visibility: hidden;
    }
  }
</style>
