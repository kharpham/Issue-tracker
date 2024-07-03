import authOptions from "@/app/auth/authOptions";
import { fetchSingleIssue } from "@/app/issues/[id]/fetchSingleIssue";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });
  await fetchSingleIssue(params.id);
  const body = await request.json();
  const result = patchIssueSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json({ error: result.error.errors }, { status: 400 });
  const { assignedToUserId, description, status, title } = result.data;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });
    if (!user) return NextResponse.json({ error: "invalid user" }, { status: 400 });
  }

  // Only update the fields that are provided
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title,
      description,
      status,
      assignedToUserId
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
