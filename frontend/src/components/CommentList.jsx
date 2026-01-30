import api from "../services/api";
import "./CommentList.css";

function CommentList({ comments, currentUserId, onDelete }) {
  if (comments.length === 0) {
    return <p className="no-comments">No comments yet</p>;
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;

    await api.delete(`/comments/${id}`);
    onDelete(id);
  };

  return (
    <div className="comments-list">
      {comments.map((c) => (
        <div className="comment-card" key={c._id}>
          <div className="comment-avatar">
            {c.user_id?.avatar ? (
              <img
                src={`http://localhost:5000${c.user_id.avatar}`}
                alt="avatar"
              />
            ) : (
              c.user_id?.username?.[0]?.toUpperCase()
            )}
          </div>

          <div className="comment-body">
            <div className="comment-header">
              <span className="comment-author">
                {c.user_id?.username || "Unknown"}
              </span>

              {c.user_id?._id === currentUserId && (
                <button
                  className="comment-delete"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </button>
              )}
            </div>

            <div className="comment-text">{c.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
