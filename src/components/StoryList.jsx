import moment from 'moment'

const StoryList = ({ story }) => {
  return (
    <div className='flex flex-col pb-5 gap-y-2 border-b border-gray-200'>
      <div className='flex'>
        <p className='text-gray-500'>
          <span className='text-gray-700 mr-4'>{story?.author?.fullName}</span>
          {/* {moment(story?.createdAt).startOf('second').fromNow()} */}

          {/* https://momentjs.com/ */}
          {moment(story?.createdAt).startOf('second').fromNow()}
        </p>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col justify-between'>
          <h2 className='text-3xl font-semibold'>{story.title}</h2>
          <p className='line-clamp-2'>{story.content}</p>
        </div>
        <div className='w-[100px] h-[100px] overflow-hidden'>
          <img src={story.imageUrl} alt='' className='w-full h-full object-cover' />
        </div>
      </div>
    </div>
  )
}

export default StoryList