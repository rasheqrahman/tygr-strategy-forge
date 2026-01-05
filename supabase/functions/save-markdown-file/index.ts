
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    // Parse and validate input
    const authHeader = req.headers.get("Authorization") || "";
    const { slug, type, content } = await req.json();

    if (!slug || !type || !content) {
      return new Response(
        JSON.stringify({ error: "Missing slug, type, or content" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Connect to Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const { createClient } = await import("npm:@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user info from JWT
    const jwt = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabase.auth.getUser(jwt);
    if (!user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    // Confirm user is an admin (matches admin_users table)
    const { data: adminRows } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", user.email);
    if (!adminRows || adminRows.length === 0) {
      return new Response(JSON.stringify({ error: "Not admin" }), { status: 403, headers: corsHeaders });
    }

    // Insert or upsert the markdown content
    const upsertResult = await supabase
      .from("editable_markdown_files")
      .upsert({
        slug,
        type,
        content,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      }, { onConflict: "slug,type" });

    if (upsertResult.error) {
      console.error("Supabase upsert error:", upsertResult.error);
      return new Response(JSON.stringify({ error: upsertResult.error.message || "Database error" }), { status: 500, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
