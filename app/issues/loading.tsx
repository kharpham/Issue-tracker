import { Table } from '@radix-ui/themes'
import React from 'react'
// import Skeleton from 'react-loading-skeleton'
import { Skeleton } from '@radix-ui/themes'
// import 'react-loading-skeleton/dist/skeleton.css'
import IssueActions from './IssueActions'

const LoadingIssuesPage = () => {
  const skeletonNumbers = [1,2,3,4,5,6]
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
          {skeletonNumbers.map(number => 
            <Table.Row key={number}>
              <Table.Cell>
                <Skeleton/>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><Skeleton/></Table.Cell>
              <Table.Cell className="hidden md:table-cell"><Skeleton/></Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
      </>
  )
}

export default LoadingIssuesPage