import { useMDXComponent } from 'next-contentlayer/hooks';
import { MdxStyles } from './mdx-styles';
import { MdxComponents } from './mdx-components';

type Props = {
  code: string;
};

export function MdxContent({ code }: Props) {
  const Component = useMDXComponent(code);

  return (
    <MdxStyles>
      <Component components={MdxComponents} />
    </MdxStyles>
  );
}
