'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  Copy,
  Check,
  Sun,
  Moon,
  FolderKanban,
  BookOpen,
  Compass,
  CornerDownLeft,
  X,
} from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { blogPosts } from '@/data/blogPosts';
import { getEmailAddress } from '@/utils/obfuscate';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './CommandPalette.module.css';

type CommandGroup = 'Quick Actions' | 'Case Studies' | 'Insights & Writing' | 'Jump to Section';

interface CommandItem {
  id: string;
  group: CommandGroup;
  title: string;
  subtitle?: string;
  badge?: string;
  keywords: string;
  icon: React.ReactNode;
  run: () => void;
}

interface PendingHomeEvent {
  eventName: string;
  detail?: Record<string, unknown>;
  scrollTarget?: string;
}

function fuzzyScore(query: string, text: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  const hay = text.toLowerCase();

  // Direct substring match gets highest priority
  const directIdx = hay.indexOf(q);
  if (directIdx !== -1) {
    return 100 - Math.min(directIdx, 50) + (directIdx === 0 ? 25 : 0);
  }

  // Multi-word token matching
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length > 1 && tokens.every((t) => hay.includes(t))) {
    return 75;
  }

  // Subsequence fuzzy match
  let qi = 0;
  let consecutive = 0;
  let score = 0;
  for (let hi = 0; hi < hay.length && qi < q.length; hi++) {
    if (hay[hi] === q[qi]) {
      qi++;
      consecutive++;
      score += 4 + consecutive * 2;
    } else {
      consecutive = 0;
    }
  }
  return qi === q.length ? score : 0;
}

const SECTION_ITEMS = [
  { id: 'sec-services', title: 'Core Competencies', subtitle: 'Supply chain, BI & IT PM pillars', hash: '#services', keywords: 'services competencies skills pillars' },
  { id: 'sec-work', title: 'Selected Work & Case Studies', subtitle: '6 interactive case studies', hash: '#work', keywords: 'projects work portfolio case studies' },
  { id: 'sec-process', title: 'How I Work', subtitle: 'Diagnose → Design → Implement pipeline', hash: '#process', keywords: 'process methodology workflow how i work' },
  { id: 'sec-skills', title: 'Skills Matrix & Radar', subtitle: 'Interactive competency proof matrix', hash: '#skills', keywords: 'skills radar matrix sap power bi sql' },
  { id: 'sec-about', title: 'About & Career Timeline', subtitle: 'IMIS background, impact metrics & experience', hash: '#about', keywords: 'about bio education timeline imis languages' },
  { id: 'sec-blog', title: 'Insights & Writing', subtitle: 'Operational essays & build notes', hash: '#blog', keywords: 'blog writing essays articles insights' },
  { id: 'sec-contact', title: 'Contact & Scheduling', subtitle: 'Book a call or send a message', hash: '#contact', keywords: 'contact email hire booking call cal' },
];

export default function CommandPalette() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const pendingEventRef = useRef<PendingHomeEvent | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 2600);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const openPalette = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  // Flush queued home-page events after navigating back from /blog routes
  useEffect(() => {
    if (pathname === '/' && pendingEventRef.current) {
      const timer = setTimeout(() => {
        const pending = pendingEventRef.current;
        if (!pending) return;
        pendingEventRef.current = null;
        if (pending.scrollTarget) {
          const el = document.querySelector(pending.scrollTarget);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
        window.dispatchEvent(
          new CustomEvent(pending.eventName, { detail: pending.detail })
        );
      }, 160);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const dispatchOrNavigateHome = useCallback(
    (eventName: string, options?: { detail?: Record<string, unknown>; hash?: string; queryParam?: string }) => {
      closePalette();
      if (pathname === '/') {
        if (options?.hash) {
          const el = document.querySelector(options.hash);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
        window.dispatchEvent(new CustomEvent(eventName, { detail: options?.detail }));
      } else {
        pendingEventRef.current = {
          eventName,
          detail: options?.detail,
          scrollTarget: options?.hash,
        };
        const targetUrl = `/${options?.queryParam ? `?${options.queryParam}` : ''}${options?.hash || ''}`;
        router.push(targetUrl);
      }
    },
    [closePalette, pathname, router]
  );

  const jumpToSection = useCallback(
    (hash: string) => {
      closePalette();
      if (pathname === '/') {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', hash);
        }
      } else {
        router.push(`/${hash}`);
      }
    },
    [closePalette, pathname, router]
  );

  const handleCopyEmail = useCallback(async () => {
    closePalette();
    const email = getEmailAddress();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        throw new Error('Clipboard API unavailable');
      }
      showToast(`Copied ${email}`);
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied ${email}`);
      } catch {
        showToast('Could not access clipboard');
      }
    }
  }, [closePalette, showToast]);

  const allItems = useMemo<CommandItem[]>(() => {
    const actions: CommandItem[] = [
      {
        id: 'action-book',
        group: 'Quick Actions',
        title: 'Book a 30-Min Call',
        subtitle: 'Open in-page Cal.eu scheduling drawer',
        badge: 'Cal.eu',
        keywords: 'book call schedule meeting calendar 30 min talk chat',
        icon: <Calendar size={16} />,
        run: () => {
          const hasInPageBooking =
            pathname === '/' ||
            pathname === '/blog' ||
            blogPosts.some((p) => `/blog/${p.slug}` === pathname);

          if (hasInPageBooking) {
            closePalette();
            window.dispatchEvent(new CustomEvent('portfolio:open-booking'));
          } else {
            dispatchOrNavigateHome('portfolio:open-booking', { hash: '#contact' });
          }
        },
      },
      {
        id: 'action-copy-email',
        group: 'Quick Actions',
        title: 'Copy Email Address',
        subtitle: 'Copy direct contact email to clipboard',
        badge: 'Copy',
        keywords: 'copy email mail contact address clipboard reach',
        icon: <Copy size={16} />,
        run: () => {
          void handleCopyEmail();
        },
      },
      {
        id: 'action-theme',
        group: 'Quick Actions',
        title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        subtitle: 'Toggle circular porcelain / obsidian theme',
        badge: theme === 'dark' ? 'Light' : 'Dark',
        keywords: 'toggle theme dark light mode appearance color',
        icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
        run: () => {
          closePalette();
          toggleTheme();
        },
      },
    ];

    const projectItems: CommandItem[] = PROJECTS.map((project) => ({
      id: `project-${project.slug}`,
      group: 'Case Studies',
      title: project.title,
      subtitle: project.category,
      badge: project.headlineMetric,
      keywords: [
        project.title,
        project.category,
        project.headlineMetric,
        ...project.domainLenses,
        project.slug,
      ].join(' '),
      icon: <FolderKanban size={16} />,
      run: () =>
        dispatchOrNavigateHome('portfolio:open-project', {
          detail: { slug: project.slug },
          hash: '#work',
          queryParam: `project=${encodeURIComponent(project.slug)}`,
        }),
    }));

    const insightItems: CommandItem[] = blogPosts.map((post) => ({
      id: `blog-${post.slug}`,
      group: 'Insights & Writing',
      title: post.title,
      subtitle: `${post.category} · ${post.date}`,
      badge: post.readTime,
      keywords: `${post.title} ${post.category} ${post.slug} blog essay article`,
      icon: <BookOpen size={16} />,
      run: () => {
        closePalette();
        router.push(`/blog/${post.slug}`);
      },
    }));

    const sectionItems: CommandItem[] = SECTION_ITEMS.map((sec) => ({
      id: sec.id,
      group: 'Jump to Section',
      title: sec.title,
      subtitle: sec.subtitle,
      badge: sec.hash,
      keywords: `${sec.title} ${sec.subtitle} ${sec.keywords}`,
      icon: <Compass size={16} />,
      run: () => jumpToSection(sec.hash),
    }));

    return [...actions, ...projectItems, ...insightItems, ...sectionItems];
  }, [
    pathname,
    theme,
    toggleTheme,
    closePalette,
    dispatchOrNavigateHome,
    handleCopyEmail,
    jumpToSection,
    router,
  ]);

  const filteredItems = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return allItems;

    return allItems
      .map((item) => ({
        item,
        score: fuzzyScore(trimmed, `${item.title} ${item.subtitle || ''} ${item.badge || ''} ${item.keywords}`),
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);
  }, [allItems, query]);

  // Group filtered items while preserving display order & flat keyboard index
  const groupedSections = useMemo(() => {
    const order: CommandGroup[] = [
      'Quick Actions',
      'Case Studies',
      'Insights & Writing',
      'Jump to Section',
    ];
    const groups: Array<{ label: CommandGroup; items: Array<{ item: CommandItem; flatIndex: number }> }> = [];
    let flatCounter = 0;

    for (const label of order) {
      const matching = filteredItems.filter((item) => item.group === label);
      if (matching.length > 0) {
        groups.push({
          label,
          items: matching.map((item) => ({ item, flatIndex: flatCounter++ })),
        });
      }
    }
    return groups;
  }, [filteredItems]);

  const flatVisibleItems = useMemo(
    () => groupedSections.flatMap((g) => g.items.map((entry) => entry.item)),
    [groupedSections]
  );

  // Clamp selectedIndex when filtered results shrink
  const safeSelectedIndex =
    flatVisibleItems.length > 0
      ? Math.min(selectedIndex, flatVisibleItems.length - 1)
      : 0;

  // Global keyboard shortcut (⌘K / Ctrl+K) and custom window trigger
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            previousFocusRef.current = document.activeElement as HTMLElement | null;
            setQuery('');
            setSelectedIndex(0);
          }
          return !prev;
        });
      }
    };

    const handleCustomOpen = () => {
      openPalette();
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('portfolio:open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('portfolio:open-command-palette', handleCustomOpen);
    };
  }, [openPalette]);

  // Focus input, lock scroll, and restore focus on close
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(focusTimer);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  // Keep active item visible during keyboard navigation
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(
      `[data-command-index="${safeSelectedIndex}"]`
    );
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, safeSelectedIndex]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
      return;
    }

    if (flatVisibleItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatVisibleItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatVisibleItems.length) % flatVisibleItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      flatVisibleItems[safeSelectedIndex]?.run();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className={styles.portalRoot} data-scroll-lock="command-palette">
            <motion.div
              className={styles.backdrop}
              onClick={closePalette}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Executive Command Palette"
              className={styles.dialog}
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Search Header */}
              <div className={styles.searchBar}>
                <Search size={17} className={styles.searchIcon} aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search case studies, insights, booking, or sections..."
                  className={styles.searchInput}
                  aria-label="Search commands, projects, and articles"
                  aria-autocomplete="list"
                  aria-controls="command-palette-listbox"
                  aria-activedescendant={
                    flatVisibleItems[safeSelectedIndex]
                      ? `cmd-opt-${flatVisibleItems[safeSelectedIndex].id}`
                      : undefined
                  }
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setSelectedIndex(0);
                      inputRef.current?.focus();
                    }}
                    className={styles.clearBtn}
                    aria-label="Clear search query"
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={closePalette}
                  className={`${styles.escHint} font-mono`}
                  aria-label="Close command palette"
                >
                  ESC
                </button>
              </div>

              {/* Results List */}
              <div
                ref={listRef}
                id="command-palette-listbox"
                role="listbox"
                className={styles.resultsList}
              >
                {groupedSections.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>No matches for &ldquo;{query}&rdquo;</p>
                    <span className="font-mono">Try &ldquo;SAP&rdquo;, &ldquo;PetBhai&rdquo;, &ldquo;BPMN&rdquo;, or &ldquo;Book&rdquo;</span>
                  </div>
                ) : (
                  groupedSections.map((group) => (
                    <div key={group.label} className={styles.group}>
                      <div className={`${styles.groupLabel} font-mono`}>{group.label}</div>
                      {group.items.map(({ item, flatIndex }) => {
                        const isActive = flatIndex === safeSelectedIndex;
                        return (
                          <button
                            key={item.id}
                            id={`cmd-opt-${item.id}`}
                            type="button"
                            role="option"
                            aria-selected={isActive}
                            data-command-index={flatIndex}
                            className={`${styles.itemRow} ${isActive ? styles.itemRowActive : ''}`}
                            onMouseEnter={() => setSelectedIndex(flatIndex)}
                            onClick={() => item.run()}
                          >
                            <span className={styles.itemIcon} aria-hidden="true">
                              {item.icon}
                            </span>
                            <span className={styles.itemCopy}>
                              <span className={styles.itemTitle}>{item.title}</span>
                              {item.subtitle && (
                                <span className={styles.itemSubtitle}>{item.subtitle}</span>
                              )}
                            </span>
                            {item.badge && (
                              <span className={`${styles.itemBadge} font-mono`}>
                                {item.badge}
                              </span>
                            )}
                            {isActive && (
                              <CornerDownLeft
                                size={14}
                                className={styles.enterIcon}
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer Keyboard Legend */}
              <div className={`${styles.footerBar} font-mono`}>
                <div className={styles.legend}>
                  <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
                  <span><kbd>↵</kbd> Open</span>
                  <span><kbd>Esc</kbd> Close</span>
                </div>
                <span className={styles.brandTag}>M•K Executive Palette</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Accessible Feedback Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            role="status"
            aria-live="polite"
            className={styles.toast}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Check size={15} className={styles.toastIcon} aria-hidden="true" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
