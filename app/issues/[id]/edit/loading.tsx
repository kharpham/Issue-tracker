import { Box, Select, Skeleton } from '@radix-ui/themes'
import React from 'react'

const LoadingEditIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Select.Root defaultValue='Status...'/>
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  )
}

export default LoadingEditIssuePage