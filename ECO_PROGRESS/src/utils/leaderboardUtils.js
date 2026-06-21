export function calculateEcoScore(
  total
) {
  if (total > 800) return 20;
  if (total > 600) return 40;
  if (total > 400) return 60;
  if (total > 200) return 80;

  return 100;
}

export function calculateLeaderboardScore(
  ecoScore,
  reduction
) {
  return (
    ecoScore * 0.7 +
    reduction * 0.3
  );
}