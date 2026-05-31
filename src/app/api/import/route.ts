import { NextResponse, type NextRequest } from "next/server";
import { importFromSources } from "@/lib/import";
import { createProperty } from "@/lib/store";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "alhubishi-admin";

function isAuthorized(req: NextRequest): boolean {
  const header = req.headers.get("authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "");
  return token === ADMIN_PASSWORD;
}

// POST /api/import — attempt to import properties from the configured sources.
// Body (optional): { sources?: string[], persist?: boolean }
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }

  let sources: string[] | undefined;
  let persist = false;
  try {
    const body = await req.json();
    sources = body.sources;
    persist = Boolean(body.persist);
  } catch {
    // No body provided — use defaults.
  }

  const result = await importFromSources(sources);

  if (persist && result.properties.length > 0) {
    result.properties.forEach((p) => createProperty(p));
  }

  return NextResponse.json({
    ok: result.ok,
    imported: result.properties.length,
    persisted: persist && result.ok,
    properties: result.properties,
    errors: result.errors,
  });
}
