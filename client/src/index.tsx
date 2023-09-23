import React from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './index.css';

import { ROUTES } from './routes';

import Auth from './Auth';
import { PageLayout } from './PageLayout';
import { NotFoundPage } from './NotFoundPage';
import { RootRedirect } from './RootRedirect';
import { GenerateQRPage } from './GenerateQRPage';
import { FindCollarPage } from './collar/FindCollarPage';
import { ViewCollarsPage } from './collar/ViewCollarsPage';
import { UpdateCollarPage } from './collar/UpdateCollarPage';
import { CreateCollarPage } from './collar/CreateCollarPage';

const queryClient = new QueryClient();

const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTES.root} element={<RootRedirect/>}/>
                    <Route path={ROUTES.login} element={<Auth/>}/>
                    <Route path={ROUTES.viewCollars} element={<PageLayout><ViewCollarsPage/></PageLayout>}/>
                    <Route path={ROUTES.findCollar} element={<PageLayout><FindCollarPage/></PageLayout>}/>
                    <Route path={ROUTES.updateCollar} element={<PageLayout><UpdateCollarPage/></PageLayout>}/>
                    <Route path={ROUTES.createCollar} element={<PageLayout><CreateCollarPage/></PageLayout>}/>
                    <Route path={ROUTES.makeQR} element={<PageLayout><GenerateQRPage/></PageLayout>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
