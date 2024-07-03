import { Box, Flex, Grid } from "@radix-ui/themes";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import { fetchSingleIssue } from "./fetchSingleIssue";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import AssigneeSelector from "./AssigneeSelector";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchSingleIssue(params.id);
  return (
    <Grid columns={{ initial: "1", sm: "4", md: "5" }} gap="5">
      <Box className="md:col-span-3 lg:col-span-4"> 
        <IssueDetail issue={issue} />
      </Box>
      {session && <Box>
        <Flex direction="column" gap="1rem">
          <AssigneeSelector issue={issue}/>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>}
    </Grid>
  );
};

export default IssueDetailPage;
