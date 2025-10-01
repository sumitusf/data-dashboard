#  County Indicators Dashboard

This project is a React-based Data Dashboard that visualizes county-level economic and demographic indicators (e.g., Unemployment Rate, Median Household Income, Population).  

It includes interactive charts, tables, and comparison panels, with filtering options by region, indicator, and year range.

---

##  Features
-  **Filters Panel**
  - Select a county/region
  - Choose an indicator (e.g., unemployment, income, housing prices)
  - Set a **year range** filter (e.g., 2010–2025)

-  **Interactive Chart**
  - Line chart showing indicator trends over time
  - Year displayed on the X-axis
  - Styled with USF colors (Green, Gold, Grey)

-  **Data Table**
  - Horizontal table of indicator values
  - Easy year-to-year comparison

-  **Compare Panel**
  - Compare multiple counties for a selected indicator
  - Supports year-range filtering
  - Interactive legend & tooltips

-  **Modern UI**
  - Built with Material-UI (MUI v5)
  - Fixed navigation bar to jump between **Chart**, **Table**, and **Compare**

---

##  Tech Stack
- **Frontend**: React 
- **UI Framework**: Material-UI (MUI v5)
- **Charts**: Recharts
- **State Management**: React Hooks (useState, useEffect)
- **API**: Custom fetch function to load region, indicator, and series data

---

---

## Getting Started

### 1️ Clone the repository
```bash
git clone https://github.com/sumitusf/data-dashboard.git
cd data-dashboard

### install npm

```bash
npm install

### Start the project
```bash
npm start

### Start the Backend project

```bash
cd backend
node server.js
