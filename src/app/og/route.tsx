import { ImageResponse } from '@vercel/og';
import { type NextRequest } from 'next/server';

const accentColour = '#E93554';

export const runtime = 'edge';

const fontBold = fetch(new URL('../../../public/assets/fonts/Inter-Bold.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer()
);

export async function GET(req: NextRequest) {
  const fontBoldData = await fontBold;

  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle && searchParams.get('title')?.slice(0, 100);
    const isBlog = searchParams.has('blog');

    return new ImageResponse(
      (
        <div tw="w-full h-full flex flex-col items-center justify-center bg-zinc-300 text-zinc-800">
          <div
            tw="flex flex-row items-center text-6xl mb-8"
            style={{ marginBottom: hasTitle ? '2rem' : '0rem', fontFamily: 'Inter Bold' }}
          >
            <div tw="flex w-full items-center justify-center font-semibold">
              <div style={{ color: accentColour }}>{'<'}</div>
              <span>DanielWoodward {isBlog ? ' blog' : ''}</span>
              <div style={{ color: accentColour }} tw="ml-2">
                {'/>'}
              </div>
            </div>
          </div>

          <div tw="text-3xl text-center mb-4" style={{ fontFamily: 'Inter Bold' }}>
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter Bold',
            data: fontBoldData,
            style: 'normal',
          },
        ],
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(`OG Error: ${e.message}`);
    return new Response('Failed to generate OpenGraph Image', {
      status: 500,
    });
  }
}
