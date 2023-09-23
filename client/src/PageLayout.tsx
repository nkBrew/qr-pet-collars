import { Card, Col, Menu, Row } from 'antd';
import { generatePath, useLocation, useNavigate } from 'react-router';

import type { ReactNode } from 'react';
import { ROUTES } from './routes';
import { EditOutlined, PlusCircleOutlined, ScheduleOutlined } from '@ant-design/icons';

type Props = {
    children: ReactNode,
};

export const PageLayout = (props: Props) => {
    const {
        children,
    } = props;
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                <Card>
                    <Menu
                        selectedKeys={[location.pathname]}
                        mode={'horizontal'}
                        items={[
                            {
                                key: ROUTES.createCollar,
                                label: 'Create Collar',
                                icon: <PlusCircleOutlined/>,
                                onClick: () => navigate(generatePath(ROUTES.createCollar, { collarId: '1' })),
                            },
                            {
                                key: ROUTES.updateCollar,
                                label: 'Edit Collar',
                                icon: <EditOutlined/>,
                                onClick: () => navigate(generatePath(ROUTES.updateCollar, { collarId: '1' })),
                            },
                            {
                                key: ROUTES.viewCollar,
                                label: 'View Collar',
                                icon: <ScheduleOutlined/>,
                                onClick: () => navigate(generatePath(ROUTES.viewCollar, { collarId: '1' })),
                            },
                        ]}
                    />
                </Card>
            </Col>
            <Col span={24}>
                {children}
            </Col>
        </Row>
    );
};
