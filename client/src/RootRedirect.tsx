import React from 'react';
import { generatePath, Navigate } from 'react-router';

import { ROUTES } from './routes';

export const RootRedirect = () => {
    return <Navigate to={generatePath(ROUTES.createCollar)}/>;
};
