import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import FoodTracker from './pages/FoodTracker';
import About from './pages/About';
import FoodEdit from './components/FoodEdit';

const App = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ pt: '64px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<FoodTracker />} />
          <Route path="/food/:id/edit" element={<FoodEdit />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
