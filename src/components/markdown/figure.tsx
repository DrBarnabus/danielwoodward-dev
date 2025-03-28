import { cx } from 'class-variance-authority';
import Image from 'next/image';

type ImageAltProps = {
  width: number;
  height: number;
  alt?: string;
  caption?: string;
  unoptimized?: boolean;
};

type Props = {
  src?: string;
  alt?: string;
};

const parseAltProps = (alt: string): ImageAltProps => {
  const parsedAlt = JSON.parse(alt);
  if ('width' in parsedAlt && 'height' in parsedAlt) {
    return {
      width: parsedAlt.width,
      height: parsedAlt.height,
      alt: parsedAlt.alt,
      caption: parsedAlt.caption,
      unoptimized: parsedAlt.unoptimized,
    };
  }

  throw new Error('Invalid Image: unable to parse props from alt');
};

export const Figure = ({ src, alt: altFromMdx }: Props) => {
  if (!src || !altFromMdx) {
    throw new Error('Invalid Image: either src or alt was undefined');
  }

  const { width, height, alt, caption, unoptimized } = parseAltProps(altFromMdx);

  return (
    <figure className="mx-auto my-5 flex h-fit w-fit flex-col rounded">
      <Image
        src={src}
        alt={alt ?? ''}
        width={width}
        height={height}
        className={cx('rounded', caption ? 'rounded-b-none' : '')}
        unoptimized={unoptimized}
      />

      {caption && (
        <figcaption className="!m-0 text-balance rounded-b bg-zinc-300/50 px-6 py-1 text-center text-zinc-700 dark:bg-zinc-100/5 dark:text-zinc-50">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
