import Link from 'next/link'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { getError } from '../utils/error'
import { useForm } from 'react-hook-form'

export default function LoginForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="로그인">
      <form
        className="flex justify-center h-screen w-screen items-center"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="w-full md:w-1/2 flex flex-col items-center ">
          <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
            LOGIN
          </h1>
          <div className="w-3/4 mb-4">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: '올바른 이메일을 입력해주세요',
                },
              })}
              className="w-full text-black"
              id="email"
              autoFocus
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="w-3/4 mb-6">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: {
                  value: 3,
                  message: 'password is more than 3 chars',
                },
              })}
              className="w-full text-black"
              id="password"
              autoFocus
            />
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <div className="w-3/4 mt-4">
            <button
              type="submit"
              className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
            >
              {' '}
              LOGIN
            </button>
          </div>
          <div className="mb-4">
            계정이 없으신가요? &nbsp;
            <Link href={`/register?redirect=${redirect || '/'}`}>가입하기</Link>
          </div>
        </div>
      </form>
    </Layout>
  )
}
