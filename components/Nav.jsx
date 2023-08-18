'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'


const Nav = () => {
    const isUserLoggedIn = true;

    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setUserProviders = async () => {
            const response = await getProviders()

            setProviders(response)
        }
        setUserProviders()

    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className="flex gap-2 flex-center" >
                <Image src='/assets/images/logo.svg' alt='propmtopia logo' width={40} height={40} className='object-contain' />
                <p className="logo_text"> Promptopia</p>
            </Link>

            {/* { Desktop Navigation } */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href='/create-prompt' className="black_btn">Create Post</Link>
                        <button className="outline_btn" type='button' onClick={signOut}>
                            Sign Out
                        </button>
                        <Link href='/profile'>
                            <Image className="rounded-full" src='/assets/images/logo.svg' width={37} height={37} alt='promptopia user profile image' />
                        </Link>
                    </div>)
                    :
                    (
                        <>
                            {providers && Object.values(providers).map((provider) => (
                                <button className="black_btn" key={provider.name} type='button' onClick={() => signIn(provider.id)}>
                                    Sign In
                                </button>
                            ))}
                        </>
                    )}
            </div>
        </nav>
    )
}

export default Nav
