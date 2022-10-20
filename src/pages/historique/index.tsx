import React from 'react'
import DefaultLayout from '../../layouts/default'
import { Historique } from '../../modules/historique'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function StaticSideGeneration({ state }) {
  return (
    <DefaultLayout>
      <Historique {...state} />
    </DefaultLayout>
  )
}
