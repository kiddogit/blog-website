import { fetchSingleStory } from "@/services/stories.service"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const SingleStoryPage = () => {
  const params = useParams()
  const { data, isLoading } = useQuery({
    queryKey: [`story ${params.storyId}`],
    queryFn: () => fetchSingleStory(params.storyId)
  })

  return <div>{isLoading ? <div>Loading</div> : <div>{JSON.stringify(data)}</div>}</div>
}

export default SingleStoryPage
