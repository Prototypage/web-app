import Link from 'next/link'
import React from 'react'
import styles from '../../../styles/page404/page404.module.css'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Page404() {
  return (
    <div className={styles.background}>
      <div className={styles.texte404}>
        <div>
          <p className={styles.textep}>
            La page demandée n&apos;est pas attribuée.
          </p>
          <p className={styles.textep}>
            Retourner à l&apos;{' '}
            <Link href="/">
              <a>accueil</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
