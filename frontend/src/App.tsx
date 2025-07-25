import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import FoodTracker from './pages/FoodTracker';
import About from './pages/About';
import FoodEdit from './components/FoodEdit';
import Footer from './components/Footer';
import SleepTracker from './pages/SleepTracker';
import Milestones from './pages/Milestones';
import BabyItems from './pages/BabyItems';
import Appointments from './pages/Appointments';
import TodoList from './pages/TodoList';
import Tips from './pages/Tips';
import Blog from './pages/Blog';
import Tools from './components/Tools';

const App = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, pt: '50px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/food" element={<FoodTracker />} />
            <Route path="/food/:id/edit" element={<FoodEdit />} />
            <Route path="/sleeptracker" element={<SleepTracker />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/babyitems" element={<BabyItems />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/todolist" element={<TodoList />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default App;
