import type { Element, ElementContent, Root } from 'hast';
import { toString } from 'hast-util-to-string';
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki';
import { createHighlighter } from 'shiki';
import { visit } from 'unist-util-visit';

const langPattern = /\{:(\w+)\}$/;
const tokenPattern = /\{:\.(\w+)\}$/;

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | undefined;

export function rehypeInlineCode() {
  return async (tree: Root) => {
    const nodes: Array<{
      node: Element;
      text: string;
      lang: BundledLanguage;
    }> = [];

    visit(tree, 'element', (node: Element, _index, parent) => {
      if (node.tagName !== 'code' || (parent as Element)?.tagName === 'pre') return;

      const text = toString(node);

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
          lang: langMatch[1] as BundledLanguage,
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
      await highlighter.loadLanguage(...langs);
    }

    for (const { node, text, lang } of nodes) {
      const hast = highlighter.codeToHast(text, {
        lang,
        themes: { light: 'github-light', dark: 'github-dark' },
      });

      const pre = hast.children[0] as Element | undefined;
      const code = pre?.children?.[0] as Element | undefined;
      const line = code?.children?.[0] as Element | undefined;

      if (line?.children) {
        node.children = line.children as ElementContent[];
        node.properties = {
          ...node.properties,
          'data-language': lang,
          style: pre?.properties?.style,
        };
      }
    }
  };
}
