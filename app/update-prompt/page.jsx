'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Form from '@components/Form'
import { useSession } from 'next-auth/react'
import Button from '@components/Button'

const UpdatePromptPage = () => {

  const pathName = usePathname()
  const {data : session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')


  const [submitForm, setSubmitForm] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  // Get and populate edit form with the current details.
  useEffect(() => {
    const getPromtDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if (promptId) {
      getPromtDetails(promptId)
    }

  }, [promptId])

  // Update prompt
  const updatePrompt = async (e) => {

    e.preventDefault();
    setSubmitForm(true);

    //Check if we have a promtId
    if (!promptId) { alert('prompId not found') }

    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      if (response.ok) {
        router.push('/profile');
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setSubmitForm(false)
    }

  }

  if (!session) {

    return (
      <>
        <p> You must be logged in to operate on this page</p>
        < Button />
      </>
    )
  }
  return (
    < Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitForm}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePromptPage
