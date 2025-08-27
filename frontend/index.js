import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@descope/react-sdk';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AuthProvider projectId="P31rvuz4KAU5NBauZw9vUsGTBWRg">
            <App/>
        </AuthProvider>
    </React.StrictMode>
)