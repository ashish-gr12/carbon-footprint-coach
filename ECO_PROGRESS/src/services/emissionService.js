import supabase from "../lib/supabase";

export async function saveEmission(emissionData) {
  const { data, error } = await supabase
    .from("emissions")
    .insert([emissionData]);

  return { data, error };
}

export async function getLatestEmission(userId) {
  const { data, error } = await supabase
    .from("emissions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

  return { data, error };
}

export async function getEmissionHistory(userId) {
  const { data, error } = await supabase
    .from("emissions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
}