import Product from '../../../models/Product'
import db from '../../../utils/DB'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return
  }
  const { productname, category, price } = req.body
  if (!productname || !category || !price || price < 0) {
    res.status(422).json({
      message: 'Validation error',
    })
    return
  }

  await db.connect()

  const newProduct = new Product({
    productname,
    //productimg,
    category,
    price,
  })

  const product = await newProduct.save()
  await db.disconnect()
  res.status(201).send({
    message: '물품 등록',
    _id: product._id,
    productname: product.productname,
    //productimg:product.productimg,
    category: product.category,
    price: product.price,
  })
}

export async function getServerSideProps(context) {
  const { params } = context
  const { productname } = params

  await db.connect()
  const product = await Product.findOne({ productname }).lean()
  await db.disconnect()

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  }
}

export default handler
