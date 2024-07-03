import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelector = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Assign...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value="1">Kha Pham Nguyen</Select.Item>
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelector