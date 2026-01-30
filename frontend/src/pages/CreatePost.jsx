import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./CreatePost.css";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput)) return;
    setTags([...tags, tagInput]);
    setTagInput("");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags));
    if (image) formData.append("image", image);

    try {
      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (e) {
      alert("Failed to create post");
    }
  };

  return (
    <div className="create-page">
      <h1>Create post</h1>

      <form onSubmit={submitHandler} className="create-card">
        {/* IMAGE */}
        <label className="image-upload">
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <span>➕ Add image</span>
          )}
          <input type="file" accept="image/*" hidden onChange={handleImage} />
        </label>

        {/* TITLE */}
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* CONTENT */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {/* TAGS */}
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag} onClick={() => setTags(tags.filter(t => t !== tag))}>
              #{tag} ✕
            </span>
          ))}
        </div>

        {/* TAG INPUT */}
        <div className="tag-input">
          <input
            placeholder="Add tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button type="button" onClick={addTag}>
            +
          </button>
        </div>

        {/* SUBMIT */}
        <button type="submit">Create post</button>
      </form>
    </div>
  );
}

export default CreatePost;
