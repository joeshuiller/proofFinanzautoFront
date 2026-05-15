import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Aquí podrías poner un Navbar global si quisieras */}
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;