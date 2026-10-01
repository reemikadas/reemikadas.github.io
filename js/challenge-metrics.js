export function formatChallengeCount(value, language) {
  const count = Math.max(0, Math.floor(Number(value) || 0));
  const label = String(language ?? "Challenge").trim();
  if (count < 5) return `${count} ${label} ${count === 1 ? "challenge" : "challenges"} solved`;
  return `${Math.floor(count / 5) * 5}+ ${label} challenges solved`;
}

export function parseChallengeCounts(markdown = "") {
  const counts = {};
  const lines = String(markdown).split(/\r?\n/);
  for (const language of ["SQL", "Python"]) {
    const row = lines.find((line) => new RegExp(`^\\|\\s*${language}\\s*\\|`, "i").test(line));
    if (!row) continue;
    const numericCells = row.split("|").map((cell) => cell.trim()).filter((cell) => /^\d+$/.test(cell));
    const total = numericCells[numericCells.length - 1];
    if (total !== undefined) counts[language.toLowerCase()] = Number(total);
  }
  return counts;
}
