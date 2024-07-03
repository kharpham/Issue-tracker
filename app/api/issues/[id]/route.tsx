import { fetchSingleIssue } from "@/app/issues/[id]/fetchSingleIssue";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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


export async function DELETE(request: NextRequest, {params}: {params : {id: string}}) {
  const issue = await fetchSingleIssue(params.id);
  await prisma.issue.delete({
    where: {id: parseInt(params.id)}
  });
  return NextResponse.json({})
}
