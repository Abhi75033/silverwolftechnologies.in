import { NextResponse } from "next/server";
import { verifyState } from "@/lib/cryptoUtils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const password = request.headers.get("x-admin-password");
    const token = request.headers.get("x-admin-token");
    const requiredPassword = process.env.ADMIN_PASSWORD || "SilverWolfAdmin123";

    let isAuthenticated = false;
    if (password && password === requiredPassword) {
      isAuthenticated = true;
    } else if (token) {
      const payload = verifyState(token);
      if (payload && payload.role === "admin") {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid admin credentials." },
        { status: 401 }
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

    // Select candidate list from Supabase REST endpoint sorted by newest submission first
    const cleanUrl = supabaseUrl.replace(/\/$/, "");
    const restUrl = `${cleanUrl}/rest/v1/careers_responses?select=*&order=submitted_at.desc`;

    const response = await fetch(restUrl, {
      method: "GET",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`
      },
      cache: "no-store"
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase REST Fetch Error:", errorText);
      return NextResponse.json(
        { error: `Database query failed: ${errorText}` },
        { status: response.status }
      );
    }

    const rawData = await response.json();

    // Map database snake_case fields back to camelCase properties for frontend table mapping
    const formattedData = rawData.map((r: any) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone,
      college: r.college,
      semesterYear: r.semester_year,
      portfolio: r.portfolio,
      source: r.source,
      jobId: Number(r.job_id),
      jobTitle: r.job_title,
      submittedAt: r.submitted_at
    }));

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error: any) {
    console.error("Error in responses API:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const password = request.headers.get("x-admin-password");
    const token = request.headers.get("x-admin-token");
    const requiredPassword = process.env.ADMIN_PASSWORD || "SilverWolfAdmin123";

    let isAuthenticated = false;
    if (password && password === requiredPassword) {
      isAuthenticated = true;
    } else if (token) {
      const payload = verifyState(token);
      if (payload && payload.role === "admin") {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid admin credentials." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing required query parameter: id" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server Configuration Error: Supabase keys are not set in environment variables." },
        { status: 500 }
      );
    }

    // Call Supabase REST API to delete row
    const cleanUrl = supabaseUrl.replace(/\/$/, "");
    const restUrl = `${cleanUrl}/rest/v1/careers_responses?id=eq.${id}`;

    const response = await fetch(restUrl, {
      method: "DELETE",
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase REST Delete Error:", errorText);
      return NextResponse.json(
        { error: `Database delete failed: ${errorText}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in delete route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
