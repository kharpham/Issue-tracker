import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () =>  <IssueFormSkeleton selectIncluded={false}/>
});
const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
export const metadata: Metadata = {
  title: 'Issue Tracker - Add Issue',
  description: 'Create New Issue'
}


