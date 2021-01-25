import Link from 'next/link';
import React from 'react'

interface cancelProps {

}

const Cancel: React.FC<cancelProps> = ({}) => {
    return (
      <>
        <h1>Canceled. </h1>
        <Link href='/'>Back</Link>
      </>
    );
}

export default Cancel;