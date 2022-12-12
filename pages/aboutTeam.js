import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'

export default function AboutTeam() {
  return (
    <Layout>
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  팀
                </h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                2학기 동안 같이 프로젝트를 한 팀원들입니다.
              </p>
            </div>
            <div className="flex flex-wrap -m-4">
              <div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                    정석현
                  </h2>
                  <Link legacyBehavior href="">
                    <p className="leading-relaxed text-base">개인 포트폴리오</p>
                  </Link>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                    신명진
                  </h2>
                  <Link
                    legacyBehavior
                    href="https://portfolio-mj174.vercel.app/"
                  >
                    <p className="leading-relaxed text-base">개인 포트폴리오</p>
                  </Link>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                    정찬하
                  </h2>
                  <Link
                    legacyBehavior
                    href="https://nextportfolio-phi.vercel.app/"
                  >
                    <p className="leading-relaxed text-base">개인 포트폴리오</p>
                  </Link>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                    최효영
                  </h2>
                  <Link
                    legacyBehavior
                    href="https://portfolio-temporary.vercel.app/"
                  >
                    <p className="leading-relaxed text-base">개인 포트폴리오</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
