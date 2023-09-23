import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Image, Input, Row, Typography } from 'antd';

import { ROUTES } from './routes';

const API_HOST = 'http://localhost:8000';

export const Auth = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [csrf, setCsrf] = React.useState("");
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        getSession();
    }, []);

    const getCSRF = () => {
        fetch(`${API_HOST}/csrf/`, {
            credentials: "include",
        })
            .then((res) => {
                const csrfToken = res.headers.get("X-CSRFToken");
                setCsrf(csrfToken || "");
            })
            .catch((err) => {
                console.log({err});
            });
    }

    const getSession = () => {
        fetch(`${API_HOST}/session/`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    getCSRF();
                }
            })
            .catch((err) => {
                console.log({err});
            });
    }



    const isResponseOk = (response: Response) => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    }

    const login = (username: string, password: string) => {
        fetch(`${API_HOST}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrf,
            },
            credentials: "include",
            body: JSON.stringify({username: username, password: password}),
        })
            .then(isResponseOk)
            .then(() => {
                setIsAuthenticated(true);
                setError("");
                navigate(ROUTES.viewCollars);

            })
            .catch((err) => {
                console.log({err});
                setError("wrong username or password")
            });
    }

    const logout = () => {
        fetch(`${API_HOST}/logout/`, {
            credentials: "include",
        })
            .then(isResponseOk)
            .then((data) => {
                setIsAuthenticated(false);
                getCSRF();
            })
            .catch((err) => console.log(err));
    };

    const viewCollars = () => {
        navigate(ROUTES.viewCollars);
    }

    const images = [
        'https://images.dog.ceo/breeds/schnauzer-giant/n02097130_4467.jpg',
        'https://images.dog.ceo/breeds/hound-basset/n02088238_11542.jpg',
        'https://images.dog.ceo/breeds/rottweiler/n02106550_2725.jpg',
        'https://images.dog.ceo/breeds/terrier-border/n02093754_2457.jpg',
        'https://images.dog.ceo/breeds/elkhound-norwegian/n02091467_6103.jpg',
        'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11417.jpg',
        'https://images.dog.ceo/breeds/frise-bichon/stevebaxter_bichon_frise.jpg',
        'https://images.dog.ceo/breeds/newfoundland/n02111277_6679.jpg',
        'https://images.dog.ceo/breeds/pointer-german/n02100236_1838.jpg',
        'https://images.dog.ceo/breeds/terrier-toy/n02087046_5890.jpg',
        'https://images.dog.ceo/breeds/buhund-norwegian/hakon1.jpg',
        'https://images.dog.ceo/breeds/labradoodle/Cali.jpg',
        'https://images.dog.ceo/breeds/setter-english/n02100735_3194.jpg',
        'https://images.dog.ceo/breeds/bulldog-french/n02108915_110.jpg',
        'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
        'https://images.dog.ceo/breeds/pomeranian/n02112018_12853.jpg',
        'https://images.dog.ceo/breeds/bulldog-english/jager-1.jpg',
        'https://images.dog.ceo/breeds/akita/Akita_inu_blanc.jpg',
        'https://images.dog.ceo/breeds/chow/n02112137_11273.jpg',
        'https://images.dog.ceo/breeds/frise-bichon/3.jpg',
        'https://images.dog.ceo/breeds/terrier-toy/n02087046_1666.jpg',
        'https://images.dog.ceo/breeds/mountain-swiss/n02107574_169.jpg',
        'https://images.dog.ceo/breeds/frise-bichon/5.jpg',
        'https://images.dog.ceo/breeds/retriever-golden/dogs.boris.jasper.nixon.jpg',
        'https://images.dog.ceo/breeds/chihuahua/n02085620_500.jpg',
        'https://images.dog.ceo/breeds/kuvasz/n02104029_262.jpg',
        'https://images.dog.ceo/breeds/kuvasz/n02104029_1206.jpg',
        'https://images.dog.ceo/breeds/setter-irish/n02100877_4371.jpg',
        'https://images.dog.ceo/breeds/puggle/IMG_075018.jpg',
        'https://images.dog.ceo/breeds/hound-ibizan/n02091244_879.jpg',
        'https://images.dog.ceo/breeds/poodle-miniature/n02113712_6173.jpg',
        'https://images.dog.ceo/breeds/hound-blood/n02088466_6974.jpg',
        'https://images.dog.ceo/breeds/puggle/IMG_151824.jpg',
        'https://images.dog.ceo/breeds/cockapoo/Guri6.jpg',
        'https://images.dog.ceo/breeds/kuvasz/n02104029_1313.jpg',
        'https://images.dog.ceo/breeds/ovcharka-caucasian/IMG_20190826_112034.jpg',
        'https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_1219.jpg',
        'https://images.dog.ceo/breeds/cattledog-australian/IMG_4421.jpg',
        'https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191112123933390_COVER.jpg',
        'https://images.dog.ceo/breeds/bullterrier-staffordshire/n02093256_3906.jpg',
        'https://images.dog.ceo/breeds/finnish-lapphund/mochilamvan.jpg',
        'https://images.dog.ceo/breeds/borzoi/n02090622_5775.jpg',
        'https://images.dog.ceo/breeds/terrier-toy/n02087046_4129.jpg',
        'https://images.dog.ceo/breeds/pyrenees/n02111500_395.jpg',
        'https://images.dog.ceo/breeds/dachshund/Miniature_Daschund.jpg',
        'https://images.dog.ceo/breeds/bulldog-french/n02108915_7115.jpg',
        'https://images.dog.ceo/breeds/terrier-border/n02093754_2425.jpg',
        'https://images.dog.ceo/breeds/terrier-westhighland/n02098286_278.jpg',
        'https://images.dog.ceo/breeds/terrier-lakeland/n02095570_4183.jpg',
        'https://images.dog.ceo/breeds/terrier-norwich/n02094258_1985.jpg',
        'https://images.dog.ceo/breeds/hound-ibizan/n02091244_1541.jpg',
        'https://images.dog.ceo/breeds/poodle-medium/PXL_20210220_100624962.jpg',
        'https://images.dog.ceo/breeds/newfoundland/n02111277_6096.jpg',
        'https://images.dog.ceo/breeds/schipperke/n02104365_1292.jpg',
        'https://images.dog.ceo/breeds/spaniel-cocker/n02102318_9680.jpg',
        'https://images.dog.ceo/breeds/poodle-toy/n02113624_1844.jpg',
        'https://images.dog.ceo/breeds/deerhound-scottish/n02092002_5335.jpg',
        'https://images.dog.ceo/breeds/terrier-bedlington/n02093647_3338.jpg',
        'https://images.dog.ceo/breeds/maltese/n02085936_4396.jpg',
        'https://images.dog.ceo/breeds/malamute/n02110063_17378.jpg',
        'https://images.dog.ceo/breeds/rottweiler/n02106550_6978.jpg',
        'https://images.dog.ceo/breeds/hound-plott/hhh-23456.jpg',
        'https://images.dog.ceo/breeds/bulldog-french/n02108915_1119.jpg',
        'https://images.dog.ceo/breeds/dane-great/n02109047_481.jpg',
        'https://images.dog.ceo/breeds/poodle-standard/n02113799_419.jpg',
        'https://images.dog.ceo/breeds/bulldog-boston/n02096585_2042.jpg',
        'https://images.dog.ceo/breeds/labrador/n02099712_384.jpg',
        'https://images.dog.ceo/breeds/terrier-toy/n02087046_4135.jpg',
        'https://images.dog.ceo/breeds/boxer/n02108089_2526.jpg',
        'https://images.dog.ceo/breeds/frise-bichon/2.jpg',
        'https://images.dog.ceo/breeds/chow/n02112137_10762.jpg',
        'https://images.dog.ceo/breeds/hound-basset/n02088238_3359.jpg',
        'https://images.dog.ceo/breeds/weimaraner/n02092339_3171.jpg',
        'https://images.dog.ceo/breeds/retriever-flatcoated/n02099267_5427.jpg',
        'https://images.dog.ceo/breeds/terrier-cairn/n02096177_1710.jpg',
        'https://images.dog.ceo/breeds/terrier-toy/n02087046_357.jpg',
        'https://images.dog.ceo/breeds/retriever-golden/n02099601_2796.jpg',
        'https://images.dog.ceo/breeds/redbone/n02090379_2771.jpg',
        'https://images.dog.ceo/breeds/retriever-flatcoated/n02099267_482.jpg',
        'https://images.dog.ceo/breeds/bulldog-boston/n02096585_1562.jpg',
        'https://images.dog.ceo/breeds/poodle-toy/n02113624_530.jpg',
        'https://images.dog.ceo/breeds/bulldog-english/mami.jpg',
        'https://images.dog.ceo/breeds/maltese/n02085936_7142.jpg',
        'https://images.dog.ceo/breeds/airedale/n02096051_7847.jpg',
    ];

    return (
        <Row style={{ height: 'calc(100vh - 16px)', overflow: 'hidden' }}>
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: '#000000DD',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
            <Col span={24}>
                <Row gutter={[8, 8]} style={{ position: 'absolute' }}>
                    {images.map(image => {
                        return <Col key={image} flex={1}>
                            <Image
                                preview={false}
                                style={{ width: '13vw', height: '13vw', objectFit: 'cover', opacity: 0.75 }}
                                src={image}
                            />
                        </Col>
                    })}
                </Row>
                <Row align={'middle'} justify={'center'} style={{ height: '95vh', zIndex: 200 }}>
                    <Col flex={'40rem'}>
                        {
                            isAuthenticated
                                ? <Card style={{ backgroundColor: '#FFFFFFDD', filter: 'drop-shadow(rgba(0, 0, 0, 0.5) 0px 1rem 1rem)' }}>
                                    <Row gutter={[0, 16]}>
                                        <Col span={24}>
                                            <Row justify='center'>
                                                <Col>
                                                    <Image
                                                        preview={false}
                                                        style={{ width: '16rem', height: '16rem', borderRadius: '50%', objectFit: 'cover' }}
                                                        src={'https://images.dog.ceo/breeds/greyhound-italian/n02091032_658.jpg'}

                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={24} style={{ textAlign: 'center' }}>
                                            <Typography.Title level={5}>Are you sure you want to log out?</Typography.Title>
                                        </Col>
                                        <Col span={24}>
                                            <Row justify='center' gutter={16}>
                                                <Col>
                                                    <Button onClick={viewCollars}>No</Button>
                                                </Col>
                                                <Col>
                                                    <Button type='primary' onClick={logout}>Yes</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                                : <Card style={{ backgroundColor: '#FFFFFFDD', filter: 'drop-shadow(rgba(0, 0, 0, 0.5) 0px 1rem 1rem)' }}>
                                    <Row gutter={[0, 16]}>
                                        <Col span={24}>
                                            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                                                Who let the dogs out?
                                            </Typography.Title>
                                        </Col>
                                        <Col span={24}>
                                            <Row justify={'center'}>
                                                <Col>
                                                    <Image
                                                        preview={false}
                                                        style={{ width: '16rem', height: '16rem', borderRadius: '13%', objectFit: 'cover' }}
                                                        src={'https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_1408.jpg'}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={24}>
                                            <Form
                                                form={form}
                                                onFinish={(values: { username: 'string', password: 'string' }) => login(values.username, values.password)}
                                                labelCol={{ span: 8 }}
                                            >
                                                <Form.Item
                                                    label={'Username'}
                                                    name={'username'}
                                                    rules={[{
                                                        required: true,
                                                        whitespace: true,
                                                        message: 'Please enter your username',
                                                    }]}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                                <Form.Item
                                                    label={'Password'}
                                                    name={'password'}
                                                    rules={[{
                                                        required: true,
                                                        whitespace: true,
                                                        message: 'Please enter your password',
                                                    }]}
                                                >
                                                    <Input.Password/>
                                                </Form.Item>
                                            </Form>
                                        </Col>
                                        {
                                            error &&
                                            <Col span={24} style={{ textAlign: 'center' }}>
                                                <Typography.Text type={'danger'}>
                                                    {error}
                                                </Typography.Text>
                                            </Col>
                                        }
                                        <Col span={24}>
                                            <Row justify={'center'}>
                                                <Col>
                                                    <Button type={'primary'} onClick={() => form.submit()}>Login</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Auth;