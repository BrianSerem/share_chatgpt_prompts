'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from "./Button"



const Nav = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);


    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className="flex gap-2 flex-center" >
                <Image
                    src='/assets/images/logo.svg'
                    alt='propmtopia logo'
                    width={40} height={40}
                    className='object-contain' />
                <p className="logo_text"> Promptopia</p>
            </Link>

            {/* { Desktop Navigation } */}
            <div className="sm:flex hidden gap-3">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link
                            href='/create-prompt'
                            className="black_btn"
                        >
                            Create Post
                        </Link>
                        <button
                            className="outline_btn"
                            type='button'
                            onClick={signOut}>
                            Sign Out
                        </button>
                        <Link href='/profile'>
                            <Image
                                className="rounded-full"
                                src={session?.user.image}
                                width={37} height={37}
                                alt='promptopia user profile image' />
                        </Link>
                    </div>)
                    :
                    (
                        <>
                            {providers && Object.values(providers).map((provider) => (
                                <button
                                    className="black_btn"
                                    key={provider.name}
                                    type='button'
                                    onClick={() => signIn(provider.id)}>
                                    {provider.name}
                                </button>

                            ))}
                            <Button />
                        </>
                    )}
            </div>
            {/* {Mobile Navigation} */}
            <div className="sm:hidden flex relative gap-2" >
                {session?.user ? (
                    <div className="flex">
                        <Image
                            className="rounded-full"
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt='promptopia user profile image'
                            onClick={() => setToggleDropdown(prev => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    rel="stylesheet"
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(flase)}>
                                    My Profile
                                </Link>
                                <Link
                                    rel="stylesheet"
                                    href="/create post"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(flase)}>
                                    Create Post
                                </Link>
                                <button
                                    className="black_btn"
                                    type="button"
                                    onClick={() => { setToggleDropdown(false); signOut(); }}>
                                    Sign Out
                                </button>
                            </div>)}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                className="black_btn"
                                key={provider.name}
                                type='button'
                                onClick={() => signIn(provider.id)}>
                                Google
                            </button>
                        ))}
                        <Button />
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
