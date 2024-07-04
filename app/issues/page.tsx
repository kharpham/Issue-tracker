import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "../components";
import Link from "../components/Link";
import NextLink from "next/link";
import IssueActions from "./_components/IssueActions";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status, orderBy: keyof Issue };
}) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy) ? {[searchParams.orderBy]: 'asc'} : undefined;
  const data = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy
  });
  return (
    <>
      <IssueActions />
      <Table.Root className="max-w-xl my-6" variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink href={{
                  query: {...searchParams, orderBy: column.value}
                }}>
                  {column.value}
                  {column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
