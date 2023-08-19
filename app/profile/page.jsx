'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/profile'


const MyProfile = () => {

    const { data: session } = useSession();
    const [prompts, setPrompts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchPrompts = async () => {

            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const prompts = await response.json()
            console.log(prompts)

            setPrompts(prompts)
            setIsLoading(false)

        }
        if (session?.user.id) { fetchPrompts() }
    }, [])

    const handleDelete = async () => {

    }



    const handleEdit = () => {

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
