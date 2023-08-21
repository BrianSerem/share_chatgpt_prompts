'use client'
import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import LoadingPage from '@app/loading';

const PromptCardList = ({ data, handleTagClick }) => {

  return (
    <div className="mt-16 layout">
     {data.map((prompt) => (
      < PromptCard
      key={prompt._id}
      prompt={prompt}
      handleTagClick = {handleTagClick}
      />
     ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt');
      const prompts = await response.json()
      setPrompts(prompts)
      setIsLoading(false)

    }
    fetchPrompts()
  }, [])

  const handleSearchChange = (e) => {

    e.preventDefault()


  }


  return (
    <section className='feed'>
      <form className='relative  w-full flex-center'>
        <input
          className='search_input peer'
          type='text'
          value={searchText}
          placeholder='search by username or tag'
          onChange={(e) => setSearchText(e.target.value)}
          required
        />
      </form>
      {isLoading && (<LoadingPage />)}
      < PromptCardList handleTagClick={() => { }} data={prompts} />
    </section>
  )
}

export default Feed
