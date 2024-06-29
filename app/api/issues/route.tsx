import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required.").max(255, "Title must be at most 255 characters."),
    description: z.string().min(1, "Description is required."),
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const result = createIssueSchema.safeParse(body);
      if (!result.success) return NextResponse.json(result.error.format(), {status: 400}); 
    const issue = await prisma.issue.create({
        data: {
            title: result.data.title,
            description: result.data.description,
        }
    });
    return NextResponse.json(issue);
}
