import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import {Skeleton} from '@/app/components/index';

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton/>
      <Flex gap="3" my="3">
        <Skeleton width="5rem"/>
        <Skeleton width="8rem"/>
      </Flex>
      <Card className="prose mt-3 space-y-3">
        <Skeleton count={3}></Skeleton>
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
