# Company Review & Rating System

A modern React.js application for managing company profiles and reviews, built to match Figma design specifications.

![Review&RATE](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)
![Status](https://img.shields.io/badge/Status-Complete-success)

## 🚀 Quick Start

### Installation
```bash
cd c:\Users\MiC Computer\Downloads\task
npm install
```

### Development Server
```bash
npm run dev
```

Visit **http://localhost:5173/** to view the application.

## ✨ Features

### 1. Add Company
- Create new company profiles with complete information
- Fields: Name, Logo, Location, Founded Date, City
- Form validation and localStorage persistence
- Custom logo colors

### 2. Company Listing
- Grid layout with company cards
- **Search** by company name
- **Filter** by city
- **Sort** by Name, Average Rating, or Location
- Real-time result count

### 3. Add Review
- Submit reviews for any company
- Interactive star rating (1-5 stars)
- Fields: Reviewer Name, Subject, Review Text, Rating
- Reviews linked to specific companies

### 4. Review Listing
- View all reviews for a company
- Automatic average rating calculation
- Sort reviews by:
  - Most Recent
  - Highest Rating  
  - Lowest Rating
- Display reviewer avatars and dates

## 🎨 Design

Matches Figma specifications with:
- **Purple theme** (`#8B00FF`)
- **Yellow star ratings** (`#FFC107`)
- Modern Inter font
- Responsive grid layout
- Smooth animations
- Clean white cards with shadows

## 📁 Project Structure

```
src/
├── components/
│   ├── AddCompanyModal.jsx    # Company creation form
│   ├── AddReviewModal.jsx     # Review submission form
│   ├── CompanyCard.jsx        # Individual company card
│   ├── CompanyDetail.jsx      # Company detail page
│   ├── CompanyList.jsx        # Main listing page
│   ├── Header.jsx             # App header with search
│   ├── ReviewCard.jsx         # Individual review card
│   └── StarRating.jsx         # Reusable star rating
├── utils/
│   └── storage.js             # LocalStorage utilities
├── App.jsx                     # Main application
├── App.css                     # Global styles
└── main.jsx                    # Entry point
```

## 💾 Data Persistence

All data is stored in **localStorage**:
- Companies persist across sessions
- Reviews linked to companies
- Automatic average rating calculations
- Sample data included for testing

## 🧪 Testing

The application includes:
- 3 sample companies (can be modified/deleted)
- 2 sample reviews for testing
- Full CRUD operations for companies and reviews
- Real-time search and filtering
- Automatic rating calculations

### Manual Test Guide

See walkthrough.md in the artifacts folder for detailed testing instructions.

## 📋 Requirements Checklist

- ✅ Add Company with all fields
- ✅ Company listing with search and filters
- ✅ Click to view company details
- ✅ Add reviews with star ratings
- ✅ Review listing with sorting
- ✅ Average rating calculation
- ✅ Result count display
- ✅ Data persistence (localStorage)
- ✅ Figma design match

## 🛠 Built With

- **React 18** - UI framework
- **Vite 7.3** - Build tool
- **CSS3** - Styling
- **LocalStorage** - Data persistence
- **Google Fonts (Inter)** - Typography

## 📱 Responsive Design

Works on all screen sizes:
- Desktop (1400px max-width container)
- Tablet
- Mobile (responsive grid)

## 🎯 Key Components

### StarRating
Reusable component with display and interactive modes, supporting half-star ratings for averages.

### Storage Utilities
Complete CRUD operations:
- `getCompanies()` / `saveCompanies()`
- `addCompany()` / `deleteCompany()`
- `getReviews()` / `addReview()`
- `calculateAverageRating()`

### Form Validation
Both modals include validation to ensure all required fields are filled before submission.

## 📝 License

This is a personal project created for task demonstration.

---

**Ready to use!** Open http://localhost:5173/ to start exploring the application.
