import { BrowserRouter, Routes as Router, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Form } from "../pages/Form";

export function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="form" element={<Form />} />
      </Router>
    </BrowserRouter>
  );
}
