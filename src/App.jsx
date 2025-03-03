import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import AuthProvider from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
