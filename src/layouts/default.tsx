import Head from 'next/head'
// import styles from '../../styles/home/home.module.css'
import MainLayout from '../layouts/mainLayout'

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Head>
        <title>Cot Cot Connect</title>
        <meta name="description" content="Poulailler Connecté" />
      </Head>

      <MainLayout>{children}</MainLayout>

      {/* <footer className={styles.footer}>
        <p>Je suis un footer</p>
      </footer> */}
    </div>
  )
}

export default DefaultLayout
