import React from 'react';
import "../styles/Header.css";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <header className='header'>
        <div className='header-content flex flex-c text-center text-white'>
          <h2 className='header-title text-capitalize'>find your own ambience</h2>
          <br />
          <p className='header-text fs-18 fw-3'>
            "Good food is the foundation of genuine happiness. Indulge in every bite, savor every flavor, and let your taste buds explore a world of culinary delights."
          </p>

          {/* Search Box */}
          <div className='search-box'>
            <input
              type='text'
              placeholder='Search...'
              className='search-input'
              value={searchQuery} // Bind the input to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            />
            <button className='search-button'>Search</button> {/* Optional: You can remove this button if not needed */}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
