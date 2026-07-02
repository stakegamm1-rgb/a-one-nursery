import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    const otp = window.prompt("Enter Admin PIN:");
    if (otp === "4589") {
      navigate('/admin');
    } else if (otp !== null) {
      alert("Invalid PIN");
    }
  };

  return (
    <div className="page-transition">
      <section style={{ 
        padding: '120px 0 100px 0', 
        background: 'linear-gradient(135deg, #f0fff4 0%, #d4edda 50%, #c3e6cb 100%)', 
        position: 'relative', 
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Floating Background Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '15%', left: '5%', fontSize: '120px', opacity: 0.1, zIndex: 0 }}
        >🌿</motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -15, 0], rotate: [0, -15, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '15%', right: '5%', fontSize: '150px', opacity: 0.1, zIndex: 0 }}
        >🌱</motion.div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', textAlign: 'center' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', fontSize: '16px' }}>About A One Nursery</h4>
            <h2 style={{ fontSize: '3rem', color: 'var(--dark-green)', marginBottom: '30px', lineHeight: 1.2, fontWeight: 800 }}>
              Rooted in <span style={{ background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Passion</span>,<br/>Growing with You.
            </h2>
            
            <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', lineHeight: 1.8, marginBottom: '20px', maxWidth: '800px', margin: '0 auto 20px auto' }}>
              At <strong>A One Nursery</strong>, our passion for nature drives everything we do. For over a decade, we have been dedicated to cultivating <span style={{ color: 'var(--dark-green)', fontWeight: 'bold' }}>high-quality, healthy plants</span> that bring life, joy, and fresh air into your personal spaces.
            </p>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--text-dark)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px auto' }}>
              We believe in <strong>sustainable gardening practices</strong> and eco-friendly growing. Whether you're a seasoned botanist or a curious beginner, our expert team is here to provide unparalleled plant care guidance, ensuring your green companions thrive. With our secure packaging and fast delivery, customer satisfaction is guaranteed.
            </p>

            {/* Feature Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '50px' }}>
              {[
                { icon: '🪴', title: 'Premium Quality' },
                { icon: '🌍', title: 'Eco-Friendly' },
                { icon: '👨‍🌾', title: 'Expert Support' },
                { icon: '📦', title: 'Secure Packaging' }
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.5)' }}>
                  <div style={{ width: '60px', height: '60px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    {feat.icon}
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--dark-green)', fontSize: '16px' }}>{feat.title}</span>
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '50px' }}>
              {[
                { icon: '🌿', title: '20,000+', desc: 'Happy Customers' },
                { icon: '🌱', title: '500+', desc: 'Plant Varieties' },
                { icon: '🚚', title: 'Fast', desc: 'Delivery Across India' },
                { icon: '⭐', title: '4.9/5', desc: 'Average Rating' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(46,125,50,0.15)', background: '#f8fff9' }}
                  style={{ background: 'white', padding: '20px 30px', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(46,125,50,0.05)', flex: '1 1 200px' }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>{stat.icon}</div>
                  <h4 style={{ margin: 0, fontSize: '24px', color: 'var(--dark-green)', fontWeight: '900' }}>{stat.title}</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-dark)', fontWeight: '500' }}>{stat.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Action Button */}
            <Link to="/shop" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(46, 125, 50, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  color: 'white',
                  border: 'none',
                  padding: '18px 40px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px rgba(46, 125, 50, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                Explore Our Collection <span style={{ fontSize: '20px' }}>→</span>
              </motion.button>
            </Link>

          </motion.div>

          {/* Hidden Admin Trigger */}
          {/* <div 
            onClick={handleAdminAccess}
            style={{ 
              marginTop: '60px',
              fontSize: '11px',
              color: 'var(--dark-green)',
              opacity: 0.3,
              cursor: 'pointer',
              display: 'inline-block'
            }}
          >
            Add
          </div> */}

        </div>
      </section>
    </div>
  );
};

export default About;

