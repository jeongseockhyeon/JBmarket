import axios from 'axios'
//import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'
import { getError } from '../utils/error'

export default function SellScreen() {
  //const { data: session } = useSession()

  const router = useRouter()
  //const { redirect } = router.query

  const {
    handleSubmit,
    register,
    //formState: { error },
  } = useForm()

  const submitHandler = async ({ productname, category, price }) => {
    try {
      const result = await axios.post('/api/auth/productup', {
        productname,
        category,
        price,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
    router.push('/')
  }

  return (
    <Layout title="판매 물품 등록">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">판매 물품 등록</h1>
        {/* <div className="mb-4">
          <label htmlFor="productimg">물품사진</label>
          <input
            type="file"
            className="w-full"
            id="productimg"
            autoFocus
            {...register('productimg', { required: '물품명을 입력해주세요' })}
          />
        </div> */}
        <div className="mb-4">
          <label htmlFor="productname">물품명</label>
          <input
            type="text"
            className="w-full"
            id="productname"
            autoFocus
            {...register('productname', { required: '물품명을 입력해주세요' })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category">카테고리</label>
          <input
            type="text"
            className="w-full"
            id="category"
            autoFocus
            {...register('category', { required: '카테고리을 입력해주세요' })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price">가격</label>
          <input
            type="price"
            className="w-full"
            id="price"
            autoFocus
            {...register('price', { required: '가격을 입력해주세요' })}
          />
        </div>
        <div className="w-3/4 mt-4">
          <button
            type="submit"
            className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
          >
            {' '}
            물품 등록
          </button>
        </div>
      </form>
    </Layout>
  )
}
