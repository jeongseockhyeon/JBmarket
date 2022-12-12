import Link from 'next/link'
import React from 'react'

export default function Marketscreen({ product }) {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="card">
          <div className="flex flex-wrap items-center justify-center p-5">
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt={product.productname}
                class="object-cover object-center w-full h-full block"
                src="/noimg.png"
              />
            </a>
            <Link legacyBehavior href={`/product/${product.productname}`}>
              <div className="mt-4">
                <h3 className="text-gray-800 text-xs tracking-widest title-font mb-1">
                  {product.category}
                </h3>
                <h2 className="text-gray-700 title-font text-lg font-medium">
                  {product.productname}
                </h2>
                <p className="mt-1">{product.price}원</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
