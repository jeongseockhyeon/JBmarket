import Layout from '../components/Layout'
import Marketscreen from '../components/Marketscreen'
import db from '../utils/DB'
import Product from '../models/Product'

export default function Home({ products }) {
  return (
    <Layout>
      <title>JBmarket</title>
      <div className="grid grid-cols-1 gap-4 sm:gird-cols-3 lg:grid-cols-4 xl:gird-cols-5 2xl:gird-cols-6">
        {products.map((product) => (
          <Marketscreen product={product} key={product.productname}></Marketscreen>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find().lean()
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  }
}
