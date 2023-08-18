'use client'
import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

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

  useEffect(() => {

    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt');
      const prompts = await response.json()
      setPrompts(prompts)

    }
    fetchPrompts()
  }, [])

  const handleSearchChange = (e) => {

  }
  return (
    <section className='feed'>
      <form className='relative  w-full flex-center'>
        <input
          className='search_input peer'
          type='text'
          placeholder='search by username or tag'
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      < PromptCardList handleTagClick={() => { }} data={prompts} />
    </section>
  )
}

export default Feed
