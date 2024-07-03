"use client";
import { Skeleton } from "@/app/components/index";
import { Box, Card, Flex } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

const LoadingIssueDetailPage = () => {
  const currentPath = usePathname(); 
  if (currentPath.endsWith('edit')) return null;
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose mt-3 space-y-3">
        <Skeleton count={3}></Skeleton>
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
