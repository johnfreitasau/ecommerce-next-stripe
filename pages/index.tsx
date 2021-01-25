import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Stripe from 'stripe';
import styles from '../styles/Home.module.css'

// interface ProductProps {
//   products: Stripe.Product;
//   prices: Stripe.Price;
// }

//FIX
interface ProductsWithPriceProps {
  products: any;
  prices: any;
  productsWithPrice: any;
}


export default function Home({products, prices}: ProductsWithPriceProps) {

  // const productsWithPrice = products.map(product => {
  //   return product = {
  //     ...product,
  //     price: prices.find(price => price.product === product.id)
  //   }}
  // )

  const productsWithPrice = products.map((product: { id: string; }) => 
    ({
      ...product,
      price: prices.find((price: { product: string; }) => price.product === product.id)
    })
  )

  return (
    <>
      <h1>Stripe store</h1>
      {productsWithPrice.map(product => (
        <>
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>{product.price.currency.toUpperCase()}$ {Number(product.price.unit_amount /100).toFixed(2)}</p>
          {product.images[0] && <img src={product.images[0]} width="100px" />}
          <p><Link href={`/products/${product.id}`}>Check the product</Link></p>
        </div>
        <hr />
        </>
      ))}
      
  </>

  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});
  
  const products = await stripe.products.list();

  const prices = await stripe.prices.list();


  return {
    props: {
      products: products.data, 
      prices: prices.data
    },
  };
}
