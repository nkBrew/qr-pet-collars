import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Image, Row, Typography  } from 'antd';

import { ROUTES } from './routes';

const API_HOST = 'http://localhost:8000';

export const Auth = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
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

    const login = (event: React.SyntheticEvent) => {
        event.preventDefault();
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
            .then((data) => {
                setIsAuthenticated(true);
                setUsername("");
                setPassword("");
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
        <Row style={{height: 'calc(100vh - 16px)', overflow: 'hidden'}}>
            <Col span={24}>
                <Row gutter={[8, 8]} style={{position:'absolute'}}>
                    {images.map(image => {
                        return <Col key={image} flex={1}>
                            <Image
                                preview={false}
                                style={{ width: '13vw', height: '13vw', objectFit: 'cover' }}
                                src={image}
                            />
                        </Col>
                    })}
                </Row>
                <Row align={'middle'} justify={'center'} style={{ height: '95vh' }}>
                    <Col>
                        {
                            isAuthenticated
                                ? <Card style={{opacity: 0.9}}>
                                    <Row justify='center' gutter={5}>
                                        <Col>
                                            <Image
                                                preview={false}
                                                style={{ width: '16rem', height: '16rem', borderRadius: '50%', objectFit: 'cover' }}
                                                src={'https://images.dog.ceo/breeds/greyhound-italian/n02091032_658.jpg'}

                                            />
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Typography.Text>are you sure you want to log out?</Typography.Text>
                                    <br/>
                                    <br/>
                                    <Row justify='center' gutter={20}>
                                        <Col>
                                            <Button type='primary' onClick={logout}>Yes</Button>
                                        </Col>
                                        <Col>
                                            <Button onClick={viewCollars}>No</Button>
                                        </Col>
                                    </Row>
                                </Card>
                                : <Card style={{opacity: 0.9}}>
                                    <Typography.Title level={2}>who let the dogs out?</Typography.Title>
                                    <br/>
                                    <Row justify='center' gutter={5}>
                                        <Col>
                                            <Image
                                                preview={false}
                                                style={{ width: '16rem', height: '16rem', borderRadius: '13%', objectFit: 'cover' }}
                                                src={'https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_1408.jpg'}
                                            />
                                        </Col>
                                    </Row>
                                    <br/>
                                    <form onSubmit={login}>
                                        <Row justify='center' gutter={5}>
                                            <Col>
                                                <Typography.Text>Username: </Typography.Text>
                                                <br/>
                                                <Typography.Text>Password: </Typography.Text>
                                            </Col>
                                            <Col>
                                                <input type="text" className="form-control" id="username" name="username"
                                                    value={username} onChange={(event) => setUsername(event.target.value)}/>
                                                <br/>
                                                <input type="password" className="form-control" id="password" name="password"
                                                    value={password} onChange={(event) => setPassword(event.target.value)}/>
                                            </Col>
                                        </Row>
                                        <Row justify='center'>
                                            <Col>
                                                {error &&
                                                    <Typography.Text type={'danger'}>
                                                        {error}
                                                    </Typography.Text>
                                                }
                                                {!error &&
                                                    <br/>
                                                }
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row justify='center'>
                                            <Col>
                                                <Button type={'primary'} htmlType="submit">Login</Button>
                                            </Col>
                                        </Row>
                                    </form>
                                </Card>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Auth;