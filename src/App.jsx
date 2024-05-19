import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { Toaster } from "react-hot-toast"
import MainLayout from "./layouts/MainLayout"
import NewStory from "./pages/NewStory"
import SingleStoryPage from "./pages/SingleStoryPage"

const App = () => {
  return <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/new-story" element={<NewStory />} />

      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="/stories/:storyId" element={<SingleStoryPage />} />
      </Route>
    </Routes>

    <Toaster
      position="top-right"
      reverseOrder={false}
    />
  </>
}

export default App
