import React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Typography } from 'antd';

import './index.css';

import { ROUTES } from './routes';

import Auth from './Auth';
import { PageLayout } from './PageLayout';
import { UpdateCollarPage } from './collar/UpdateCollarPage';
import { ViewCollarPage } from './collar/ViewCollarPage';
import { CreateCollarPage } from './collar/CreateCollarPage';

const queryClient = new QueryClient();

const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTES.login} element={<Auth/>}/>
                    <Route path={ROUTES.viewCollar} element={<PageLayout><ViewCollarPage/></PageLayout>}/>
                    <Route path={ROUTES.updateCollar} element={<PageLayout><UpdateCollarPage/></PageLayout>}/>
                    <Route path={ROUTES.createCollar} element={<PageLayout><CreateCollarPage/></PageLayout>}/>
                    <Route path={'*'} element={<Typography.Text>Page Not Found</Typography.Text>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
