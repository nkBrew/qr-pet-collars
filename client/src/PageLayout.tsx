import { Card, Col, Menu, Row } from 'antd';
import { generatePath, matchPath, useLocation, useNavigate } from 'react-router';
import { find, values } from 'lodash';
import { ScheduleOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';

import { ROUTES } from './routes';

import type { ReactNode } from 'react';

type Props = {
    children: ReactNode,
};

export const PageLayout = (props: Props) => {
    const {
        children,
    } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const selectedPath = find(values(ROUTES), (route: string) => matchPath(route, location.pathname));

    return (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                <Card bodyStyle={{ padding: '1.6rem 0' }}>
                    <Menu
                        selectedKeys={[`${selectedPath}`]}
                        mode={'horizontal'}
                        items={[
                            {
                                key: ROUTES.viewCollars,
                                label: 'View Collars',
                                icon: <ScheduleOutlined/>,
                                onClick: () => navigate(ROUTES.viewCollars),
                            },
                            {
                                key: ROUTES.findCollar,
                                label: 'Find Collar',
                                icon: <SearchOutlined/>,
                                onClick: () => navigate(generatePath(ROUTES.findCollar, { collarId: '1' })),
                            },
                            {
                                key: ROUTES.login,
                                label: 'Log Out',
                                icon: <LogoutOutlined/>,
                                onClick: () => navigate(ROUTES.login),
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
