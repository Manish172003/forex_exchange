import Navbar from "../src/design/Navbar";
import ConversionCounter from "../src/pages/ConversionCounter";
import Home from "../src/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RateChart from "../src/pages/RateChart";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/conversion" element={<ConversionCounter />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/charts" element={<RateChart/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
