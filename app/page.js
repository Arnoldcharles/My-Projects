"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("my-projects")) || [];
    setProjects(stored);
  }, []);

  const categories = [
    "All",
    ...new Set(projects.map((p) => p.tech.split(",")[0].trim())),
  ];

  const deleteProject = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    localStorage.setItem("my-projects", JSON.stringify(updated));
    setProjects(updated);
  };

  return (
    <main className="container">
      <h1>📁 My Projects</h1>

      <Link href="/add" className="add-btn">
        + Add Project
      </Link>

      {projects.length === 0 && <p>No projects yet</p>}

      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {projects
          .filter((p) => filter === "All" || p.tech.includes(filter))
          .map((p) => (
            <div key={p.id} className="project-card">
              <img src={p.image || "/default.png"} alt={p.title} />
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <small>{p.tech}</small>
              <div className="actions">
                <a href={p.link} target="_blank">
                  🔗 View
                </a>
                <Link href={`/edit/${p.id}`}>✏️ Edit</Link>
                <button onClick={() => deleteProject(p.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
