import React from 'react';
import { Card, Col, Image, Row } from 'antd';

import type { ReactNode } from 'react';
import { DogImage } from './DogImage';

type Props = {
    img?: string | null,
    isLoading?: boolean,
    extra?: ReactNode,
    children: ReactNode,
};

export const CollarCard = (props: Props) => {
    const {
        img,
        isLoading = false,
        extra,
        children,
    } = props;

    return (
        <Card
            loading={isLoading}
            cover={
                <Row>
                    {
                        Boolean(extra) &&
                        <Col style={{ position: 'absolute', top: 0, right: 0, zIndex: 100 }}>
                            {extra}
                        </Col>
                    }
                    <Col>
                        <DogImage img={img} isLoading={isLoading}/>
                    </Col>
                </Row>
            }
        >
            {children}
        </Card>
    );
};
