import StoryList from '@/components/StoryList';
import { fetchStories } from '@/services/stories.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { ref, inView } = useInView();

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery({
  queryKey: ['stories'],
  queryFn: ({ pageParam }) => fetchStories(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      let page = 1
      const cursor = lastPage.hasNextPage
      return cursor ? (page += 1) : null
  },
  select: data => ({
    ...data,
    pages: data.pages.flat().map(page => page.stories),
  }),
})

console.log('in view', inView);

useEffect(() => {
  if(hasNextPage){
    if(inView){
      fetchNextPage()
    }
  }
}, [hasNextPage, inView])

  return (
    <div className='max-w-[800px] mx-auto px-5 mt-12'>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className='flex flex-col gap-y-5'>
            {data?.pages?.flat()?.map(story => (
              <Link to={`stories/${story.id}`} key={story.id}>
                <StoryList story={story} />
              </Link> 
            ))}
          </div> 
          <div ref={ref}></div>
        </>
      )}
    </div>
   )
}

export default HomePage;
