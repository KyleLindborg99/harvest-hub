import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TokenFormPage from "./components/forms/TokenFormPage";
import DebugTokenPage from "./components/forms/DebugTokenPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing / test page */}
        <Route path="/" element={<Home />} />

        {/* Token-based form access (for QR codes) */}
        <Route path="/f/:token" element={<DebugTokenPage />} />
        <Route path="/form/:token" element={<TokenFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
