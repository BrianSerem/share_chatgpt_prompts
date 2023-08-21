'use client'
import Router, { useRouter } from "next/navigation"

const Button = ( {desc, type}) => {
    const router = useRouter()

    const signInButtonClick = () => {
        router.push('/sign-in')
    }

    return (
        <button
            className="black_btn"
            type={type}
            onClick={signInButtonClick }>
            {desc}
        </button>
    )
}

export default Button
