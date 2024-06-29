import { createIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = createIssueSchema.safeParse(body);
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
