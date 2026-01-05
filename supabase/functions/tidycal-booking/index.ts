
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { handleGetSlots, handleCreateBooking } from './booking-handlers.ts';
import type { BookingRequest } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TIDYCAL_API_KEY = Deno.env.get('TIDYCAL_API_KEY');
    console.log('TidyCal API Key configured:', !!TIDYCAL_API_KEY);
    
    const { action, data }: { action: string; data: BookingRequest } = await req.json();

    if (action === 'getSlots') {
      return await handleGetSlots(data);
    }

    if (action === 'createBooking') {
      return await handleCreateBooking(data);
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in tidycal-booking function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
