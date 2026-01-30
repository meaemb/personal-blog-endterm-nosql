import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    api.get("/auth/me").then(res => {
      setUsername(res.data.username);
      if (res.data.avatar) {
        setPreview(`http://localhost:5000${res.data.avatar}`);
      }
    });
  }, []);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    if (avatar) formData.append("avatar", avatar);

    await api.put("/auth/me", formData);
    window.location.href = "/profile";
  };

  return (
    <div className="edit-profile-page">
      <form onSubmit={submitHandler} className="edit-profile-card">
        <h2>Edit profile</h2>

        <label className="avatar-wrapper">
          {preview ? (
            <img src={preview} alt="avatar" />
          ) : (
            <div className="avatar-placeholder">
              {username[0]?.toUpperCase()}
            </div>
          )}
          <input type="file" hidden accept="image/*" onChange={handleAvatar} />
          <span className="avatar-hint">Click to change</span>
        </label>

        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />

        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
