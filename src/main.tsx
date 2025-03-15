import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { UncontrolledForm } from './routes/Uncontrol.tsx';
import { ControlledForm } from './routes/Control.tsx';
import './index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="uncontrol" element={<UncontrolledForm />} />
            <Route path="control" element={<ControlledForm />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
} else {
  console.error('Root element not found.');
}
