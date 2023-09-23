import React from 'react';
import { generatePath, useNavigate } from 'react-router';
import { Col, Row } from 'antd';

import { ROUTES } from './routes';

import { NotFound } from './NotFound';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Row align={'middle'} justify={'center'} style={{ height: '90vh' }}>
            <Col>
                <NotFound
                    img={'https://images.dog.ceo/breeds/terrier-norfolk/n02094114_1076.jpg'}
                    description={'Oops! Looks like you got lost'}
                    buttonText={'Take me back'}
                    buttonAction={() => navigate(generatePath(ROUTES.viewCollars))}
                />
            </Col>
        </Row>
    );
};
