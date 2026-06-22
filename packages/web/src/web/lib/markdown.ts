import { marked } from "marked";

// Custom renderer for callout boxes
const renderer = new marked.Renderer();

// Override paragraph to detect callout patterns
renderer.paragraph = ({ tokens }) => {
  const text = tokens.map((t: any) => t.raw || '').join('');
  
  // Detect callout patterns: > 🐇 **Bunny Tip** or > ⚠️ **Watch Out!**
  if (text.startsWith('> 🐇') || text.includes('**Bunny Tip**')) {
    const inner = text.replace(/^>\s*/gm, '').trim();
    return `<div class="callout callout-bunny"><strong>🐇 Bunny Tip</strong>${marked.parse(inner.replace(/\*\*Bunny Tip\*\*\n?/, ''))}</div>`;
  }
  if (text.startsWith('> ⚠️') || text.includes('**Watch Out!**')) {
    const inner = text.replace(/^>\s*/gm, '').trim();
    return `<div class="callout callout-warning"><strong>⚠️ Watch Out!</strong>${marked.parse(inner.replace(/\*\*Watch Out!\*\*\n?/, ''))}</div>`;
  }
  if (text.startsWith('> 📌') || text.includes('**Remember This**')) {
    const inner = text.replace(/^>\s*/gm, '').trim();
    return `<div class="callout callout-remember"><strong>📌 Remember This</strong>${marked.parse(inner.replace(/\*\*Remember This\*\*\n?/, ''))}</div>`;
  }
  if (text.startsWith('> 🔨') || text.includes('**Try It Yourself**')) {
    const inner = text.replace(/^>\s*/gm, '').trim();
    return `<div class="callout callout-try"><strong>🔨 Try It Yourself</strong>${marked.parse(inner.replace(/\*\*Try It Yourself\*\*\n?/, ''))}</div>`;
  }

  const html = tokens.map((t: any) => {
    if (t.type === 'text') return t.text;
    if (t.type === 'strong') return `<strong>${t.text}</strong>`;
    if (t.type === 'em') return `<em>${t.text}</em>`;
    if (t.type === 'codespan') return `<code>${t.text}</code>`;
    if (t.type === 'link') {
      const isExternal = t.href.startsWith('http://') || t.href.startsWith('https://');
      if (isExternal) {
        return `<a href="${t.href}" target="_blank" rel="noopener noreferrer">${t.text}</a>`;
      }
      return `<a href="${t.href}">${t.text}</a>`;
    }
    return t.raw || '';
  }).join('');
  return `<p>${html}</p>\n`;
};

// Override blockquote for callouts
renderer.blockquote = ({ tokens }) => {
  // Get the raw text
  const rawText = tokens.map((t: any) => {
    if (t.type === 'paragraph') {
      return t.tokens?.map((tt: any) => tt.raw || '').join('') || t.raw || '';
    }
    return t.raw || '';
  }).join('\n');

  if (rawText.includes('🐇') || rawText.includes('Bunny Tip')) {
    const clean = rawText.replace(/🐇\s*\*?\*?Bunny Tip\*?\*?\n?/, '').trim();
    return `<div class="callout callout-bunny"><strong>🐇 Bunny Tip</strong><p>${clean}</p></div>`;
  }
  if (rawText.includes('⚠️') || rawText.includes('Watch Out')) {
    const clean = rawText.replace(/⚠️\s*\*?\*?Watch Out!?\*?\*?\n?/, '').trim();
    return `<div class="callout callout-warning"><strong>⚠️ Watch Out!</strong><p>${clean}</p></div>`;
  }
  if (rawText.includes('📌') || rawText.includes('Remember This')) {
    const clean = rawText.replace(/📌\s*\*?\*?Remember This\*?\*?\n?/, '').trim();
    return `<div class="callout callout-remember"><strong>📌 Remember This</strong><p>${clean}</p></div>`;
  }
  if (rawText.includes('🔨') || rawText.includes('Try It Yourself')) {
    const clean = rawText.replace(/🔨\s*\*?\*?Try It Yourself\*?\*?\n?/, '').trim();
    return `<div class="callout callout-try"><strong>🔨 Try It Yourself</strong><p>${clean}</p></div>`;
  }

  // Default blockquote
  const body = tokens.map((t: any) => marked.parse(t.raw || '')).join('');
  return `<blockquote>${body}</blockquote>`;
};

marked.use({ renderer });

export function renderMarkdown(content: string): string {
  return marked.parse(content) as string;
}
