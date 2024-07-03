import { fetchSingleIssue } from "@/app/issues/[id]/fetchSingleIssue";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import secureAuth from "../secureAuth";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  await fetchSingleIssue(params.id);
  const body = await request.json();
  const result = issueSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ error: result.error.errors }, { status: 400 });
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: result.data.title,
      description: result.data.description,
      status: result.data.status,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  await fetchSingleIssue(params.id);
  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({});
}
