import React from 'react'
import DefaultLayout from '../../layouts/default'
import { Home } from '../../modules/home'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function StaticSideGeneration({ state }) {
  return (
    <DefaultLayout>
      <Home {...state} />
    </DefaultLayout>
  )
}
