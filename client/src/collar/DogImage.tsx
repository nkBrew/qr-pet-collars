import React from 'react';
import { Image, Spin } from 'antd';

type Props = {
    img?: string | null,
    isLoading?: boolean,
};

export const DogImage = (props: Props) => {
    const {
        img,
        isLoading = false,
    } = props;

    const getValidatedImg = (): string => {
        try {
            return new URL(img || '').toString();
        } catch (e) {
            return '';
        }
    };

    if (isLoading) {
        return (
            <Spin spinning size={'large'}>
                <div style={{ backgroundColor: '#b4b4b4', width: '40rem', height: '40rem', borderRadius: '0.8rem 0.8rem 0 0' }}/>
            </Spin>
        );
    }

    return (
        <Image
            preview={false}
            src={getValidatedImg()}
            fallback={'https://images.dog.ceo/breeds/germanshepherd/Bagira_site.jpg'}
        />
    );
};
