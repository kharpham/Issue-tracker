"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import { createIssueSchema, IssueForm } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  console.log(errors);
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data: IssueForm) => {
    setIsLoading(true);
    try {
      const result = await axios.post("/api/issues", data);
      router.push("/issues");
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
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Text color="red" as="div">
          {errors.description?.message}
        </Text>
        <Button disabled={isLoading}>
          Create Issue {isLoading && <LoadingIndicator />}{" "}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
