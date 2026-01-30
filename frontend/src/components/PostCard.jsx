import { Link } from "react-router-dom";
import api from "../services/api";
import "./PostCard.css";

function PostCard({ post, onUpdate }) {
  const handleLike = async () => {
    try {
      const res = await api.post(`/posts/${post._id}/like`);
      onUpdate && onUpdate(res.data);
    } catch (e) {
      console.error("Like error", e);
    }
  };

  return (
    <div className="post-card">
      {post.image && (
        <img
          src={`http://localhost:5000${post.image}`}
          alt="post"
          className="post-image"
        />
      )}

      <h3>{post.title}</h3>

      <p className="preview">
        {post.content.length > 120
          ? post.content.slice(0, 120) + "..."
          : post.content}
      </p>

      {/* TAGS */}
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag, i) => (
            <span key={i} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="post-footer">
        <span>by {post.author_id?.username || "Unknown"}</span>

        <div className="post-actions">
          <button className="like-btn" onClick={handleLike}>
            ❤️ {post.likes?.length || 0}
          </button>

          <Link to={`/posts/${post._id}`}>Read →</Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
