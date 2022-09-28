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
      {/* <Routes>
        <Route path="/home" element={<Feeds />} />
        <Route path="/login" element={<Login isLogin={true} />} />
        <Route path="/register" element={<Login isLogin={false} />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/*" element={<Navigate to="/home" replace />} />
      </Routes> */}
    </div>
  );
}

export default App;
