import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";
import SearchPage from "./pages/SearchPage";
import WatchlistPage from "./pages/WatchlistPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
        <WatchlistProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Routes>
          <Footer />
        </WatchlistProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
