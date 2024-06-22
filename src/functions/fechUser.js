import { supabase } from "../config/supabase/supabaseClient";

export const fetchUser = async (setLoading, setUser, email, password) => {
  setLoading(true);

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
  } else {
    setUser(data);
  }

  setLoading(false);
};
