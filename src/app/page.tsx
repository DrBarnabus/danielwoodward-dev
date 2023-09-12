import { type Metadata } from 'next';
import { WelcomeHeroSection } from '~/components/welcome-hero-section';
import { WelcomePostsSection } from '~/components/welcome-posts-section';
import { WelcomeProjectsSection } from '~/components/welcome-projects-section';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
const title = '<DanielWoodward />';
const description = 'My personal website and tech blog';
const ogImage = `${baseUrl}/og`;

export const metadata: Metadata = {
  openGraph: {
    type: 'website',
    url: `${baseUrl}/posts`,
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    title,
    description,
    images: ogImage,
    card: 'summary_large_image',
  },
};

export default function Page() {
  return (
    <div className="flex h-full flex-col gap-8 px-6 pb-8 lg:flex-row lg:items-center lg:gap-16">
      <WelcomeHeroSection />

      <div className="flex flex-col space-y-8">
        <WelcomePostsSection />
        <WelcomeProjectsSection />
      </div>
    </div>
  );
}
