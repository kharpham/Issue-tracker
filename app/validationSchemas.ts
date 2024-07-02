import {z} from 'zod';

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required.").max(255, "Title must be at most 255 characters."),
    description: z.string().min(1, "Description is required."),
})
export type IssueFormData = z.infer<typeof createIssueSchema>;