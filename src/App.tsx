import { Provider } from 'react-redux';
import { store } from './store/store';
import { WeatherDashboard } from './pages/WeatherDashboard';

function App() {
  return (
    <Provider store={store}>
      <WeatherDashboard />
    </Provider>
  );
}

export default App;
