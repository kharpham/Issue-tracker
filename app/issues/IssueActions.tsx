import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueActions = () => {
  return (
    <div>
        <Link href="/issues/new"><Button>Create new issue</Button></Link>
    </div>
  )
}

export default IssueActions