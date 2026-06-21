import supabase from "../lib/supabase";

export async function getProfile(userId) {
  return await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
}

export async function updateProfile(
  userId,
  username,
  avatar_url
) {
  return await supabase
    .from("profiles")
    .upsert({
      id: userId,
      username,
      avatar_url,
    });
}

export async function getAllProfiles() {
  return await supabase
    .from("profiles")
    .select("*");
}