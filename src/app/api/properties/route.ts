import { NextResponse, type NextRequest } from "next/server";
import {
  getAllProperties,
  createProperty,
} from "@/lib/store";
import type { Property } from "@/lib/types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "alhubishi-admin";

function isAuthorized(req: NextRequest): boolean {
  const header = req.headers.get("authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "");
  return token === ADMIN_PASSWORD;
}

// GET /api/properties — list all properties
export async function GET() {
  return NextResponse.json({ properties: getAllProperties() });
}

// POST /api/properties — create a new property (admin only)
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as Partial<Property>;
    if (!body.title || !body.type || !body.purpose) {
      return NextResponse.json(
        { error: "الحقول المطلوبة ناقصة (العنوان، النوع، الغرض)." },
        { status: 400 }
      );
    }
    const created = createProperty(body as Property);
    return NextResponse.json({ property: created }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "صيغة البيانات غير صحيحة." },
      { status: 400 }
    );
  }
}
