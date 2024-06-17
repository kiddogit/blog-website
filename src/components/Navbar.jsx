import { useState } from 'react'
import { Link, useNavigate, createSearchParams } from "react-router-dom"
import { ScrollText, Search } from 'lucide-react'
import mediumIcon from '@/assets/medium.svg'
import Dropdown from './Dropdown'

const Navbar = () => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')

  const searchOnKeyDown = e => {
    if (e.code === 'Enter') {
      navigate(`/search?${createSearchParams({ s: searchInput })}`)
    }
  }

  return (
    <div className="px-8 py-2 border-b-[1px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={mediumIcon} width={40} height={40} alt="Medium Logo" />
          </Link>
          <div className="flex items-center bg-gray-200 overflow-hidden rounded-full px-2">
            <Search size={20} className='opacity-50' />
            <input
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={searchOnKeyDown}
              type="text"
              placeholder="Search..."
              className="focus:outline-none px-1 py-2 placeholder:text-sm text-sm bg-gray-200"
            />
          </div>
        </div>
        <div className="flex items-center space-x-7">
          <span
            onClick={() => navigate('/new-story')}
            className="flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write">
              <path d="M16.4745 5.40801L18.5917 7.52524M17.8358 3.54289L12.1086 9.27005C11.8131 9.56562 11.6116 9.94206 11.5296 10.3519L11 13L13.6481 12.4704C14.0579 12.3884 14.4344 12.1869 14.7299 11.8914L20.4571 6.16423C21.181 5.44037 21.181 4.26676 20.4571 3.5429C19.7332 2.81904 18.5596 2.81903 17.8358 3.54289Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 15V18C19 19.1046 18.1046 20 17 20H6C4.89543 20 4 19.1046 4 18V7C4 5.89543 4.89543 5 6 5H9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-light text-sm">Write</p>
          </span>
          <Link
            to='/me/drafts'
            className="opacity-60 flex items-center space-x-1 text-sm font-light">
            <ScrollText size={20} opacity={20} /> Me
          </Link>
          <Dropdown />
        </div>
      </div>
    </div>
  )
}

export default Navbar
