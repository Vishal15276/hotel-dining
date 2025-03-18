import React from 'react';
 // Link to the CSS file for styling

const About = () => {
  return (
    <section className="about-container">
      <div className="about-header">
        <h1>About Freency Dine-In</h1>
        <p>Your Premier Dining Destination</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            Welcome to Freency Dine-In, where exquisite flavors meet a cozy ambiance. 
            We are a premier dining destination committed to offering you the finest culinary experience, 
            blending traditional recipes with modern flair.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Freency Dine-In was born out of a passion for creating memorable dining experiences. 
            Established in [Year], we have been serving the community with dishes crafted from 
            the freshest ingredients, combining the best of local and international flavors.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission and Values</h2>
          <p>
            At Freency Dine-In, our mission is to provide not only delicious food but also a space 
            where family and friends can come together and enjoy unforgettable moments. We believe in 
            quality, sustainability, and creating a welcoming environment for all our guests.
          </p>
        </section>

        <section className="about-section">
          <h2>The Experience</h2>
          <p>
            Our menu offers a wide array of dishes inspired by both local and international cuisines, 
            carefully curated to suit a variety of tastes. Whether you're here for a casual dinner, a 
            celebration, or a quick bite, Freency Dine-In is the place to be.
          </p>
        </section>
      </div>
    </section>
  );
}

export default About;
