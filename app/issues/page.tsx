import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = () => {
  return (
    <>
      <Link href="/issues/new"><Button>Create new issue</Button></Link>
    </>
  );
};

export default IssuesPage;
