import { NextResponse, type NextRequest } from "next/server";
import {
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "@/lib/store";
import type { Property } from "@/lib/types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "alhubishi-admin";

function isAuthorized(req: NextRequest): boolean {
  const header = req.headers.get("authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "");
  return token === ADMIN_PASSWORD;
}

// GET /api/properties/:id — fetch a single property
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) {
    return NextResponse.json({ error: "العقار غير موجود" }, { status: 404 });
  }
  return NextResponse.json({ property });
}

// PUT /api/properties/:id — update a property (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const patch = (await req.json()) as Partial<Property>;
    const updated = updateProperty(id, patch);
    if (!updated) {
      return NextResponse.json({ error: "العقار غير موجود" }, { status: 404 });
    }
    return NextResponse.json({ property: updated });
  } catch {
    return NextResponse.json(
      { error: "صيغة البيانات غير صحيحة." },
      { status: 400 }
    );
  }
}

// DELETE /api/properties/:id — remove a property (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }
  const { id } = await params;
  const ok = deleteProperty(id);
  if (!ok) {
    return NextResponse.json({ error: "العقار غير موجود" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
