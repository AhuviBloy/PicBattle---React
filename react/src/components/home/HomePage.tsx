import { Button } from "@mui/material";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Footer from "./Footer";


// Assuming you'll fetch these from an API later
const topChallenges = [
  {
    id: 1,
    title: "Cosmic Dreams",
    author: "StarGazer",
    votes: 342,
    imageUrl: "https://ahuvi-new.s3.us-east-1.amazonaws.com/Leonardo_Phoenix_10_updatedprompta_highly_detailed_dreamlike_a_3.jpg",
  },
  {
    id: 2,
    title: "Galaxy Explorer",
    author: "NebulaNomad",
    votes: 287,
    imageUrl: "https://ahuvi-new.s3.us-east-1.amazonaws.com/1740863620627.png",
  },
  {
    id: 3,
    title: "Stellar Journey",
    author: "CosmicCreator",
    votes: 256,
    imageUrl: "https://ahuvi-new.s3.us-east-1.amazonaws.com/1740932605700.png",
  },
  {
    id: 4,
    title: "Beyond the Stars",
    author: "AstralArtist",
    votes: 214,
    imageUrl: "https://ahuvi-new.s3.us-east-1.amazonaws.com/Leonardo_Phoenix_10_A_magical_and_ethereal_painting_of_a_littl_1.jpg",
  },
  
];

const stats = [
  { value: 14520, label: "Users", suffix: "+" },
  { value: 32800, label: "Submissions", suffix: "+" },
  { value: 1250, label: "Challenges", suffix: "+" },
  { value: 5800, label: "Votes Cast", suffix: "M+" },
];

const featuredPhotographers = [
  {
    name: "Alex Morgan",
    specialty: "Landscape & Nature",
    followers: 8742,
    imageUrl: "https://ahuvi-new.s3.us-east-1.amazonaws.com/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202025-04-28%20020305.png",
    achievements: ["Photo of the Month", "Rising Star Award"],
  },
  {
    name: "Sophia Chen",
    specialty: "Portrait Photography",
    followers: 12350,
    imageUrl: "https://ahuvi-new.s3.us-east-1.amazonaws.com/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202025-04-28%20020305.png",
    achievements: ["Best Portrait 2023", "Community Choice"],
  },
  {
    name: "Marcus James",
    specialty: "Urban & Street",
    followers: 6891,
    imageUrl: "https://ahuvi-new.s3.us-east-1.amazonaws.com/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202025-04-28%20020305.png",
    achievements: ["Street Scene Master", "Technical Excellence"],
  },
];

const HomePage= () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFeatured, setActiveFeatured] = useState(0);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Handle stats counting animation when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Start counter animation when stats section becomes visible
  useEffect(() => {
    if (!statsVisible) return;

    const duration = 2000; // animation duration in ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    const timer = setInterval(() => {
      if (frame === totalFrames) {
        clearInterval(timer);
        setCounters(stats.map((stat) => stat.value));
        return;
      }

      frame++;
      const progress = frame / totalFrames;

      setCounters(stats.map((stat) => Math.floor(stat.value * progress)));
    }, frameDuration);

    return () => clearInterval(timer);
  }, [statsVisible]);

  // Auto-rotate featured challenges
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveSlide((prev) => (prev + 1) % topChallenges.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);


  // Auto-rotate featured photographers
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatured((prev) => (prev + 1) % featuredPhotographers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (   
    <div className="home-page-container">
       {/* <CardItem/> */}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="stars-container">
          <div className="star star1"></div>
          <div className="star star2"></div>
          <div className="star star3"></div>
          <div className="orbit orbit1"></div>
          <div className="orbit orbit2"></div>
          <div className="shooting-star"></div>
        </div>

        <div className="hero-content">
          <div className="hero-buttons">
            <Button
              className="start-button primary-button"
              onClick={() => navigate("/challengeList")}
            >
              Get Started
            </Button>
            <Button
              className="learn-button secondary-button"
              onClick={() => {
                const aboutSection = document.getElementById("about");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Challenges Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Challenges</h2>
          <p>The most popular battles happening right now</p>
        </div>

        <div className="challenge-carousel">
          <div
            className="carousel-container"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {topChallenges.map((challenge, index) => (
              <div key={challenge.id} className="challenge-card">
                <div className="challenge-image-container">
                  <div
                    className="challenge-image"
                    style={{
                      backgroundImage: challenge.imageUrl
                        ? `url(${challenge.imageUrl})`
                        : "linear-gradient(135deg, #8fabff, #a78fff)",
                    }}
                  ></div>
                </div>
                <div className="challenge-info">
                  <h3>{challenge.title}</h3>
                  <p>Created by {challenge.author}</p>
                  <div className="challenge-votes">
                    <span className="vote-icon">★</span>
                    <span className="vote-count">{challenge.votes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="carousel-controls">
            {topChallenges.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === activeSlide ? "active" : ""
                }`}
                onClick={() => setActiveSlide(index)}
              ></button>
            ))}
          </div> */}
        </div>

        <Button
          className="view-all-button secondary-button"
          onClick={() => navigate("/challengeList")}
        >
          View All Challenges
        </Button>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-header">
          <h2>About PicBattle</h2>
          <p>Where creativity meets community</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              PicBattle is more than just a photo competition platform – it's a
              creative community where photographers and visual artists from
              around the world come together to challenge themselves and inspire
              others.
            </p>
            <p>
              Our unique battle format lets creators showcase their work,
              receive feedback, and compete for recognition in a supportive and
              engaging environment.
            </p>
            <p>
              Whether you're a seasoned professional or just beginning your
              creative journey, PicBattle provides the perfect space to grow
              your skills, connect with fellow artists, and push the boundaries
              of visual expression.
            </p>
          </div>

          <div className="about-features">
            <div className="feature">
              <div className="feature-icon star-icon"></div>
              <h3>Weekly Challenges</h3>
              <p>Fresh themes every week to inspire your creativity</p>
            </div>
            <div className="feature">
              <div className="feature-icon community-icon"></div>
              <h3>Supportive Community</h3>
              <p>Connect with like-minded creators worldwide</p>
            </div>
            <div className="feature">
              <div className="feature-icon trophy-icon"></div>
              <h3>Win Recognition</h3>
              <p>Get your work featured and earn accolades</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="stats-section">
        <div className="stats-overlay"></div>
        <div className="stats-content">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item-home">
              <div className="stat-value">
                {counters[index].toLocaleString()}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Photographers Section (replacing Testimonials) */}
      <section className="featured-photographers-section">
        <div className="section-header">
          <h2>Featured Photographers</h2>
          <p>Discover the amazing talent in our community</p>
        </div>

        <div className="photographers-showcase">
          {featuredPhotographers.map((photographer, index) => (
            <div
              key={index}
              className={`photographer-card ${
                index === activeFeatured ? "active" : ""
              }`}
            >
              <div
                className="photographer-image"
                style={{
                  backgroundImage: photographer.imageUrl
                    ? `url(${photographer.imageUrl})`
                    : "linear-gradient(135deg, #8fabff, #a78fff)",
                }}
              ></div>
              <div className="photographer-info">
                <h3>{photographer.name}</h3>
                <p className="photographer-specialty">
                  {photographer.specialty}
                </p>
                <div className="photographer-stats">
                  <div className="followers">
                    <span className="followers-icon">👥</span>
                    <span className="followers-count">
                      {photographer.followers.toLocaleString()} followers
                    </span>
                  </div>
                </div>
                <div className="achievements">
                  {photographer.achievements.map((achievement, i) => (
                    <span key={i} className="achievement-badge">
                      {achievement}
                    </span>
                  ))}
                </div>
                {/* <Button
                  className="view-profile-button secondary-button "
                  onClick={() =>
                    navigate(
                      `/profile/${photographer.name
                        .toLowerCase()
                        .replace(" ", "-")}`
                    )
                  }
                >
                  View Profile
                </Button> */}
              </div>
            </div>
          ))}

          <div className="photographers-controls">
            {featuredPhotographers.map((_, index) => (
              <button
                key={index}
                className={`photographer-dot ${
                  index === activeFeatured ? "active" : ""
                }`}
                onClick={() => setActiveFeatured(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
};

export default HomePage;
