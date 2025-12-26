import fullContent from '../content/annual/2025/2025annual.md?raw';

export type AnnualArticle = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  content: string;
};

const parseMarkdownSections = (raw: string): AnnualArticle[] => {
  // Split by H1 headers (# Title)
  const sections = raw.split(/^# /gm).slice(1);
  let globalId = 1;

  return sections.flatMap((section) => {
    const lines = section.split('\n');
    const sectionTitle = lines[0].trim(); // e.g., "Jan", "2025"
    const sectionBody = lines.slice(1).join('\n');

    // Month mapping
    const monthMap: Record<string, string> = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
      'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    let dateStr = `2025-01-01`;
    const matchedMonth = Object.keys(monthMap).find(m => sectionTitle.startsWith(m));
    if (matchedMonth) {
      dateStr = `2025-${monthMap[matchedMonth]}-01`;
    }

    // Split by H3 (###) to find events
    // We use a regex with capture group to keep the delimiter? No, split by ^### 
    // But we need the title.
    // Let's use split but keep the header line? 
    // Easier: split by `^### ` and process.
    // NOTE: The first chunk (index 0) is text *before* the first ###.

    // Using positive lookahead or just standard split and assuming strict structure?
    // Regex: split by start of line ###
    const parts = sectionBody.split(/^### /gm);

    const articles: AnnualArticle[] = [];

    // parts[0] is the "Intro" or content before the first H3
    const introContent = parts[0].trim();
    if (introContent) {
      // If there is meaningful content (text or image) before the first subtitle, create a card
      // Use sectionTitle (e.g. "Jan") as title.
      // Use first paragraph as excerpt? or user standard logic.

      // Clean up markdown for excerpt
      const rawText = introContent.replace(/!\[.*?\]\(.*?\)/g, '').replace(/<[^>]*>/g, '').replace(/[*#]/g, '').trim();
      const excerpt = rawText.slice(0, 50) + (rawText.length > 50 ? '...' : '') || sectionTitle;

      articles.push({
        id: globalId++,
        date: dateStr,
        title: sectionTitle,
        excerpt: rawText || sectionTitle, // Use full text if short, or handled by UI
        content: introContent
      });
    }

    // parts[1..n] are the specific events.
    // BUT: split removes the delimiter "### ".
    // So parts[1] starts with "Title\nBody..."

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const partLines = part.split('\n');
      const h3Title = partLines[0].trim(); // The text after ###
      const body = partLines.slice(1).join('\n').trim();

      // The body contains images, captions, and text.
      // User wants: "Small titles (h3) ... outside".
      // "Rest ... inside".

      // Clean excerpt from H3 title? No, H3 IS the title/excerpt.
      // We set article.title = H3 Title.
      // article.excerpt = empty? Or maybe the H3 title again?
      // Let's set excerpt = "" so it doesn't duplicate visually if UI shows both.
      // Actually, if we set excerpt to empty, the UI might look sparse.
      // Let's look at the "Intro" card logic: title=Month, excerpt=Text.
      // Here: title=H3. excerpt=???
      // Maybe excerpt should be empty string.

      articles.push({
        id: globalId++,
        date: dateStr,
        title: h3Title,
        excerpt: '', // H3 Title is already visible as the main title, avoiding duplication.
        content: body
      });
    }

    return articles;
  });
};

export const annual2025: AnnualArticle[] = parseMarkdownSections(fullContent);
