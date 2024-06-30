import prisma from "@/prisma/client";
import { Badge, Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from 'delay';
import IssueActions from "./IssueActions";

const IssuesPage = async () => {
  const data = await prisma.issue.findMany();
  await delay(2000);
  return (
    <>
      <IssueActions/>
      <Table.Root className="max-w-xl my-6" variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(issue => 
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className="block md:hidden"><IssueStatusBadge status={issue.status} /></div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={issue.status}/></Table.Cell>
              <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesPage;
