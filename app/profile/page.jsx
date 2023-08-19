'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'
import { useRouter } from 'next/navigation'


const MyProfile = () => {

    const { data: session } = useSession();
    const [prompts, setPrompts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {

        const fetchPrompts = async () => {

            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const prompts = await response.json()

            setPrompts(prompts)
            setIsLoading(false)

        }
        if (session?.user.id) { fetchPrompts() }
    }, [])

    const handleDelete = async (prompt) => {

        const hasConfirmedDelete = confirm('Are you sure you want to delete this prompt?')

        if (hasConfirmedDelete) {

            try {
                await fetch(`/api/prompt/${prompt._id}`, {
                    method: 'delete'
                })
                const newPrompts = prompts.filter((eachPrompt) => eachPrompt._id !== prompt._id)
                setPrompts(newPrompts)

            } catch (error) {
                console.log(error)
            }

        }



    }



    const handleEdit = (prompt) => {

        router.push(`/update-prompt/?id=${prompt._id}`)

        console.log(prompt._id)

    }


    return (
        <>
            < Profile
                name='My'
                desc='Welcome to your personalized profile page'
                data={prompts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default MyProfile
