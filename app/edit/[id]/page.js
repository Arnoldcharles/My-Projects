"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPage({ params }) {
  const router = useRouter();
  const { id } = params;

  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    link: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("my-projects")) || [];
    const project = stored.find((p) => p.id == id);

    if (project) {
      setForm(project);
      setPreview(project.image);
    } else {
      router.push("/");
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem("my-projects")) || [];
    const updated = all.map((p) => (p.id == id ? form : p));
    localStorage.setItem("my-projects", JSON.stringify(updated));
    router.push("/");
  };

  return (
    <main className="container">
      <h1>✏️ Edit Project</h1>

      <form onSubmit={handleUpdate} className="form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Short description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="tech"
          placeholder="Tech used"
          value={form.tech}
          onChange={handleChange}
          required
        />
        <input
          name="link"
          placeholder="Project link"
          value={form.link}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {preview && <img src={preview} alt="Preview" className="preview" />}

        <button type="submit">Update</button>
      </form>
    </main>
  );
}
