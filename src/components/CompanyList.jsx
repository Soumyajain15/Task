import React from 'react';
import CompanyCard from './CompanyCard';

const CompanyList = ({
    companies,
    onCompanyClick,
    onAddCompany,
    cityFilter,
    onCityFilterChange,
    sortBy,
    onSortChange,
    cities
}) => {
    return (
        <div className="container">
            <div className="controls-bar">
                <div className="controls-left">
                    <div className="select-wrapper">
                        <span className="icon">📍</span>
                        <select
                            className="select-with-icon"
                            value={cityFilter}
                            onChange={(e) => onCityFilterChange(e.target.value)}
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <button className="btn btn-primary">Find Company</button>
                    <button className="btn btn-primary" onClick={onAddCompany}>+ Add Company</button>
                </div>

                <div className="controls-right">
                    <label htmlFor="sort-select" style={{ marginBottom: 0, marginRight: '8px' }}>Sort:</label>
                    <select
                        id="sort-select"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                    >
                        <option value="name">Name</option>
                        <option value="average">Average</option>
                        <option value="rating">Rating</option>
                        <option value="location">Location</option>
                    </select>
                </div>
            </div>

            <div className="result-text">
                Result Found: {companies.length}
            </div>

            {companies.length === 0 ? (
                <div className="empty-state">
                    <h3>No companies found</h3>
                    <p>Try adjusting your filters or add a new company</p>
                </div>
            ) : (
                <div className="companies-grid">
                    {companies.map(company => (
                        <CompanyCard
                            key={company.id}
                            company={company}
                            onClick={() => onCompanyClick(company)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompanyList;
