import React from 'react'
import DefaultLayout from '../../layouts/default'
import { Temperatures } from '../../modules/temperatures'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function StaticSideGeneration({ state }) {
  return (
    <DefaultLayout>
      <Temperatures {...state} />
    </DefaultLayout>
  )
}
