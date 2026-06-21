import supabase from "../lib/supabase";


export async function saveLeaderboardEntry(
  data
) {
  return await supabase
    .from("leaderboard")
    .upsert(data);
}

export async function getLeaderboard() {
  return await supabase
    .from("leaderboard")
    .select("*")
    .order("total_score", {
      ascending: false,
    });
}