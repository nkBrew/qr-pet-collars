import React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Typography } from 'antd';

import './index.css';

import { ROUTES } from './routes';

import Auth from './Auth';
import { ViewCollarPage } from './ViewCollar/ViewCollarPage';

const queryClient = new QueryClient();

const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTES.login} element={<Auth/>}/>
                    <Route path={ROUTES.viewCollar} element={<ViewCollarPage/>}/>
                    <Route path={'*'} element={<Typography.Text>Page Not Found</Typography.Text>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
