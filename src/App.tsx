import { Suspense, useState } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import PostsForm from "./components/PostForm";
import PostsList from "./components/PostsList";
import { getPosts } from "./services/post";

function App() {
  const [postsPromise, setPostsPromise] = useState(() => getPosts());

  const handleRefresh = () => {
    setPostsPromise(getPosts());
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>📝 Список постов</h2>
      </header>

      <PostsForm onPostAdded={handleRefresh} />

      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <PostsList postsPromise={postsPromise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
