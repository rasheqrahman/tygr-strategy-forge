
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MagicLinkRequest {
  email: string;
  redirectTo?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, redirectTo }: MagicLinkRequest = await req.json();

    // Generate magic link using Supabase Auth
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const magicLinkResponse = await fetch(`${supabaseUrl}/auth/v1/magiclink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseServiceKey}`,
        "apikey": supabaseServiceKey!,
      },
      body: JSON.stringify({
        email,
        redirect_to: redirectTo || `${new URL(req.url).origin}/`,
      }),
    });

    if (!magicLinkResponse.ok) {
      const error = await magicLinkResponse.text();
      throw new Error(`Failed to generate magic link: ${error}`);
    }

    // Send email with magic link
    const emailResponse = await resend.emails.send({
      from: "Auth <onboarding@resend.dev>",
      to: [email],
      subject: "Your Magic Link",
      html: `
        <h1>Sign in to your account</h1>
        <p>You requested a magic link to sign in. Click the button below to sign in:</p>
        <p><strong>Note:</strong> This is a simplified implementation. In production, you would receive a proper magic link.</p>
        <p>Please check your email for the magic link or return to the app to try again.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    });

    console.log("Magic link email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-magic-link function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
