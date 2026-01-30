import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import PostCard from "../components/PostCard";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
        const userRes = await api.get("/auth/me");
        setUser(userRes.data);

        
        const postsRes = await api.get("/posts/my");
        setPosts(postsRes.data);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="profile-page">
      {/*  PROFILE HEADER  */}
      <div className="profile-header">
        <div className="avatar">
          {user.avatar ? (
            <img
              src={`http://localhost:5000${user.avatar}`}
              alt="avatar"
            />
          ) : (
            <span>{user.username?.[0]?.toUpperCase()}</span>
          )}
        </div>

        <div className="profile-info">
          <h2>{user.username}</h2>
          <p className="email">{user.email}</p>

          <div className="stats">
            <div>
              <strong>{posts.length}</strong>
              <span>Posts</span>
            </div>

            <div>
              <strong>143</strong>
              <span>Followers</span>
            </div>

            <div>
              <strong>{user.likesCount ?? 0}</strong>
              <span>Likes</span>
            </div>
          </div>

          <Link to="/profile/edit" className="edit-profile-btn">
            Edit profile
          </Link>
        </div>
      </div>

      {/*  POSTS  */}
      <h3 className="section-title">My posts</h3>

      {posts.length === 0 && <p>You have no posts yet</p>}

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post._id}>
            <PostCard post={post} />

            <div className="post-actions">
              <Link to={`/edit/${post._id}`} className="edit-btn">
                Edit
              </Link>

              <button
                className="delete-btn"
                onClick={() => deletePost(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
