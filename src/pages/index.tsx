import React from 'react'
import DefaultLayout from '../layouts/default'
import { Home } from '../modules/home'

export default function StaticSideGeneration({ state }) {
  return (
    <DefaultLayout>
      <Home {...state} />
    </DefaultLayout>
  )
}
