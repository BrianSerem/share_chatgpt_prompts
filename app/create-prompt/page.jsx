'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePromptPage = () => {

    const { data: session } = useSession();

    const router = useRouter();

    const [submitForm, setSubmitForm] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitForm(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })
        if (response.ok) {
            router.push('/');
        }
    }
        catch (error) {
        console.log(error)
    }
    finally {
        setSubmitForm(false)
    }

}


return (
    < Form
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitForm}
        handleSubmit={createPrompt}
    />
)
}

export default CreatePromptPage
