import React from 'react'
import DefaultLayout from '../../layouts/default'
import { Humidity } from '../../modules/humidity'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function StaticSideGeneration({ state }) {
  return (
    <DefaultLayout>
      <Humidity {...state} />
    </DefaultLayout>
  )
}
