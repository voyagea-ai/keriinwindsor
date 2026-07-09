export interface FilmChapter {
  key: string;
  /** number of extracted frames in /public/film/<key>/ */
  count: number;
  index: string;
  kicker: string;
  title: string;
  copy: string;
}

/**
 * The scroll film. Each chapter is a real generated clip exported as a
 * WebP frame sequence (12fps) and scrubbed frame-by-frame on a canvas.
 * Regenerate frames with ffmpeg: fps=12, scale=1440:-2, libwebp q63.
 */
export const FILM_CHAPTERS: FilmChapter[] = [
  {
    key: "orchard",
    count: 61,
    index: "01",
    kicker: "The Orchard",
    title: "Born under the Gujarat sun.",
    copy: "Every box begins in family orchards where mangoes ripen on the tree — never in a cold-storage warehouse.",
  },
  {
    key: "fruit",
    count: 61,
    index: "02",
    kicker: "The Fruit",
    title: "Picked at the exact moment.",
    copy: "Hand-graded for aroma, blush and sweetness. If it wouldn't impress your grandmother, it doesn't make the box.",
  },
  {
    key: "cut",
    count: 61,
    index: "03",
    kicker: "The Cut",
    title: "Saffron flesh. Zero fibre.",
    copy: "Kesar and Alphonso slice like silk — the flesh that every Indian summer is measured by.",
  },
  {
    key: "pour",
    count: 61,
    index: "04",
    kicker: "The Pour",
    title: "Pulp like liquid gold.",
    copy: "Thick, fragrant, impossibly smooth — the reason aamras is an event, not a dessert.",
  },
  {
    key: "pack",
    count: 61,
    index: "05",
    kicker: "The Pack",
    title: "Nested like jewellery.",
    copy: "Twelve mangoes, cushioned and breathing, boxed to ripen perfectly on the short trip to your counter.",
  },
  {
    key: "doorstep",
    count: 61,
    index: "06",
    kicker: "The Doorstep",
    title: "From our hands to yours.",
    copy: "Delivered across Windsor and nearby areas the week your batch lands. You'll smell it before you open it.",
  },
];

export const TOTAL_FRAMES = FILM_CHAPTERS.reduce((s, c) => s + c.count, 0);

export function framePath(chapterKey: string, frameIndex: number): string {
  return `/film/${chapterKey}/${String(frameIndex + 1).padStart(3, "0")}.webp`;
}

/** Flat frame index -> { chapter, local index } */
export function locateFrame(flatIndex: number): { chapter: number; local: number } {
  let rest = flatIndex;
  for (let i = 0; i < FILM_CHAPTERS.length; i++) {
    if (rest < FILM_CHAPTERS[i].count) return { chapter: i, local: rest };
    rest -= FILM_CHAPTERS[i].count;
  }
  const last = FILM_CHAPTERS.length - 1;
  return { chapter: last, local: FILM_CHAPTERS[last].count - 1 };
}

export function flatIndex(chapter: number, local: number): number {
  let base = 0;
  for (let i = 0; i < chapter; i++) base += FILM_CHAPTERS[i].count;
  return base + local;
}
