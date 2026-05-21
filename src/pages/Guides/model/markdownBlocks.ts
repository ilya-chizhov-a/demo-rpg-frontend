export type BlogMarkdownBlock =
  | {
      readonly kind: 'heading';
      readonly level: 2 | 3;
      readonly text: string;
    }
  | {
      readonly kind: 'list';
      readonly items: readonly string[];
    }
  | {
      readonly kind: 'paragraph';
      readonly text: string;
    };

export function parseTrustedMarkdown(value: string): readonly BlogMarkdownBlock[] {
  const blocks: BlogMarkdownBlock[] = [];
  const lines = value.replaceAll('\r\n', '\n').split('\n');
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = (): void => {
    if (paragraph.length === 0) return;
    blocks.push({ kind: 'paragraph', text: paragraph.join(' ') });
    paragraph = [];
  };

  const flushList = (): void => {
    if (listItems.length === 0) return;
    blocks.push({ items: listItems, kind: 'list' });
    listItems = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = parseHeading(line);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push(heading);
      continue;
    }

    const listItem = parseListItem(line);
    if (listItem) {
      flushParagraph();
      listItems.push(listItem);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

function parseHeading(line: string): BlogMarkdownBlock | null {
  if (line.startsWith('### ')) {
    return { kind: 'heading', level: 3, text: line.slice(4).trim() };
  }
  if (line.startsWith('## ')) {
    return { kind: 'heading', level: 2, text: line.slice(3).trim() };
  }
  return null;
}

function parseListItem(line: string): string | null {
  if (line.startsWith('- ')) return line.slice(2).trim();
  if (line.startsWith('* ')) return line.slice(2).trim();
  return null;
}
