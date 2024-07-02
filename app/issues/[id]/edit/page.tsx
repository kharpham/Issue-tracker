import IssueForm from "../../_components/IssueForm";
import { fetchSingleIssue } from "../fetchSingleIssue";

interface Props {
  params: {
    id: string;
  }
}

const EditIssuePage = async ({params}: Props) => {
  const issue = await fetchSingleIssue(params.id);
  return (
    <IssueForm issue={issue}/>
  )
}

export default EditIssuePage