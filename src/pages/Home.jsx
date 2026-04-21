import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../Components/BookCard";
import { books, categories } from "../data/books";

export default function Home({ searchQuery }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filtered = books.filter((book) => {
    const matchesCategory = activeCategory === "All" || book.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Trusted by 10,000+ students</span>
          <h1 className="hero-heading">
            Buy &amp; Sell Used Books <span className="hero-highlight">Easily</span>
          </h1>
          <p className="hero-sub">
            Find affordable textbooks, novels, and study material. Save money, help others learn.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/sell")}>
              Start Selling
            </button>
            <button
              className="btn-outline"
              onClick={() => document.getElementById("books").scrollIntoView({ behavior: "smooth" })}
            >
              Browse Books
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>8,500+</strong><span>Books Listed</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>4,200+</strong><span>Happy Buyers</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>₹12L+</strong><span>Saved</span></div>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Books"
          />
        </div>
      </section>

      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-sub">Find books that match your needs</p>
        </div>
        <div className="categories-grid">
          <button
            className={`category-card ${activeCategory === "All" ? "category-active" : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            <span className="category-icon">📚</span>
            <span>All Books</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`category-card ${activeCategory === cat.name ? "category-active" : ""}`}
              style={
                activeCategory === cat.name
                  ? { background: cat.color, color: cat.textColor, borderColor: cat.textColor }
                  : {}
              }
              onClick={() => setActiveCategory(cat.name)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="books-section" id="books">
        <div className="section-header">
          <h2 className="section-title">
            {activeCategory === "All" ? "Featured Books" : activeCategory}
            <span className="books-count">{filtered.length} books</span>
          </h2>
        </div>
        {filtered.length > 0 ? (
          <div className="books-grid">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="empty-icon">🔍</p>
            <h3>No books found</h3>
            <p>Try a different search or category</p>
          </div>
        )}
      </section>
    </main>
  );
}
