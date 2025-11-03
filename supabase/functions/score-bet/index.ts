import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bets } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build a comprehensive prompt for AI analysis
    const betsDescription = bets.map((bet: any, idx: number) => 
      `Bet ${idx + 1}: ${bet.sport} - ${bet.game} - ${bet.betType} (${bet.selection}) at ${bet.odds}x odds`
    ).join('\n');

    const prompt = `Analyze this ${bets.length > 1 ? 'parlay bet' : 'single bet'} and provide a confidence score from 0-100 based on the odds, sport dynamics, and general betting wisdom. Consider factors like:
- Are the odds reasonable for the selections?
- Is this a parlay? (Higher risk with multiple legs)
- Sport-specific factors (injuries, recent form, matchups)
- Statistical likelihood

${betsDescription}

Respond with a JSON object containing:
{
  "score": <number 0-100>,
  "reasoning": "<brief 1-2 sentence explanation>"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a professional sports betting analyst. Provide realistic, data-driven assessments."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the AI response
    let result;
    try {
      result = JSON.parse(aiResponse);
    } catch {
      // Fallback if AI doesn't return valid JSON
      result = {
        score: 50,
        reasoning: "Unable to parse AI response, defaulting to neutral score"
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in score-bet function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        score: 50,
        reasoning: "Error analyzing bet"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
