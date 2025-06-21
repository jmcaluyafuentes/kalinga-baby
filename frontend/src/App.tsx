import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FoodTracker from './pages/FoodTracker';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/food" element={<FoodTracker />} />
    </Routes>
  );
}

export default App;
