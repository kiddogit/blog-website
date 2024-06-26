import { Link } from 'lucide-react'
import mediumIcon from '@/assets/medium.svg'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createNewStory } from '@/services/stories.service'

const NewStory = () => {
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState('https://img.freepik.com/free-psd/empty-floral-card-frame-design_53876-76400.jpg?t=st=1717308227~exp=1717311827~hmac=e229586ecfcf450305c45c40f50a62ee24a0b6044bae7933daaa237ee69da7bc&w=740')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // Image handle
  const handleBannerChange = e => {
    let file  = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setImageUrl(reader.result)
    }
    if(file){
      reader.readAsDataURL(file)
    }
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleTitleKeyDown = e => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  const handleContentChange = e => {
    setContent(e.target.value)
  }

  const mutation = useMutation({
    mutationKey: ['create-story'],
    mutationFn:values => createNewStory(values),
    onSuccess:() => {
      navigate('/')
    },
    onError:() => {
      toast.error(error.response.data.message)
    },
  })

  const handlePublishStory = async () => {
      await mutation.mutateAsync({
        title,
        content,
        picture: imageUrl,
      })
  }

  return (
    <>
    <div className='px-8 py-2 border-b-[1px]'>
      <div className='flex items-center justify-between'>
        <div className='flex w-[80%] mx-auto items-center justify-between space-x-3'>
          <Link to='/'>
            <img src={mediumIcon} width={40} height={40} alt="Medium Logo" />
          </Link>

          <div className='flex items-center gap-4'>
            <button
              onClick={handlePublishStory}
              className='px-6 py-2 rounded-full text-white bg-green-600'
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className='w-[80%] mx-auto mt-5'>
      <div className='relative w-[70%] mx-auto border-gray-300 border aspect-video hover:opacity-80'>
        <label htmlFor='banner'>
          <img src={imageUrl} alt='' className='object-cover h-full w-full' />
          <input
            id='banner'
            type='file'
            accept='.png, .jpg, .jpeg'
            hidden
            onChange={handleBannerChange}
          />
        </label>
      </div>
      <textarea
        onChange={handleTitleChange}
        onKeyDown={handleTitleKeyDown}
        placeholder='Title'
        className='text-3xl mt-10 font-medium w-full h-20 outline-none resize-none leading-tight palceholder:opacity-40'
      />

      <hr className='w-full my-5' />

      <textarea
        placeholder='Write your story'
        onChange={handleContentChange}
        className='text-2xl onChange w-full h-[70vh] outline-none resize-none leading-tight placeholder:opacity-40'
      />
    </div>
    </>
  )
}

export default NewStory
