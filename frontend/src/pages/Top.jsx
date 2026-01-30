import { useEffect, useState } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";
import "./Top.css";

function Top() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts/top").then(res => setPosts(res.data));
  }, []);

  return (
    <div className="top-page">
      <h1>🔥 Top posts</h1>

      <div className="posts-grid">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Top;
