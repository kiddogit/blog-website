import mediumIcon from '@/assets/medium.svg'
import { editStory, fetchSingleStory } from '@/services/stories.service'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditPage = () => {
  const params = useParams()

  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('https://cdn.pixabay.com/photo/2015/10/16/01/09/street-990315_1280.jpg')

  const fetchStory = async () => {
    try {
      setIsLoading(true)
      const response = await fetchSingleStory(params.storyId)
      console.log(response)
      setTitle(response.title)
      setContent(response.content)
      setImageUrl(response.imageUrl)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStory()
  }, [])

  const handleBannerChange = e => {
    let file = e.target.files(0)
    const reader = new FileReader()
    reader.onload = () => {
      setImageUrl(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleTitleKeyDown = e => {
    if (e.code === 'Enter') {
      e.preventDefault()
    }
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleContentChange = e => {
    setContent(e.target.value)
  }

  const mutation = useMutation({
    mutationKey: ['edit-story'],
    mutationFn: values => editStory(params.storyId, values),
    onSuccess: () => {
      navigate('/me')
    },
    onError: error => {
      toast.error(error?.response?.data?.message)
    },
  })

  const publishEditStory = async () => {
    await mutation.mutateAsync({
      title,
      content, 
      imageUrl,
    })
  }
  return (
    <>
      <div className='px-8 py-2 border-b-[1px]'>
        <div className='flex items-center justify-between'>
          <div className='flex w-[80%] mx-auto items-center justify-between space-x-3'>
            <Link to='/'>
              <img src={mediumIcon} width={40} height={40} alt='Medium Logo' />
            </Link>

            <div className='flex items-center gap-4'>
              <button
              onClick={publishEditStory}
              className='px-6 py-2 rounded-full text-white bg-green-600'>
                Edit
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
              onChange={handleBannerChange}
            />
          </label>
      </div>
      <textarea
      onChange={handleTitleChange}
      onKeyDown={handleTitleKeyDown}
      value={title}
      placeholder='Title'
      className='text-3xl mt-10 font-medium w-full h-20 outline-none resize-none leading-tight placeholder:opacity-40'
      />
      <hr className='w-full my-5' />

      <textarea
        value={content}
        placeholder='Write your story'
        onChange={handleContentChange}
        className='text-2xl
        onChange
        w-full
        h-[70vh]
        outline-none
        leading-tight
        placeholder:opacity-40'
      />
      </div>
    </>
  )
}

export default EditPage
