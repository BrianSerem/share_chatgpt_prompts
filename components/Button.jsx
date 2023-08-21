'use client'
import Router, { useRouter } from "next/navigation"

const Button = ( {desc}) => {
    const router = useRouter()

    const signInButtonClick = () => {
        router.push('/sign-in')
    }

    return (
        <button
            className="black_btn"
            type='button'
            onClick={signInButtonClick }>
            {desc}
        </button>
    )
}

Button.defaultProps = {
    desc: 'Sign In'
  }

export default Button
