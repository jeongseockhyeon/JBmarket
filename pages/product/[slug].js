import React from 'react'
import Layout from '../../components/Layout'
import Product from '../../models/Product'
import db from '../../utils/DB'

export default function ProductdetailScreen({ product }) {
  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>
  }
  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="/noimg.png"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-700 text-3xl title-font font-medium mb-1">
                {product.productname}
              </h1>
              <p className="leading-relaxed">제품 설명</p>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-600">
                  {product.price}원
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  바로 톡하기!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  }
}
