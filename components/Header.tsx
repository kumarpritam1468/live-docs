import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = ({ children, className }: HeaderProps) => {
    return (
        <div className={cn('header', className)}>
            <Link href='/' className=' md:flex-1'>
                <Image
                    src={"/assets/icons/logo.svg"}
                    alt="logo with name"
                    className='hidden md:block'
                    width={120}
                    height={32}
                />
                <Image
                    src={"/assets/icons/logo-icon.svg"}
                    alt="logo "
                    className='block md:hidden'
                    width={32}
                    height={32}
                />
            </Link>

            {children}
        </div>
    )
}

export default Header