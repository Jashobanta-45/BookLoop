import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  bookName: "",
  author: "",
  price: "",
  condition: "",
  category: "",
  description: "",
  image: null,
};

export default function SellBook() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!form.bookName.trim()) e.bookName = "Book name is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Enter a valid price";
    if (!form.condition) e.condition = "Select a condition";
    if (!form.category) e.category = "Select a category";
    return e;
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setForm((f) => ({ ...f, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="sell-page">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Book Listed Successfully!</h2>
          <p>Your book <strong>{form.bookName}</strong> has been listed for ₹{form.price}.</p>
          <p className="success-sub">Buyers can now find and contact you.</p>
          <div className="success-actions">
            <button className="btn-primary" onClick={() => navigate("/dashboard")}>View Dashboard</button>
            <button className="btn-outline" onClick={() => { setForm(initialForm); setSubmitted(false); setImagePreview(null); }}>
              List Another
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="sell-page">
      <div className="sell-container">
        <div className="sell-header">
          <h1 className="sell-title">Sell Your Book</h1>
          <p className="sell-sub">Fill in the details below and list your book in minutes</p>
        </div>

        <form className="sell-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Book Name *</label>
              <input
                type="text"
                name="bookName"
                placeholder="e.g. Introduction to Algorithms"
                value={form.bookName}
                onChange={handleChange}
                className={errors.bookName ? "input-error" : ""}
              />
              {errors.bookName && <span className="error-msg">{errors.bookName}</span>}
            </div>
            <div className="form-group">
              <label>Author *</label>
              <input
                type="text"
                name="author"
                placeholder="e.g. Thomas H. Cormen"
                value={form.author}
                onChange={handleChange}
                className={errors.author ? "input-error" : ""}
              />
              {errors.author && <span className="error-msg">{errors.author}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 250"
                value={form.price}
                onChange={handleChange}
                className={errors.price ? "input-error" : ""}
              />
              {errors.price && <span className="error-msg">{errors.price}</span>}
            </div>
            <div className="form-group">
              <label>Condition *</label>
              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                className={errors.condition ? "input-error" : ""}
              >
                <option value="">Select condition</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
              {errors.condition && <span className="error-msg">{errors.condition}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={errors.category ? "input-error" : ""}
            >
              <option value="">Select category</option>
              <option value="Engineering">Engineering</option>
              <option value="School">School</option>
              <option value="Competitive">Competitive</option>
              <option value="Novels">Novels</option>
            </select>
            {errors.category && <span className="error-msg">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Brief description of the book's condition, edition, etc."
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Book Image</label>
            <div className="upload-area">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => { setImagePreview(null); setForm((f) => ({ ...f, image: null })); }}
                  >
                    ✕ Remove
                  </button>
                </div>
              ) : (
                <label className="upload-label">
                  <span className="upload-icon">📷</span>
                  <span>Click to upload image</span>
                  <span className="upload-hint">PNG, JPG up to 5MB</span>
                  <input type="file" name="image" accept="image/*" onChange={handleChange} hidden />
                </label>
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary btn-full">
            List Book for Sale
          </button>
        </form>
      </div>
    </main>
  );
}
