
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches the admin email from the "admin_users" table in Supabase.
 * Returns a memoized callback that always fetches the latest admin email.
 */
export function useAdminEmail() {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  const fetchAdminEmail = useCallback(async (): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("email")
        .maybeSingle();
      if (error) {
        console.error("[useAdminEmail] Error fetching admin email:", error);
        setAdminEmail(null);
        return null;
      }
      // Warn in console if no admin email
      if (!data?.email) {
        console.warn("[useAdminEmail] No admin email configured in table.");
      }
      setAdminEmail(data?.email || null);
      return data?.email || null;
    } catch (err) {
      console.error("[useAdminEmail] Failed to fetch admin email:", err);
      setAdminEmail(null);
      return null;
    }
  }, []);

  return { adminEmail, fetchAdminEmail };
}
