import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>MyWebsite</div>
        <nav style={styles.nav}>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </nav>
      </header>
      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Lorem Ipsum</h1>
            <p style={styles.heroText}>
             Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <Link to="/login" style={styles.heroButton}>Login</Link>
            
            <Link to="/register" style={styles.heroButton}>Register</Link>
          </div>
        </section>
        <section style={styles.features}>
          <h3 style={styles.featuresTitle}>Our Key Features</h3>
          <div style={styles.featureCards}>
            <div style={styles.featureCard}>
              <h4>🌟 High-Quality Service</h4>
              <p>Exceptional service tailored to meet your needs.</p>
            </div>
            <div style={styles.featureCard}>
              <h4>💼 Professional Support</h4>
              <p>Our experts are here to assist you every step of the way.</p>
            </div>
            <div style={styles.featureCard}>
              <h4>🚀 Fast and Reliable</h4>
              <p>Experience seamless solutions that get you results quickly.</p>
            </div>
          </div>
        </section>
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2024 MyWebsite. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    color: '#333',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 50px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#ecf0f1',
  },
  main: {
    padding: '40px 50px',
    backgroundColor: '#f4f6f7',
  },
  hero: {
    backgroundColor: '#3498db',
    color: '#fff',
    borderRadius: '8px',
    padding: '50px 30px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    marginBottom: '40px',
  },
  heroContent: {
    maxWidth: '700px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '20px',
  },
  heroText: {
    fontSize: '18px',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  heroButton: {
    padding: '15px 30px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
  },
  heroButtonHover: {
    backgroundColor: '#1a242f',
  },
  features: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  featuresTitle: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '30px',
  },
  featureCards: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    flex: 1,
    transition: 'transform 0.3s ease',
  },
  featureCardHover: {
    transform: 'translateY(-5px)',
  },
  footer: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#2c3e50',
    color: '#fff',
    marginTop: '50px',
  },
};

export default Homepage;
