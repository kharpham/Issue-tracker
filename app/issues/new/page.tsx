"use client";
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
  const { register, handleSubmit, control, formState: {errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  console.log(errors);
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-6" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            const result = await axios.post("/api/issues", data);
            router.push("/issues");
            setError("");
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && <Text color="red" as="p">{errors.title.message}</Text> }
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && <Text color="red" as="div">{errors.description.message}</Text> } 
        <Button>Create Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
