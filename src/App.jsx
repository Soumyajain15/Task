import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import AddCompanyModal from './components/AddCompanyModal';
import AddReviewModal from './components/AddReviewModal';
import {
  getCompanies,
  addCompany as saveCompany,
  addReview as saveReview,
  initializeSampleData,
  calculateAverageRating
} from './utils/storage';

function App() {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [reviewSortBy, setReviewSortBy] = useState('recent');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  // Load companies on mount
  useEffect(() => {
    initializeSampleData();
    loadCompanies();
  }, []);

  const loadCompanies = () => {
    const loadedCompanies = getCompanies();
    setCompanies(loadedCompanies);
  };

  // Get unique cities for filter
  const cities = [...new Set(companies.map(c => c.city).filter(Boolean))];

  // Filter companies
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !cityFilter || company.city === cityFilter;
    return matchesSearch && matchesCity;
  });

  // Sort companies
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'average':
        return parseFloat(calculateAverageRating(b.id)) - parseFloat(calculateAverageRating(a.id));
      case 'rating':
        return parseFloat(calculateAverageRating(b.id)) - parseFloat(calculateAverageRating(a.id));
      case 'location':
        return a.location.localeCompare(b.location);
      default:
        return 0;
    }
  });

  const handleAddCompany = (companyData) => {
    const newCompany = saveCompany(companyData);
    loadCompanies();
  };

  const handleAddReview = (reviewData) => {
    if (selectedCompany) {
      saveReview({
        ...reviewData,
        companyId: selectedCompany.id
      });
      loadCompanies();
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

      {selectedCompany ? (
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
