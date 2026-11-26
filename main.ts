// make.fun Mini entry: "One Emoji, One Dream Vacation"
// A tiny Node 22 program (standard library only, no network). It writes a
// single emoji standing in for the trip of a lifetime to
// <output>/entry.txt and reports its length.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The emoji: the aurora borealis, the trip people save years for and
// describe for the rest of their lives — a sky doing something no
// photograph quite believes. It makes a stranger want to book the flight:
// a sky you cannot see at home.
const EMOJI = "🌌";

// The bounty's gate: UTF-8 text, 1 to 8 characters, not blank, and a
// single emoji. Count code points, not UTF-16 units, so the emoji counts
// as one character.
function checkEmoji(text: string): number {
  const n = [...text].length;
  if (text.trim() === "" || n < 1 || n > 8 || /\s/.test(text)) {
    throw new Error(`entry must be a single emoji of 1-8 characters, got "${text}"`);
  }
  return n;
}

const chars = checkEmoji(EMOJI);

// Write the emoji. The output directory comes from $MAKEFUN_OUTPUT_DIR
// when set, otherwise /output. The file holds exactly the emoji — no
// trailing newline — so two runs always produce byte-identical files.
// A trailing newline would change the byte count, so there is none.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, EMOJI, "utf8");
console.log(`wrote entry.txt (${chars} chars)`);
