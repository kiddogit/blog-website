import { Menu, Transition } from "@headlessui/react"
import { Fragment } from 'react'
import { Link } from "react-router-dom"

const Dropdown = () => {
  return (
    // <div className="fixed top-16 w-56 text-right">
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex mt-2 w-[40px] h-[40px] rounded-full overflow-hidden'>
          <img src='https://images.pexels.com/photos/22644812/pexels-photo-22644812/free-photo-of-light-will-guide-you-home.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''  
          />
        </Menu.Button>
      </div>
      <Transition
      as={Fragment}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 sclae-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/me'
                  className={`${
                    active ? 'bg-gray-100 text-gray-700' : 'text-gray-900' 
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/new-story'
                  className={`${
                    active ? 'bg-gray-100 text-gray-700' : 'text-gray-900' 
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  Create Story
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active? 'bg-gray-100 text-gray-700' : 'text-gray-900' 
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  Archive
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active? 'bg-gray-100 text-gray-700' : 'text-gray-900' 
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  Move
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active? 'bg-gray-100 text-red-600' : 'text-red-500' 
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
      
  // </div> 
  )
}

export default Dropdown
