import { Route, Routes } from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Info from "./pages/Info.jsx";
import Items from "./pages/Items.jsx";
import Checkout from "./pages/Checkout.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="info" element={<Info />} />
        <Route path="items" element={<Items />} />
        <Route path="items/:id" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;