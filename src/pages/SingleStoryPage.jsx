// import { fetchSingleStory } from "@/services/stories.service"
// import { useQuery } from "@tanstack/react-query"
// import { useParams } from "react-router-dom"

// const SingleStoryPage = () => {
//   const params = useParams()
//   const { data, isLoading } = useQuery({
//     queryKey: [`story ${params.storyId}`],
//     queryFn: () => fetchSingleStory(params.storyId)
//   })

//   return (
//     <div>{isLoading ? <div>Loading</div> : <div>{JSON.stringify(data)}</div>}</div>

//     // <div>
//     //   <div>
//     //     <h1>{data.title}</h1>
//     //     <img src={data.imageUrl} alt="" />
//     //     <p>{data.content}</p>
//     //   </div>
//     // </div>
//   )
// }

// export default SingleStoryPage


import { fetchSingleStory } from "@/services/stories.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const SingleStoryPage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`story ${params.storyId}`],
    queryFn: () => fetchSingleStory(params.storyId),
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {isLoading ? (
        <div className="text-center text-xl text-gray-700">Loading...</div>
      ) : (
        <div className="max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <img src={data.imageUrl} alt="" className="w-full h-auto mb-4 rounded-lg" />
          <p className="text-gray-700 leading-relaxed">{data.content}</p>
        </div>
      )}
    </div>
  )
}

export default SingleStoryPage
