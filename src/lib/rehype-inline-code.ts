import type { Root } from 'hast';
import { createHighlighter, type HighlighterGeneric } from 'shiki';
import { visit } from 'unist-util-visit';

const langPattern = /\{:(\w+)\}$/;
const tokenPattern = /\{:\.(\w+)\}$/;

function getTextContent(node: { children: Array<{ value?: string; children?: any[] }> }): string {
  return node.children
    .map((child) => {
      if (child.value) return child.value;
      if (child.children) return getTextContent(child as typeof node);
      return '';
    })
    .join('');
}

let highlighter: HighlighterGeneric<string, string> | undefined;

export function rehypeInlineCode() {
  return async (tree: Root) => {
    const nodes: Array<{
      node: any;
      text: string;
      lang: string;
    }> = [];

    visit(tree, 'element', (node: any, _index, parent: any) => {
      if (node.tagName !== 'code' || parent?.tagName === 'pre') return;

      const text = getTextContent(node);

      const tokenMatch = text.match(tokenPattern);
      if (tokenMatch) {
        node.children = [{ type: 'text', value: text.replace(tokenPattern, '') }];
        return;
      }

      const langMatch = text.match(langPattern);
      if (langMatch) {
        nodes.push({
          node,
          text: text.replace(langPattern, ''),
          lang: langMatch[1],
        });
      }
    });

    if (nodes.length === 0) return;

    const langs = [...new Set(nodes.map((n) => n.lang))];

    if (!highlighter) {
      highlighter = await createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs,
      });
    } else {
      await highlighter.loadLanguage(...(langs as any[]));
    }

    for (const { node, text, lang } of nodes) {
      const hast = highlighter.codeToHast(text, {
        lang,
        themes: { light: 'github-light', dark: 'github-dark' },
      });

      const pre = hast.children[0] as any;
      const code = pre?.children?.[0];
      const line = code?.children?.[0];

      if (line?.children) {
        node.children = line.children;
        node.properties = {
          ...node.properties,
          'data-language': lang,
          style: pre.properties?.style,
        };
      }
    }
  };
}
