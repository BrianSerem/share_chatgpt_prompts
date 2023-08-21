'use client'
import SignInForm from "@components/SignInForm"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Router from "next/navigation"
import { useSession } from "next-auth/react"

const SignInPage = () => {

  const router = useRouter()
  const {data: session} = useSession()
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const logInUser = (e) => {

    e.preventDefault();
    setSubmitting(true)
    console.log(user, 'amefika')

  }

  if (session) {

    return (
        <>
            <p> Already logged in</p>
            {router.push('/')}
        </>
    )
}

  return (

   < SignInForm
      submitting={submitting}
      handleSubmit={logInUser}
      setUser={setUser}
      user={user}
    />

  )
}

export default SignInPage
