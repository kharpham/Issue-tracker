import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

export async function fetchSingleIssue(id: string) {
  if (isNaN(Number(id))) return notFound();
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) return notFound();
  return issue;
}
