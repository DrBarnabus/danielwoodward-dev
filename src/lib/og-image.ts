import { readFileSync } from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';

const ACCENT_COLOUR = '#E93554';
const WIDTH = 1200;
const HEIGHT = 630;

const interBold = readFileSync('public/assets/fonts/Inter-Bold.ttf');

interface OgImageOptions {
  title?: string | undefined;
  isBlog?: boolean | undefined;
}

export async function generateOgImage({ title, isBlog = false }: OgImageOptions = {}): Promise<ArrayBuffer> {
  const heading = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 72,
        fontFamily: 'Inter Bold',
        marginBottom: title ? '2rem' : '0',
      },
      children: [
        {
          type: 'span',
          props: { style: { color: ACCENT_COLOUR }, children: '<' },
        },
        {
          type: 'span',
          props: { children: `DanielWoodward${isBlog ? ' blog' : ''}` },
        },
        {
          type: 'span',
          props: { style: { color: ACCENT_COLOUR, marginLeft: '0.5rem' }, children: '/>' },
        },
      ],
    },
  };

  const titleElement = title
    ? {
        type: 'div',
        props: {
          style: {
            fontSize: 36,
            textAlign: 'center' as const,
            fontFamily: 'Inter Bold',
            marginBottom: '1rem',
          },
          children: title.slice(0, 100),
        },
      }
    : null;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#d4d4d8',
          color: '#27272a',
        },
        children: [heading, titleElement].filter(Boolean),
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'Inter Bold',
          data: interBold,
          style: 'normal',
        },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Uint8Array(png).buffer as ArrayBuffer;
}
