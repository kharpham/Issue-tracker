import {z} from 'zod';

export const issueSchema = z.object({
    title: z.string().min(1, "Title is required.").max(255, "Title must be at most 255 characters."),
    description: z.string().min(1, "Description is required."),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
})
export type IssueFormData = z.infer<typeof issueSchema>;