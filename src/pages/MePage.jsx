import { deleteStory, fetchMyStories } from "@/services/stories.service"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"

const MePage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => fetchMyStories(),
  })

  const handleDeleteStory = async id => {
    const response = await deleteStory(id)

    toast.success(response.message)
    queryClient.invalidateQueries({ queryKey: ['stories'] })
  }

  return (
    <div className="flex flex-col items-center w-full py-10 bg-gray-100 min-h-screen">
      {isLoading ? (
        <ClipLoader color='#121212' />
      ) : (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md space-y-6">
          {data.map(story => (
            <div
              key={story.id}
              className="flex items-center justify-between border-b border-gray-200 pb-4"
            >
              <h2 className="text-xl font-semibold text-gray-800">{story.title}</h2>
              <div className="flex space-x-3">
                <button
                  className="py-2 px-4 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
                  onClick={() => navigate(`/edit/${story.id}`)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStory(story.id)}
                  className="py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
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
