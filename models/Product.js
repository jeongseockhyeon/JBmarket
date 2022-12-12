import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    productname: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product
