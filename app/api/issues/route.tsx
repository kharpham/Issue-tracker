import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const result = issueSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json(result.error.format(), { status: 400 });
  const issue = await prisma.issue.create({
    data: {
      title: result.data.title,
      description: result.data.description,
    },
  });
  return NextResponse.json(issue);
}
