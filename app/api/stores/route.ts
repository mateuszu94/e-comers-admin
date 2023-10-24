import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (e) {
    console.log("[STORES_POST]", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}
