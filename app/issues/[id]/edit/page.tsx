import IssueFormSkeleton from "../../_components/IssueFormSkeleton";
import { fetchSingleIssue } from "../fetchSingleIssue";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false, loading: () => <IssueFormSkeleton selectIncluded={true}/>
} )

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