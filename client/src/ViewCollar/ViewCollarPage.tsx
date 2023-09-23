import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Col, Row, Typography } from 'antd';

export const ViewCollarPage = () => {
    const params = useParams();

    const collarId = Number(params.collarId);

    const {
        data: collar,
        isFetching: isLoadingCollar,
    } = useQuery({
        queryKey: ['collar', collarId],
        queryFn: () => axios({
            method: 'get',
            url: `/collar/${collarId}/`,
        }),
        enabled: true,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
    });

    if (isLoadingCollar) {
        return (
            <Row>
                <Col>
                    <Typography.Text>
                        Loading...
                    </Typography.Text>
                </Col>
            </Row>
        );
    }

    if (!collar) {
        return (
            <Row>
                <Col>
                    <Typography.Text>
                        Collar Not Found :(
                    </Typography.Text>
                </Col>
            </Row>
        );
    }

    return (
        <Row justify={'center'}>
            <Col flex={'60rem'}>
                <Row gutter={[0, 24]}>
                    <Col span={24}>
                        <Typography.Text>
                            Collar Found!
                        </Typography.Text>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
