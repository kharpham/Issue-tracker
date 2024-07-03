import { Box } from '@radix-ui/themes'
import React from 'react'
import {Skeleton} from '@/app/components';
 
interface Props {
  selectIncluded: boolean
}

const IssueFormSkeleton = ({selectIncluded}: Props) => {
  return (
    <Box className="max-w-xl">
      {selectIncluded && <Skeleton width="5rem" height="2rem"/>}
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  )
}

export default IssueFormSkeleton