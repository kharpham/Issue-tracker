import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./_components/IssueActions";
import IssueTable, { columnsName, IssueQuery } from "./_components/IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columnsName.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;
  const issueCount = await prisma.issue.count({ where: { status } });

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  return (
    <Flex direction="column" >
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </Flex>
  );
};


export const dynamic = "force-dynamic";
export default IssuesPage;

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues with pagination, filtering and ordering'
}
