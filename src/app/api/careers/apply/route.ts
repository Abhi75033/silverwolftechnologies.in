import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, college, semesterYear, portfolio, source, jobId, jobTitle } = body;

    // Validation
    if (!name || !email || !phone || !college || !semesterYear || !source) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase configuration environment variables!");
      return NextResponse.json(
        { error: "Server Configuration Error: Supabase keys are not set in environment variables." },
        { status: 500 }
      );
    }

    // Insert candidate record to Supabase via its public REST endpoint
    const cleanUrl = supabaseUrl.replace(/\/$/, "");
    const restUrl = `${cleanUrl}/rest/v1/careers_responses`;

    const response = await fetch(restUrl, {
      method: "POST",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        college,
        semester_year: semesterYear,
        portfolio: portfolio || "",
        source,
        job_id: jobId || 1,
        job_title: jobTitle || "Digital Marketing Intern"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase API Error:", errorText);
      return NextResponse.json(
        { error: `Database insert failed: ${errorText}` },
        { status: response.status }
      );
    }

    const insertedData = await response.json();

    return NextResponse.json({ success: true, data: insertedData });
  } catch (error: any) {
    console.error("Error in apply route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
