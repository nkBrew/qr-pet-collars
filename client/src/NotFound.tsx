import React from 'react';
import { Button, Image, Space, Typography } from 'antd';

type Props = {
    img: string,
    description: string,
    buttonText?: string,
    buttonAction?: () => void,
};

export const NotFound = (props: Props) => {
    const {
        img,
        description,
        buttonText,
        buttonAction,
    } = props;

    return (
        <Space size={'large'} direction={'vertical'} align={'center'}>
            <Image
                preview={false}
                style={{ width: '32rem', height: '32rem', borderRadius: '50%', objectFit: 'cover' }}
                src={img}
            />
            <Typography.Title level={3} style={{ textAlign: 'center', maxWidth: '42rem' }}>
                {description}
            </Typography.Title>
            {
                buttonText && buttonAction &&
                <Button type={'primary'} onClick={buttonAction}>
                    {buttonText}
                </Button>
            }
        </Space>
    );
};
