import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { FaUpload, FaPlus, FaCheck, FaTrash } from 'react-icons/fa';

const Admin = () => {
  const { products, addProduct, deleteProduct } = useProducts();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discountPrice: '',
    category: 'Indoor',
    badge: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setError(''); // clear error if image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      setError("Please select a product image before publishing.");
      return;
    }
    setError('');
    
    addProduct({
      ...formData,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      image: formData.image || "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // fallback image
    });

    setSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Redirect to the shop page with the category filter after 1.5s
    setTimeout(() => {
      setSuccess(false);
      window.location.href = '/shop?category=' + formData.category;
    }, 1500);

    // Keep form data just in case they go back
  };

  return (
    <div className="page-transition" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '60px' }}>
        
        <h1 style={{ fontSize: '2.5rem', color: 'var(--dark-green)', marginBottom: '30px', fontWeight: 800, textAlign: 'center' }}>
          Admin Panel
        </h1>
        
        <div style={{ background: 'white', borderRadius: '25px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', padding: '40px', border: '1px solid rgba(46, 125, 50, 0.1)' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
            <FaPlus color="var(--primary)" /> Add New Product
          </h2>
          
          {success && (
            <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '15px', borderRadius: '12px', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, border: '1px solid #c8e6c9' }}>
              <FaCheck /> Product added successfully! It is now visible on the website.
            </div>
          )}
          {error && (
            <div style={{ background: '#ffebee', color: '#c62828', padding: '15px', borderRadius: '12px', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, border: '1px solid #ffcdd2' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {/* Product Name */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
                  placeholder="e.g. Monstera Deliciosa"
                />
              </div>
              
              {/* Category */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '15px', outline: 'none', background: 'white' }}
                >
                  <option value="Indoor">Indoor</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Flower">Flower</option>
                  <option value="Medicinal">Medicinal</option>
                  <option value="Succulent">Succulent</option>
                  <option value="Fruit">Fruit</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>Regular Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
                  placeholder="0"
                />
              </div>

              {/* Discount Price */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>Discount Price (₹)</label>
                <input
                  type="number"
                  name="discountPrice"
                  min="0"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
                  placeholder="Leave blank if no discount"
                />
              </div>

              {/* Badge */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>Badge (Optional)</label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
                  placeholder="e.g. Best Seller, New Arrival"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div style={{ marginTop: '10px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>Product Image *</label>
              <div style={{ 
                border: '2px dashed #ccc', 
                borderRadius: '15px', 
                padding: '40px 20px', 
                textAlign: 'center',
                background: '#fafafa',
                position: 'relative'
              }}>
                {formData.image ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={formData.image} alt="Preview" style={{ height: '150px', objectFit: 'contain', borderRadius: '10px', marginBottom: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }} />
                    <button type="button" onClick={() => setFormData(prev => ({...prev, image: ''}))} style={{ background: 'none', border: 'none', color: '#e63946', cursor: 'pointer', fontWeight: 'bold' }}>
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <FaUpload size={40} color="#ccc" style={{ marginBottom: '15px' }} />
                    <label style={{ cursor: 'pointer', background: 'var(--primary)', color: 'white', padding: '10px 20px', borderRadius: '25px', fontWeight: 'bold', fontSize: '14px' }}>
                      Choose Image File
                      <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    </label>
                    <p style={{ fontSize: '12px', color: '#888', marginTop: '15px' }}>Supported: JPG, PNG, GIF</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                className="btn"
                disabled={success}
                style={{ padding: '16px 40px', fontSize: '16px', borderRadius: '15px', opacity: success ? 0.7 : 1 }}
              >
                {success ? 'Publishing...' : 'Publish Product'}
              </button>
            </div>
          </form>
        </div>

        {/* Product List Section */}
        <div style={{ background: 'white', borderRadius: '25px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', padding: '40px', border: '1px solid rgba(46, 125, 50, 0.1)', marginTop: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '25px', fontWeight: 700 }}>
            Manage Existing Products
          </h2>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            {products.map(product => (
              <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', border: '1px solid #eee', borderRadius: '15px', background: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--dark-green)', fontWeight: 600 }}>{product.name}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{product.category} • ₹{product.discountPrice || product.price}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if(window.confirm(`Are you sure you want to delete ${product.name}?`)) {
                      deleteProduct(product.id);
                    }
                  }}
                  style={{ background: '#ffebee', color: '#c62828', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                  title="Delete Product"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            
            {products.length === 0 && (
              <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>No products found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;

