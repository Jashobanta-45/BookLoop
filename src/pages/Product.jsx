import { useParams, useNavigate } from "react-router-dom";
import { books } from "../data/books";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="not-found">
        <h2>Book not found</h2>
        <button className="btn-primary" onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const conditionColor = { "Like New": "#D1FAE5", "Good": "#DBEAFE", "Fair": "#FEF3C7" };
  const conditionText = { "Like New": "#065F46", "Good": "#1D4ED8", "Fair": "#92400E" };

  return (
    <main className="product-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-container">
        <div className="product-image-wrap">
          <img src={book.image} alt={book.title} className="product-image" />
          <span
            className="condition-badge-lg"
            style={{
              background: conditionColor[book.condition] || "#F3F4F6",
              color: conditionText[book.condition] || "#374151",
            }}
          >
            {book.condition}
          </span>
        </div>

        <div className="product-details">
          <span className="product-category">{book.category}</span>
          <h1 className="product-title">{book.title}</h1>
          <p className="product-author">by {book.author}</p>

          <div className="product-price-box">
            <span className="product-price">₹{book.price}</span>
            <span className="product-price-note">Inclusive of all charges</span>
          </div>

          <p className="product-description">{book.description}</p>

          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Seller</span>
              <span className="meta-value">{book.seller}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Location</span>
              <span className="meta-value">{book.location}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Condition</span>
              <span className="meta-value">{book.condition}</span>
            </div>
          </div>

          <div className="product-actions">
            <button className="btn-primary btn-large">Buy Now — ₹{book.price}</button>
            <button className="btn-outline btn-large">Contact Seller</button>
          </div>
        </div>
      </div>

      <section className="related-section">
        <h2 className="section-title">More in {book.category}</h2>
        <div className="related-grid">
          {books
            .filter((b) => b.category === book.category && b.id !== book.id)
            .slice(0, 3)
            .map((b) => (
              <div
                key={b.id}
                className="related-card"
                onClick={() => navigate(`/product/${b.id}`)}
              >
                <img src={b.image} alt={b.title} className="related-image" />
                <div className="related-info">
                  <p className="related-title">{b.title}</p>
                  <p className="related-price">₹{b.price}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
