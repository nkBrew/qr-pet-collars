// @flow
import React from 'react';
import { Typography } from 'antd';

import Auth from './Auth';

export const App = () => {
    return (
        <Typography.Text>
            Hello World!
            <Auth/>
        </Typography.Text>
    );
};
