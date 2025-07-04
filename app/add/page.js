"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    link: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem("my-projects")) || [];
    const newProject = { ...form, id: Date.now() };
    localStorage.setItem("my-projects", JSON.stringify([...all, newProject]));
    router.push("/");
  };

  return (
    <main className="container">
      <h1>➕ Add Project</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Short description"
          required
          onChange={handleChange}
        />
        <input
          name="tech"
          placeholder="Tech used (React, CSS...)"
          required
          onChange={handleChange}
        />
        <input
          name="link"
          placeholder="Project link (optional)"
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setForm({ ...form, image: reader.result });
                setPreview(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {preview && <img src={preview} className="preview" />}
        <button type="submit">Save Project</button>
      </form>
    </main>
  );
}
