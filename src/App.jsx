import { useMemo, useState } from 'react';

const filters = ['All', 'News', 'Images', 'Videos', 'Maps', 'Shopping'];

const trendingTopics = [
  'AI search trends',
  'Sustainable design',
  'Cybersecurity tools',
  'Space tourism',
  'Frontend architecture',
  'Smart home devices',
  'Next-gen startups'
];

const querySeed = {
  ai: {
    title: 'How AI search works in modern search engines',
    answer:
      'AI search blends semantic understanding, ranking models, and retrieval systems to interpret intent, score relevance, and summarize the best sources. The result is a faster, more context-aware answer that feels conversational while still grounded in real web data.',
    bullets: [
      { label: 'Intent', value: 'Understands user meaning beyond keywords' },
      { label: 'Retrieval', value: 'Finds the most relevant sources across the web' },
      { label: 'Ranking', value: 'Orders results by trust, freshness, and usefulness' }
    ]
  },
  design: {
    title: 'What makes a premium dark mode interface feel modern?',
    answer:
      'A premium dark interface combines contrast, subtle gradients, careful spacing, and layered depth. It should guide attention with clear hierarchy, keep text readable, and use accent lighting to highlight actions without overwhelming the user.',
    bullets: [
      { label: 'Contrast', value: 'High readability with balanced low-light surfaces' },
      { label: 'Depth', value: 'Layered shadows and gradients for focus and flow' },
      { label: 'Motion', value: 'Smooth transitions that feel responsive and polished' }
    ]
  },
  default: {
    title: 'The most relevant answer for your search',
    answer:
      'Nexus combines a strong ranking system with AI summarization to help users get concise, relevant answers quickly. Instead of dumping raw links, it surfaces the key facts, key sources, and the best next step in a clean, modern dashboard.',
    bullets: [
      { label: 'Search', value: 'Fast relevance matching across indexed sources' },
      { label: 'AI', value: 'Context-rich summaries and answer synthesis' },
      { label: 'UX', value: 'Premium visual design that keeps users focused' }
    ]
  }
};

const resultTemplates = [
  {
    title: 'Designing conversational AI search experiences that feel natural',
    url: 'www.nexus.ai/insights/conversational-search',
    snippet:
      'Learn how retrieval, summarization, and ranking systems work together to create helpful AI answers rather than generic search results.',
    type: 'Research'
  },
  {
    title: 'The future of dark-mode interfaces and product storytelling',
    url: 'www.designjournal.com/ux/dark-mode-is-not-just-a-theme',
    snippet:
      'Dark interfaces remain highly effective when they preserve hierarchy, readability, and emotional clarity through careful color design.',
    type: 'Article'
  },
  {
    title: 'Top AI tools for productivity and knowledge discovery in 2026',
    url: 'www.productivitylabs.io/ai-tools',
    snippet:
      'A curated view of the most effective AI experiences for research, ideation, summarization, and action planning in everyday workflows.',
    type: 'Guide'
  },
  {
    title: 'How search engines use ranking signals to improve trust and quality',
    url: 'www.searchsystems.org/quality-ranking',
    snippet:
      'Understanding relevance, freshness, authority, and click behavior helps build systems that return more useful results to users.',
    type: 'Reference'
  },
  {
    title: 'Building premium product experiences with motion and contrast',
    url: 'www.interaction.design/ux/premium-ui',
    snippet:
      'The best interfaces feel effortless because every visual decision supports clarity, trust, and a strong sense of flow.',
    type: 'Case study'
  }
];

function generateAIAnswer(query) {
  const normalized = query.toLowerCase();

  if (normalized.includes('ai') || normalized.includes('search')) {
    return querySeed.ai;
  }

  if (normalized.includes('design') || normalized.includes('ui') || normalized.includes('dark')) {
    return querySeed.design;
  }

  return querySeed.default;
}

function buildResults(query) {
  const keywords = query.trim().toLowerCase();

  if (!keywords) {
    return resultTemplates;
  }

  return resultTemplates.map((result, index) => ({
    ...result,
    title: result.title.includes('AI') || keywords.includes('ai') ? result.title : result.title,
    snippet:
      index % 2 === 0
        ? `Results for "${query}" are ranked using relevance, trust, and freshness signals to deliver a cleaner, more helpful answer in context.`
        : result.snippet,
    type: index % 2 === 0 ? 'Featured' : result.type
  }));
}

export default function App() {
  const [query, setQuery] = useState('AI search experience');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isAiMode, setIsAiMode] = useState(true);

  const aiOverview = useMemo(() => generateAIAnswer(query), [query]);
  const results = useMemo(() => buildResults(query), [query]);

  function handleSearch() {
    if (!query.trim()) {
      setQuery('AI search experience');
    }
  }

  function handleSuggestion(value) {
    setQuery(value);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark" aria-label="Nexus logo">
            <svg width="26" height="26" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="120" rx="30" fill="url(#paint0_linear_1_2)" />
              <path d="M32 86V34H42L60 64L78 34H88V86H78V53.5L62.4 80H57.6L42 53.5V86H32Z" fill="white" />
              <circle cx="88" cy="33" r="10" fill="#6EE7FF" fillOpacity="0.9" />
              <defs>
                <linearGradient id="paint0_linear_1_2" x1="10" y1="8" x2="100" y2="112" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6EE7FF" />
                  <stop offset="0.5" stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="brand-copy">
            <span className="brand-name">Nexus</span>
            <span className="brand-badge">AI</span>
          </div>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#discover">Discover</a>
          <a href="#news">News</a>
          <a href="#images">Images</a>
          <a href="#maps">Maps</a>
        </nav>

        <div className="top-actions">
          <button className="secondary-mini">Workspace</button>
          <button className="primary-mini">Sign in</button>
        </div>
      </header>

      <main className="search-page">
        <div className="search-board">
          <div className="search-line">
            <div className="search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search"
              placeholder="Search anything..."
            />

            <button className="magic-toggle" onClick={() => setIsAiMode((value) => !value)}>
              <span className="sparkle">✨</span>
              {isAiMode ? 'AI mode' : 'Classic'}
            </button>

            <button className="search-button" onClick={handleSearch}>Search</button>
          </div>

          <div className="filter-row" aria-label="Search filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={filter === activeFilter ? 'chip active' : 'chip'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="suggestions-row">
            {trendingTopics.map((topic) => (
              <button key={topic} onClick={() => handleSuggestion(topic)} className="trend-pill">
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="results-layout">
          <section className="results-column">
            <div className="ai-overview card-surface">
              <div className="section-kicker">AI Overview</div>
              <h2>{aiOverview.title}</h2>
              <p>{aiOverview.answer}</p>

              <div className="fact-grid">
                {aiOverview.bullets.map((item) => (
                  <div key={item.label} className="fact-box">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="results-header">
              <span>Top results</span>
              <span className="meta-status">Updated just now</span>
            </div>

            <div className="result-list">
              {results.map((result, index) => (
                <article className="result-item card-surface" key={`${result.url}-${index}`}>
                  <div className="result-url-row">
                    <span className="result-type">{result.type}</span>
                    <span className="result-domain">{result.url}</span>
                  </div>
                  <h3>{result.title}</h3>
                  <p>{result.snippet}</p>
                  <div className="result-meta">
                    <span>Relevance {92 - index}%</span>
                    <span>Trust score {97 - index}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="sidebar-column">
            <div className="mini-panel card-surface">
              <div className="section-kicker">Insights</div>
              <h3>Search pulse</h3>

              <div className="stat-stack">
                <div>
                  <span>Intent match</span>
                  <strong>96%</strong>
                </div>
                <div>
                  <span>Source quality</span>
                  <strong>89%</strong>
                </div>
                <div>
                  <span>Freshness</span>
                  <strong>94%</strong>
                </div>
              </div>
            </div>

            <div className="mini-panel card-surface">
              <div className="section-kicker">People also ask</div>
              <ul className="faq-list">
                <li>What makes AI search more accurate than keyword search?</li>
                <li>How do ranking models decide what appears first?</li>
                <li>Can AI search present concise answers without losing context?</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
