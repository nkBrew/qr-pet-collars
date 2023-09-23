import React from 'react';
import { Card, Col, Image, Row } from 'antd';

import type { ReactNode } from 'react';

type Props = {
    isLoading?: boolean,
    extra?: ReactNode,
    children: ReactNode,
};

export const CollarCard = (props: Props) => {
    const {
        isLoading = false,
        extra,
        children,
    } = props;
    return (
        <Row justify={'center'}>
            <Col flex={'40rem'}>
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
                                <Image
                                    preview={false}
                                    src={'https://images.dog.ceo/breeds/germanshepherd/Bagira_site.jpg'}
                                />
                            </Col>
                        </Row>
                    }
                >
                    {children}
                </Card>
            </Col>
        </Row>
    );
};
