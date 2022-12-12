import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css'
import DropdownLink from './DropdownLink'
import { Menu } from '@headlessui/react'
import Darkmodebutton from './dark-mode'

export default function Header() {
  const { status, data: session } = useSession()
  //const { state, dispatch } = useContext(Store)

  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/login' })
  }
  return (
    <>
      <header>
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link legacyBehavior href="/">
            <a className="flex title-font font-medium items-center  mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">중부마켓</span>
            </a>
          </Link>
          <Link legacyBehavior href="/talk">
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <a className="mr-5 hover:text-gray-900">마켓톡</a>
            </nav>
          </Link>

          <Link legacyBehavior href="/community">
            <a className="mr-5 ">게시판</a>
          </Link>
          <Link legacyBehavior href="/aboutTeam">
            <a className="mr-5 ">팀원소개</a>
          </Link>
          {status === 'loading' ? (
            'Loading'
          ) : session?.user ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button>{session.user.name}</Menu.Button>
              <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    회원정보
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/order-history">
                    주문내역
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <Link legacyBehavior href="/sell">
                    <DropdownLink className="dropdown-link " href="/sell">
                      판매물품 등록
                    </DropdownLink>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <a
                    className="dropdown-link "
                    href="#"
                    onClick={logoutClickHandler}
                  >
                    로그아웃
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link legacyBehavior href="/login">
              <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 mr-5">
                로그인
              </button>
            </Link>
          )}
          <Darkmodebutton></Darkmodebutton>
        </div>
      </header>
    </>
  )
}
