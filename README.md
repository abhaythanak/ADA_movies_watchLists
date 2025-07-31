# 🎬 Movie Watchlist App
Deploy Link :  https://ada-assignment-moviewatchlist.netlify.app/
A responsive and user-friendly React application that allows users to search for movies using the OMDb API and maintain a personal watchlist with persistent local storage.

---
## 🔧 Setup Instructions

### 1. Clone the Repository

git clone https://github.com/your-username/movie-watchlist-app.git
cd movie-watchlist-app

npm install
# or
yarn install

Create a .env file in the root and add your OMDb API key:  VITE_OMDB_API_KEY=your_api_key_here


## 🚀 Features

### 🔍 Movie Search
- Search movies by title using the [OMDb API](http://www.omdbapi.com/)
- Displays:
  - Movie title
  - Poster image
  - Release year
- Handles:
  - Empty search
  - No results
  - API errors

### ➕ Add to Watchlist
- Each movie has an “Add to Watchlist” button
- Prevents duplicate entries
- Persists selection using `localStorage`

### 📝 Watchlist Management
- Dedicated Watchlist route
- Displays all saved movies
- “Remove” button for each movie
- Real-time updates to the list

### 💾 Persistent Storage
- Watchlist saved in `localStorage`
- Automatically restores watchlist on page reload

---

## 🛠️ Tech Stack

 Tech              Purpose                                      
-------------      ----------------------------------------------
 React             Frontend Framework (CRA or Vite recommended) 
 React Router      Routing between pages                        
 OMDb API          Movie Data Source                            
 Tailwind CSS      Styling and responsive UI        
 localStorage      Persistent client-side storage               

---

## 🧩 Project Structure

movie-watchlist-app/
├── public/
├── src/                   
│   ├── components/ 
|   |   |-- Footer.jsx
│   │   ├── MovieCard.jsx         
│   │   └── Navbar.jsx           
│   ├── context/
│   │   └── WatchlistContext.jsx   
│   ├── pages/
│   │   ├── SearchPage.jsx              
│   │   └── Watchlist.jsx                           
│   ├── App.jsx                     
│   ├── index.jsx                  
│   ├── index.css                
│   └── .env                      

<img width="1781" height="875" alt="Screenshot 2025-07-31 102948" src="https://github.com/user-attachments/assets/8978f404-7294-4f26-97ad-a2aeb2dfeb34" />
<img width="1782" height="873" alt="Screenshot 2025-07-31 103022" src="https://github.com/user-attachments/assets/02827358-6fc7-4b98-8378-31ee57a3d963" />
<img width="1783" height="873" alt="Screenshot 2025-07-31 103041" src="https://github.com/user-attachments/assets/f7d9eda0-3508-4975-8f18-9298f06e0c1c" />
<img width="963" height="855" alt="Screenshot 2025-07-31 103240" src="https://github.com/user-attachments/assets/2bf810e8-629a-46d0-9303-dc4168b414e6" />
<img width="960" height="856" alt="Screenshot 2025-07-31 103258" src="https://github.com/user-attachments/assets/0fe1ecbc-ae48-4aa4-bb11-d197fa6adfe9" />

