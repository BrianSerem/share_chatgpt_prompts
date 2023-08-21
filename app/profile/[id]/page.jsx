'use client'
import React from 'react'
import Profile from '@components/Profile'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const UserProfilePage =  ({ params : {id }}) => {

    const params = useSearchParams()
    const name = params.get('name')
    const [ prompts, setPrompts ] = useState([]);


    useEffect(() => {

        const getUserPrompts  = async () => {
            try{
                const response = await fetch(`/api/users/${id}/posts`)
                const prompts = await response.json()

                setPrompts(prompts)

             }catch(error){console.log(error)}
        }
     getUserPrompts();
    }, [])



  return (
    < Profile
    name = {name}
    data = {prompts}
    desc = {`View all prompts engineered by ${name}`}

    />
  )
}

export default UserProfilePage
