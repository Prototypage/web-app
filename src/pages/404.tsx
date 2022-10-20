import React from 'react'
import DefaultLayout from '../layouts/default'
import { Page404 } from '../modules/404'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NotFound = () => {
  //If we want a redirection, use the lines under.
  // const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     //Return the user to one page
  //     // router.go(-1)
  //     //Return the user to a defined page
  //     router.push('/');
  //   }, 1000);
  // }, []);

  return (
    <DefaultLayout>
      <Page404 />
    </DefaultLayout>
  )
}

export default NotFound
