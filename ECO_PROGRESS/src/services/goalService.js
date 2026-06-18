import supabase from "../lib/supabase";

export async function getUserGoal(userId) {
  return await supabase
    .from("user_goals")
    .select("*")
    .eq("user_id", userId)
    .single();
}

export async function saveUserGoal(
  userId,
  goal
) {
  return await supabase
    .from("user_goals")
    .upsert({
      user_id: userId,
      goal,
    });
}

export async function updateUserGoal(
  userId,
  goal
) {
  return await supabase
    .from("user_goals")
    .upsert({
      user_id: userId,
      goal,
    });
}