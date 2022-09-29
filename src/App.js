import './App.css';
import { useRoutes } from 'react-router-dom';
import Header from './containers/Header';

import store from './redux/store';
import routes from './routes';

function App() {
  const elements = useRoutes(routes)
  return (
    <div className="App">
      <Header store={store} />
      {elements}
    </div>
  );
}

export default App;
