import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ShareLead from "./pages/ShareLead";
import MemberLead from "./pages/MemberLead";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing / test page */}
        <Route path="/" element={<Home />} />

        {/* Lead form pages */}
        <Route path="/lead/shares" element={<ShareLead />} />
        <Route path="/lead/members" element={<MemberLead />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
