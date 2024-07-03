"use client";
import {
  ErrorMessage,
  IssueStatusBadge,
  LoadingIndicator,
} from "@/app/components";
import { IssueFormData, issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import { Button, Callout, Select, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
// Lazy loading

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const statuses: Status[] = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = handleSubmit(async (data: IssueFormData) => {
    setIsLoading(true);
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
        console.log(data);
        router.push(`/issues/${issue.id}`);
        router.refresh();
      } else {
        await axios.post("/api/issues", data);
        router.push("/issues");
        router.refresh();
      }
    } catch (error) {
      setIsLoading(false);
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-6" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className=" space-y-3" onSubmit={onSubmit}>
        {issue && (
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select.Root
                value={value}
                onValueChange={onChange}
                defaultValue={issue.status}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Status</Select.Label>
                    {statuses.map((status) => (
                      <Select.Item key={status} value={status}>
                        <IssueStatusBadge status={status} />
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            )}
          />
        )}
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Text color="red" as="div">
          {errors.description?.message}
        </Text>
        <Button disabled={isLoading}>
          {issue ? "Update Issue" : "Create Issue"}{" "}
          {isLoading && <LoadingIndicator />}{" "}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
