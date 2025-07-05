import { Container } from '@mui/material';
import ComingSoon from '../components/ComingSoon';

const TodoList = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <ComingSoon title="Todo List" />
    </Container>
  );
};

export default TodoList;
