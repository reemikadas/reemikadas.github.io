export function formatChallengeCount(value, language) {
  const count = Math.max(0, Math.floor(Number(value) || 0));
  const label = String(language ?? "Challenge").trim();
  if (count < 5) return `${count} ${label} ${count === 1 ? "challenge" : "challenges"} solved`;
  return `${Math.floor(count / 5) * 5}+ ${label} challenges solved`;
}

export function parseChallengeCounts(markdown = "") {
  const counts = {};
  for (const language of ["SQL", "Python"]) {
    const row = String(markdown).match(new RegExp(`^\\|\\s*${language}\\s*\\|\\s*\\d+\\s*\\|\\s*\\d+\\s*\\|\\s*(\\d+)\\s*\\|`, "im"));
    if (row) counts[language.toLowerCase()] = Number(row[1]);
  }
  return counts;
}
