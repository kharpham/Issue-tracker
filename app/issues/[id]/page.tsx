import authOptions from "@/app/auth/authOptions";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import AssigneeSelector from "./AssigneeSelector";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import { fetchSingleIssue } from "./fetchSingleIssue";
import { cache } from "react";
interface Props {
  params: { id: string };
}

export const fetchUser = cache((issueId: string) => fetchSingleIssue(issueId));
const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchUser(params.id);
  return (
    <Grid columns={{ initial: "1", sm: "4", md: "5" }} gap="5">
      <Box className="md:col-span-3 lg:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="1rem">
            <AssigneeSelector issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(params.id);
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}
