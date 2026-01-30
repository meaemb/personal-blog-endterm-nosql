import { useEffect, useState } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then(res => setPosts(res.data));
  }, []);

  const updatePost = (updated) => {
    setPosts(prev =>
      prev.map(p => (p._id === updated._id ? updated : p))
    );
  };

  return (
    <div className="home page">
      <h1 className="home-title"> Posts</h1>

      <div className="posts-grid">
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            onUpdate={updatePost}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
