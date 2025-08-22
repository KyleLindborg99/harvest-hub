import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ShareLead from "./pages/ShareLead";
import MemberLead from "./pages/MemberLead";
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

        {/* Lead form pages (legacy/direct access) */}
        <Route path="/lead/shares" element={<ShareLead />} />
        <Route path="/lead/members" element={<MemberLead />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
