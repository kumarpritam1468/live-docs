import Image from 'next/image'
import React from 'react'

const Loading = () => {
    return (
        <div className='loader'>
            <Image
                src={'/assets/icons/loader.svg'}
                alt='loader'
                width={32}
                height={32}
                className='animate-spin mr-4'
            />
            Loading...
        </div>
    )
}

export default Loading