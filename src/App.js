
import './App.css';
import AppContextProvider from './context/AppContext';
import Dashboard from './pages/Dashboard';



function App() {




  return (
    <AppContextProvider>
      <Dashboard />
    </AppContextProvider>

  );
}

export default App;
