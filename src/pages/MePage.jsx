import { deleteStory, fetchMyStories } from "@/services/stories.service"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"

const MePage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {data, isLoading} = useQuery({
    queryKey: ['me'],
    queryFn: () => fetchMyStories(),
  })

  const handleDeleteStory = async id => {
    const response = await deleteStory(id)

    toast.success(response.message)
    queryClient.invalidateQueries({ queryKey: ['stories']})
  }

  return (
    <div className="flex items-center flex-col w-full justify-center">
    {isLoading ? (
      <ClipLoader color='#121212' />
    ) : (
      <div className="space-y-5">
      {data.map(story => (
        <div
        key={story.id}
        className="space-y-5 flex items-center w-[200px] justify-between">
        <h2>{story.title}</h2>
        <div className="space-x-3">
          <button 
          className="py-3 px-2 bg-[#22c55e]"
          onClick={() => navigate(`edit/${story.id}`)}
          >
            Edit
          </button>
          <button 
          onClick={() => handleDeleteStory(story.id)}
          className="py-3 px-2 bg-red-500"
          >
            Delete
          </button>
        </div>
        </div>
      ))}
      </div>
    )}
     
    </div>
  )
}

export default MePage
