import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import AddCompanyModal from './components/AddCompanyModal';
import AddReviewModal from './components/AddReviewModal';
import * as api from './services/api';

function App() {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [reviewSortBy, setReviewSortBy] = useState('recent');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load companies on mount
  useEffect(() => {
    loadCompanies();
  }, [searchQuery, cityFilter, sortBy]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const data = await api.fetchCompanies(searchQuery, cityFilter, sortBy);
      setCompanies(data);

      // Update selectedCompany if it exists to reflect latest ratings/counts
      if (selectedCompany) {
        const updated = data.find(c => c.id === selectedCompany.id);
        if (updated) setSelectedCompany(updated);
      }

      setError(null);
    } catch (err) {
      setError('Failed to load companies. Please make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique cities for filter
  const cities = Array.isArray(companies) ? [...new Set(companies.map(c => c.city).filter(Boolean))] : [];

  // Data is now filtered and sorted on the backend
  const sortedCompanies = Array.isArray(companies) ? companies : [];

  const handleAddCompany = async (companyData) => {
    try {
      await api.createCompany(companyData);
      loadCompanies();
      setShowAddCompanyModal(false);
    } catch (err) {
      alert('Failed to add company. Please try again.');
    }
  };

  const handleAddReview = async (reviewData) => {
    if (selectedCompany) {
      try {
        await api.createReview({
          ...reviewData,
          companyId: selectedCompany.id
        });
        loadCompanies();
        setShowAddReviewModal(false);
        // If we're in detail view, we might want to refresh reviews too
        // The CompanyDetail component will fetch its own reviews
      } catch (err) {
        alert('Failed to add review. Please try again.');
      }
    }
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handleBackToList = () => {
    setSelectedCompany(null);
    loadCompanies();
  };

  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {error && <div className="error-banner">{error}</div>}
      {loading && !companies.length ? (
        <div className="loader">Loading companies...</div>
      ) : selectedCompany ? (
        <CompanyDetail
          company={selectedCompany}
          onBack={handleBackToList}
          onAddReview={() => setShowAddReviewModal(true)}
          sortBy={reviewSortBy}
          onSortChange={setReviewSortBy}
        />
      ) : (
        <CompanyList
          companies={sortedCompanies}
          onCompanyClick={handleCompanyClick}
          onAddCompany={() => setShowAddCompanyModal(true)}
          cityFilter={cityFilter}
          onCityFilterChange={setCityFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          cities={cities}
        />
      )}

      <AddCompanyModal
        isOpen={showAddCompanyModal}
        onClose={() => setShowAddCompanyModal(false)}
        onAdd={handleAddCompany}
      />

      <AddReviewModal
        isOpen={showAddReviewModal}
        onClose={() => setShowAddReviewModal(false)}
        onAdd={handleAddReview}
        companyName={selectedCompany?.name}
      />
    </>
  );
}

export default App;
