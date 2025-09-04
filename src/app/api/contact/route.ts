import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || "Contacts";

    if (!token || !baseId || !tableName) {
      return NextResponse.json({ error: "Airtable is not configured" }, { status: 500 });
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
    const payload = {
      records: [
        {
          fields: {
            Name: name,
            Email: email,
            Phone: phone ?? "",
            Message: message,
            Source: "cff-resin-site",
            CreatedAt: new Date().toISOString(),
          },
        },
      ],
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      // Airtable sometimes benefits from explicit keepalive on edge, but this is Node runtime
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: "Airtable request failed", details: text }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Unexpected error", details: message }, { status: 500 });
  }
}


