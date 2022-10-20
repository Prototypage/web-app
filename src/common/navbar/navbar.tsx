import Link from 'next/link'
import Image from 'next/image'
import logoPoule from '../../../public/poule_drole.jpg'
import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'

const Navbar = () => {
  const [clientWindowHeight, setClientWindowHeight] = useState(0)

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  useEffect(() => {
    const element = document.getElementById('myNav')
    if (element != null)
      if (clientWindowHeight == 0) {
        element.classList.add('bg-black')
      } else {
        element.classList.add('shadow-sm')
        element.classList.add('opacity-90')
        element.classList.remove('bg-black')
      }
  }, [clientWindowHeight])

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav id="myNav" className="sticky top-0 z-50 w-full bg-white shadow-sm ">
        <div className="flex h-20 w-full items-center justify-between px-10">
          <div className="flex flex-row items-center">
            <div className="flex flex-shrink-0 items-center justify-center ">
              <button type="button" title="linkToAccueil">
                <Link href={'/'} passHref={true}>
                  <Image
                    src={logoPoule}
                    alt="Logo Poule"
                    width={75}
                    height={75}
                    objectFit="contain"
                  />
                </Link>
              </button>
            </div>
            <div className="ml-10 hidden flex-row text-sm laptop:flex laptop:text-base">
              <div className="flex space-x-4">
                <Link href={'/'} passHref={true}>
                  <button
                    className="flex flex-row space-x-2 px-3 py-2 font-bold text-black hover:text-new-primary"
                    type="button"
                  >
                    <span>Accueil</span>
                  </button>
                </Link>
                <Link href={'/historique'} passHref={true}>
                  <button
                    className=" flex flex-row space-x-2 px-3 py-2 font-medium text-black hover:text-new-primary"
                    type="button"
                  >
                    <span>Historique</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="dekstop:hidden mr-10 flex laptop:hidden ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center rounded-md bg-new-primary p-2 text-white  hover:bg-new-primary focus:outline-none "
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div
              className="grid grid-cols-2 bg-white laptop:hidden"
              id="mobile-menu"
            >
              <div ref={ref} className="flex-col space-y-1 pt-2 pb-3 sm:px-3">
                <Link href="/" passHref={true}>
                  <button
                    className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-black hover:bg-new-primary hover:text-black"
                    type="button"
                  >
                    Accueil
                  </button>
                </Link>
                <Link href="/historique" passHref={true}>
                  <button
                    className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-black hover:bg-new-primary hover:text-black"
                    type="button"
                  >
                    Historique
                  </button>
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </>
  )
}

export default Navbar
