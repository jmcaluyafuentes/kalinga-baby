import FoodForm from "./components/FoodForm";
import { Container } from "@mui/material";
import FoodList from "./components/FoodList";

function App() {

  return (
    <Container>
      <FoodForm />
      <FoodList />
    </Container>
  )
}

export default App
