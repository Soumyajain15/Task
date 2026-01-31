import React from 'react';

const Header = ({ searchQuery, onSearchChange }) => {
    return (
        <header className="app-header">
            <div className="header-content">
                <a href="#" className="logo">
                    <div className="logo-icon">★</div>
                    <div className="logo-text">
                        Review<span className="highlight">&</span>RATE
                    </div>
                </a>

                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                <div className="auth-buttons">
                    <button className="btn btn-primary">SignUp</button>
                    <button className="btn btn-primary">Login</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
