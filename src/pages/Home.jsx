import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaUserCircle, FaLeaf, FaSeedling, FaTree, FaAppleAlt, FaQuoteLeft, FaWhatsapp } from 'react-icons/fa';
import { customerReviews } from '../data/reviews';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import heroVideo from '../assets/video.mp4';
import meImage from '../assets/me.png';

const Home = () => {
  const { products: plants } = useProducts();
  const leafVariants = {
    animate: {
      y: ["-20px", "20px"],
      x: ["-15px", "15px"],
      rotate: [0, 20, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section style={{
        height: '90vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2,
            filter: 'brightness(0.85)'
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(29, 92, 59, 0.4), rgba(46, 125, 50, 0.6))',
          zIndex: -1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.h1
            className="hero-h1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              fontSize: '5rem',
              fontWeight: 900,
              marginBottom: '10px',
              letterSpacing: '2px',
              background: 'linear-gradient(to right, #a8ff78, #78ffd6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
          >
            A ONE NURSERY
          </motion.h1>
          <motion.h3
            className="hero-h3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontSize: '2rem', color: 'var(--light-green)', marginBottom: '20px', fontWeight: 600, textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
          >
            Bringing Nature Home
          </motion.h3>
          <motion.p
            className="hero-p"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ fontSize: '1.2rem', color: 'white', marginBottom: '40px', fontWeight: 400, letterSpacing: '1px' }}
          >
            Healthy Plants • Fast Delivery • Premium Quality
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
          >
            <Link to="/shop" className="btn" style={{ padding: '16px 45px', fontSize: '18px', background: 'var(--accent)', color: 'white', border: 'none' }}>
              🌿 Shop Now
            </Link>
            <Link to="/about" className="btn btn-secondary" style={{ padding: '16px 45px', fontSize: '18px', background: 'white', color: 'black', border: 'none' }}>
              🌱 Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>



      {/* Categories Swiper */}
      <section style={{ padding: '60px 0', background: 'var(--background)' }}>
        <div className="container">
          <h2 className="title" style={{ marginBottom: '40px' }}>Shop By <span>Categories</span></h2>
          <div className="categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' }}>
            {[
              { name: 'Indoor Plants', icon: <FaSeedling size={36} color="var(--primary)" /> },
              { name: 'Outdoor Plants', icon: <FaTree size={36} color="var(--primary)" /> },
              { name: 'Fruits', icon: <FaAppleAlt size={36} color="var(--primary)" /> },
              { name: 'Succulents', icon: <FaLeaf size={36} color="var(--primary)" /> }
            ].map((cat, i) => (
              <Link to={`/shop?category=${cat.name === 'Fruits' ? 'Fruit' : cat.name.split(' ')[0]}`} key={i} style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  style={{
                    height: '220px',
                    borderRadius: '25px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(145deg, #ffffff, #f8fcf8)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    position: 'relative',
                    overflow: 'hidden',
                    gap: '15px'
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '6px', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}></div>
                  <div style={{ background: 'var(--background)', padding: '20px', borderRadius: '50%', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' }}>
                    {cat.icon}
                  </div>
                  <h3 style={{ color: 'var(--dark-green)', fontSize: '20px', fontWeight: 700 }}>{cat.name}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #ffffff 0%, #f4fff4 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background blob */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'linear-gradient(135deg, var(--light-green), transparent)', borderRadius: '50%', opacity: 0.1, filter: 'blur(40px)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}
            >
              <div style={{ position: 'relative', width: '320px', height: '320px' }}>
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', right: '-20px', bottom: '-20px', background: 'linear-gradient(45deg, var(--light-green), var(--accent))', borderRadius: '50%', zIndex: 0, animation: 'spin 12s linear infinite', opacity: 0.3 }}></div>
                <div style={{ position: 'absolute', top: '10px', right: '-30px', width: '100px', height: '100px', background: 'var(--background)', borderRadius: '50%', zIndex: 0 }}></div>
                <div style={{ position: 'absolute', bottom: '20px', left: '-40px', width: '80px', height: '80px', background: 'var(--accent)', borderRadius: '50%', zIndex: 0, opacity: 0.2 }}></div>

                <img
                  src={meImage}
                  alt="Ketan Pal - A One Nursery"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', position: 'relative', zIndex: 1, boxShadow: '0 25px 50px rgba(0,0,0,0.15)', border: '6px solid white' }}
                />

                {/* 10+ Years Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  style={{ position: 'absolute', bottom: '10px', right: '0px', background: 'white', padding: '15px', borderRadius: '50%', boxShadow: '0 15px 30px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '110px', height: '110px', zIndex: 2, border: '4px solid var(--background)' }}
                >
                  <span style={{ fontSize: '32px', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>10+</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dark)', textAlign: 'center', textTransform: 'uppercase', marginTop: '2px', letterSpacing: '0.5px' }}>Years<br />Exp.</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ flex: '1 1 500px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <span style={{ background: 'var(--background)', color: 'var(--primary)', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>Our Story</span>
              </div>

              <h2 className="mission-h2" style={{ fontSize: '2.8rem', color: 'var(--dark-green)', marginBottom: '20px', lineHeight: 1.2, fontWeight: 800 }}>Growing Happiness For <br /><span style={{ color: 'var(--primary)' }}>Over A Decade</span></h2>

              <p style={{ color: '#555', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '30px' }}>
                "Pichle 10 saalo se hum aapke gharon me nature aur hariaali laane ka kaam kar rahe hain. Our mission is to provide the highest quality, most beautiful plants to bring life, joy, and fresh air into your personal spaces."
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '35px' }}>
                <div style={{ background: 'linear-gradient(135deg, #ffffff, #f8fdf8)', padding: '20px', borderRadius: '15px', borderLeft: '5px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                  <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', padding: '10px', borderRadius: '10px', color: 'white' }}><FaSeedling size={24} /></div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.4rem', background: 'linear-gradient(90deg, var(--primary), var(--dark-green))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>10+ Years</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Of Green Expertise</p>
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #ffffff, #f8fdf8)', padding: '20px', borderRadius: '15px', borderLeft: '5px solid var(--accent)', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                  <div style={{ background: 'linear-gradient(135deg, var(--accent), var(--primary))', padding: '10px', borderRadius: '10px', color: 'white' }}><FaLeaf size={24} /></div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.4rem', background: 'linear-gradient(90deg, var(--accent), var(--dark-green))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>10k+</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Happy Customers</p>
                  </div>
                </div>
              </div>

              <div className="mission-card" style={{
                padding: '25px',
                background: 'linear-gradient(135deg, #ffffff 40%, #e8f5e9 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--dark-green))', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold', flexShrink: 0, boxShadow: '0 5px 15px rgba(46, 125, 50, 0.3)' }}>KP</div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--dark-green)', margin: '0 0 5px 0' }}>Ketan Pal</h3>
                  <p style={{ color: 'var(--primary)', fontSize: '1rem', margin: '0 0 10px 0', fontWeight: 'bold' }}>Founder & Head Botanist</p>
                  <div style={{ display: 'flex', gap: '15px', color: '#555', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaWhatsapp color="#25D366" size={18} /> 9588705078</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>📍 Barasat, WB</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="container">
          <h2 className="title">Featured <span>Collections</span></h2>
          <motion.div
            className="products-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}
          >
            {plants.slice(0, 4).map((plant, index) => (
              <motion.div key={plant.id} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} style={{ height: '100%' }}>
                <ProductCard product={plant} />
              </motion.div>
            ))}
          </motion.div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/shop" className="btn btn-secondary" style={{ padding: '15px 40px', fontSize: '18px' }}>View All Collections</Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews - Infinite Marquee */}
      <section style={{ padding: '80px 0', background: 'var(--background)', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h2 className="title" style={{ margin: 0, textAlign: 'left', color: 'var(--dark-green)' }}>Customer <span>Reviews</span></h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '4rem', fontWeight: 900, margin: 0, color: 'var(--text-dark)', lineHeight: 1 }}>4.9</h2>
                <div>
                  <div style={{ display: 'flex', color: '#ffb703', fontSize: '20px', marginBottom: '5px' }}>
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar color="#ffb703" />
                  </div>
                  <span style={{ fontSize: '14px', color: '#888' }}>Based on 450+ reviews</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[5, 4, 3, 2, 1].map(star => {
                  let percentage = 0;
                  if (star === 5) percentage = 85;
                  if (star === 4) percentage = 10;
                  if (star === 3) percentage = 3;
                  if (star === 2) percentage = 2;
                  if (star === 1) percentage = 0;

                  return (
                    <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#666' }}>
                      <span style={{ width: '10px' }}>{star}</span>
                      <FaStar color="#ffb703" size={12} />
                      <div style={{ flex: 1, height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${percentage}%`, height: '100%', background: '#ffb703', borderRadius: '4px' }}></div>
                      </div>
                      <span style={{ width: '30px', textAlign: 'right' }}>{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '15px', color: 'var(--dark-green)' }}>We promise 100% Satisfaction</h3>
              <p style={{ color: 'var(--text-dark)', lineHeight: 1.6, fontSize: '16px' }}>
                Every plant from A One Nursery is hand-picked, thoroughly inspected, and securely packed. Hundreds of customers have trusted us to bring greenery into their lives. Read what they have to say below!
              </p>
            </div>
          </div>
        </div>

        {/* We use a CSS animation for a true infinite marquee */}
        <div className="marquee-container" style={{ display: 'flex', gap: '30px', padding: '10px 0' }}>
          <div className="marquee-track" style={{ display: 'flex', gap: '30px', animation: 'scroll 60s linear infinite' }}>
            {/* Render Reviews Twice to create the infinite loop effect */}
            {[...customerReviews, ...customerReviews].map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                style={{
                  flexShrink: 0,
                  width: '320px',
                  background: 'white',
                  padding: '25px',
                  borderRadius: '20px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <FaUserCircle size={40} color="#ccc" />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--dark-green)' }}>{review.name}</h4>
                      <span style={{ fontSize: '12px', color: '#888' }}>{review.location}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', color: '#ffb703', fontSize: '12px' }}>
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-dark)', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Inject Marquee CSS */}
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-320px * 40 - 30px * 40)); }
          }
          .marquee-container:hover .marquee-track {
            animation-play-state: paused !important;
          }
        `}</style>
      </section>
    </div>
  );
};

export default Home;
