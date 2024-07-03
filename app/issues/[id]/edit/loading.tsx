import { Box, Select, Skeleton } from '@radix-ui/themes'
import React from 'react'
import IssueFormSkeleton from '../../_components/IssueFormSkeleton'

const LoadingEditIssuePage = () => {
  return (
    <IssueFormSkeleton selectIncluded={true}/>
  )
}

export default LoadingEditIssuePage