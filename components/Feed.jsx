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
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


  const [allPrompts, setAllPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json()
      setAllPrompts(data)
      setIsLoading(false)

    }
    fetchPrompts()
  }, []);
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPrompts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


  return (
    <section className='feed'>
      <form className='relative  w-full flex-center'>
        <input
          className='search_input peer'
          type='text'
          value={searchText}
          placeholder='search by username or tag'
          onChange={handleSearchChange}
          required
        />
      </form>
      {/* All prompts */}
      { isLoading ? (<LoadingPage /> ): searchText? < PromptCardList handleTagClick={handleTagClick} data={searchedResults} /> : < PromptCardList handleTagClick={handleTagClick} data={allPrompts} />}

    </section>
  )
}

export default Feed
