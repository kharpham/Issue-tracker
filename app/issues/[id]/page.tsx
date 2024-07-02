import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import { fetchSingleIssue } from "./fetchSingleIssue";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await fetchSingleIssue(params.id);
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <IssueDetail issue={issue} />
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
