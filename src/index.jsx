import React from 'react';
import { CreateRoot } from 'react-dom/client';
import App from './components/App';

const rootElement = document.getElementById('root');
CreateRoot(rootElement).render(<App />);