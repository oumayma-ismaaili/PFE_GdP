import { supabase } from "../config/supabase/supabaseClient";

export const fetchUser = async (setLoading, setUser, email, password) => {
  setLoading(true);

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error) {
      if (!navigator.onLine) {
        return "No internet connection. Please check your connection and try again.";
      } else if (error.code === "PGRST116" || error.details.includes("0 rows")) {
        return "Incorrect email or password.";
      } else {
        return "An unexpected error occurred. Please try again later.";
      }
    } else {
      setUser(data);
    }
  } catch (err) {
    console.error("An error occurred:", err.message);
    if (!navigator.onLine) {
      console.log("no internet");
      return "No internet connection. Please check your connection and try again.";
    }
    return "An unexpected error occurred. Please try again later.";
  } finally {
    setLoading(false);
  }
};
