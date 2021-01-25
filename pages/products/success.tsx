import React from 'react'
import { useRouter } from 'next/router';

interface successProps {

}

const Success: React.FC<successProps> = ({}) => {

    const { query : {productName}} = useRouter();

    return (<h1>Success! Thank you for buying the product ${productName} </h1>);
}

export default Success;