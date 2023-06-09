import React from 'react';
import ReactDOM from 'react-dom/client';

// Site-Wide CSS
import '~/styles/theme.css';

// App Settings
import AppSettings from './AppSettings';

// Page Imports
import { NotFound } from './navigation/_ErrorPages';
import App from './App';

// Routing
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import { CssBaseline } from '@mui/material';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route index element={<App />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    ), { basename: AppSettings[process.env.NODE_ENV || 'development'].GH_ROOT }
);

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.Fragment>
            <CssBaseline />
            <RouterProvider router={router} />
        </React.Fragment>
    );