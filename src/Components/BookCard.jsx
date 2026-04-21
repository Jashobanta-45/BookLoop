import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
  const navigate = useNavigate();

  const conditionColor = {
    "Like New": "#D1FAE5",
    "Good": "#DBEAFE",
    "Fair": "#FEF3C7",
  };

  const conditionText = {
    "Like New": "#065F46",
    "Good": "#1D4ED8",
    "Fair": "#92400E",
  };

  return (
    <div className="book-card" onClick={() => navigate(`/product/${book.id}`)}>
      <div className="book-card-image">
        <img src={book.image} alt={book.title} />
        <span
          className="condition-badge"
          style={{
            background: conditionColor[book.condition] || "#F3F4F6",
            color: conditionText[book.condition] || "#374151",
          }}
        >
          {book.condition}
        </span>
      </div>
      <div className="book-card-body">
        <span className="book-category">{book.category}</span>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <div className="book-card-footer">
          <span className="book-price">₹{book.price}</span>
          <button
            className="btn-buy"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${book.id}`);
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
