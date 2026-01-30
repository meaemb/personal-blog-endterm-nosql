import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CommentList from "../components/CommentList";
import "./PostDetails.css";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  // 👉 загрузка поста + комментариев
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await api.get(`/posts/${id}`);
        setPost(postRes.data);

        const commentsRes = await api.get(`/comments/post/${id}`);
        setComments(commentsRes.data);
      } catch (e) {
        console.error("Failed to load post", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 👉 загрузка текущего пользователя
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setCurrentUserId(res.data._id))
      .catch(() => setCurrentUserId(null));
  }, []);

  // 👉 добавление комментария
  const addComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await api.post("/comments", {
        post_id: id,
        content: text,
      });

      setComments((prev) => [res.data, ...prev]);
      setText("");
    } catch (e) {
      alert("Error adding comment");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="post-details-page">
      <h1>{post.title}</h1>
      <p className="post-content">{post.content}</p>

      <h3 className="comments-title">Comments</h3>

      <CommentList
        comments={comments}
        currentUserId={currentUserId}
        onDelete={(id) =>
          setComments((prev) => prev.filter((c) => c._id !== id))
        }
      />

      <form className="comment-form" onSubmit={addComment}>
        <textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add comment</button>
      </form>
    </div>
  );
}

export default PostDetails;
