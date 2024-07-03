import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Though we're not using the request, we still put it in the arguments to avoid caching. 
export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}