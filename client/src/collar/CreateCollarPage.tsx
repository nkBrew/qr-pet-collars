import React from 'react';
import axios from 'axios';
import { Form, message } from 'antd';

import { CollarCard } from './CollarCard';
import { CollarForm } from './CollarForm';

export const CreateCollarPage = () => {
    const [form] = Form.useForm();
    const img = Form.useWatch('img_url', form);

    const [messageApi, contextHolder] = message.useMessage();
    const API_HOST = 'http://localhost:8000';

    return(
        <CollarCard img={img}>
            {contextHolder}
            <CollarForm
                form={form}
                showQRCode={true}
                showIsMissing={false}
                onFinish={(values) => {
                    axios.post(`${API_HOST}/collar/`, {
                        img_url: values.img_url,
                        pet_name: values.pet_name,
                        breed: values.breed,
                        weight: values.weight,
                        owner_name: values.owner_name,
                        owner_email: values.owner_email,
                        phone_number: values.phone_number,
                        qr_code_id: values.qr_code_id,
                        is_missing: values.is_missing,
                    }).then(() => messageApi.open({
                          type: 'success',
                          content: 'We updated your mutt',
                    })).catch((error) => {
                        messageApi.open({
                          type: 'error',
                          content: `Well the important thing is we tried... ${error.message}`,
                        })
                    })
                }}
            />
        </CollarCard>
    );
};