import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client';
import { Box, Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import MarkDown from "react-markdown";

interface Props {
    issue: Issue,
}

const IssueDetail = ({issue}: Props) => {
  return (
    <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="3">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose max-w-full mt-3">
          <MarkDown>{issue.description}</MarkDown>
        </Card>
      </Box>
  )
}

export default IssueDetail