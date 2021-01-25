import { symlinkSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Stripe from 'stripe';
import CheckoutButton from '../../components/CheckoutButton';

interface productProps {
  product: Stripe.Product;
  price: Stripe.Price;
}

const Product: React.FC<productProps> = ({product, price}) => {
  
  return (
      <>
        <h1>Product</h1>
        <p>{product.name}</p>
        <p>{product.caption}</p>
        <p>{product.description}</p>
        {product.images[0] && <img src={product.images[0]} width={400} />}
        <p>{price.currency.toUpperCase()}$ {Number(price.unit_amount /100).toFixed(2)} </p>
        <Link href='/'>Back</Link>
        <CheckoutButton priceId={price.id} productName={product.name} />
      </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});
  
  const products = await stripe.products.list();

  // console.log('products:',products.data)

  const paths = products.data.map(product => {
    return {
      params: {
        productId: product.id,
      }
    }
  })

  // console.log('paths:',paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});
  
  const product = await stripe.products.retrieve(params.productId as string);

  const filteredPrice = await stripe.prices.list(
    {product: product.id}
  )

  // const price = filteredPrice.data[0];

  return {
    props: {
      product, 
      price: filteredPrice.data[0]
    },
  };
}

export default Product;