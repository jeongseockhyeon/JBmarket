import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import { getError } from '../utils/error'
import axios from 'axios'

export default function RegisterScreen() {
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
    getValues,
    formState: { errors },
  } = useForm()
  const submithandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      })

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
    <Layout title="회원가입">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submithandler)}
      >
        <h1 className="mb-4 text-xl">회원가입</h1>
        <div className="mb-4">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            className="w-full text-black"
            id="name"
            autoFocus
            {...register('name', {
              required: '이름을 입력해주세요',
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.messege}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email">이메일</label>
          <input
            className="text-black"
            type="email"
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: '올바른 이메일을 입력해주세요',
              },
            })}
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: { value: 6, message: '6자리 이상의 수를 입력하세요' },
            })}
            className="w-full text-black"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red=500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlfor="confirmpassword">비밀번호 확인</label>
          <input
            className="w-full text-black"
            type="password"
            id="confirmpassword"
            {...register('confirmpassword', {
              required: '입력한 비밀번호를 다시 입력해주세요',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: '비밀번호는 6자리 이상의 수입니다',
              },
            })}
          />
          {errors.confirmpassword && (
            <div className="text-red-500">{errors.confirmpassword.message}</div>
          )}
          {errors.confirmpassword &&
            errors.confirmpassword.type === 'validate' && (
              <div className="text-red-500">비밀번호가 일치하지 않습니다.</div>
            )}
        </div>
        <div className="mb-4 text-black">
          <button className="primary-button">가입</button>
        </div>
      </form>
    </Layout>
  )
}
