import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Title must be at most 255 characters."),
  description: z.string().min(1, "Description is required.").max(65535),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});

export type IssueFormData = z.infer<typeof issueSchema>;

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255, "Title must be at most 255 characters.")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});
