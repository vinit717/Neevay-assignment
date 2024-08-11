# Neevay Assignment

## Overview

This project is a ReactJS application that implements a search and filter system for vendors. The application allows users to search for vendors based on various services and filter the results based on different criteria. 

## Features

1. **Search Functionality**
   - The search bar allows users to search for vendors based on the services they offer. Available services are:
     - Construction
     - Renovation
     - Real Estate Development
     - Property Management
     - Interior Design
     - Infrastructure Development
     - Electrical
     - Automation

2. **Filters**
   - Users can filter the vendor search results using the following filters:
     - **Verified Vendors**: Filters based on the vendor's verification status.
     - **Search by Office Address Only**: Keeps only those vendors whose office is in the selected city.
     - **Market Sector**: Allows filtering based on different market sectors.
     - **Turnover**: Filters based on the vendor’s turnover range.
     - **Labour Strength**: Filters based on the number of employees.
     - **Business Age**: Filters based on the age of the business.
     - **Projects Completed**: Filters based on the minimum number of projects completed.

3. **Pagination**
   - The application supports pagination, displaying 5 vendors per page and allowing users to navigate through additional results.

4. **View Contact Information**
   - Users can view contact information for a vendor by clicking the "View Contact" button on the vendor card.

5. **Inactive Buttons**
   - The "Join as Vendor," "Login," and "Signup" buttons in the footer are inactive as per the requirements.

6. **Filter Tips**
   - Applying any filter will display a tip at the top of the search results to indicate the active filters.

## Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/vinit717/Neevay-assignment.git
   cd Neevay-assignment

2. **Install Dependencies**
   ```bash
   npm install

3. **Run the Application**
   ```bash
   npm run start

4. **Run the Tests**
   ```bash
   npm run test
