import React from "react";

import { Button, Card, Col, Form, Input, Row, Typography  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from './routes';

import { CreateCollarPage } from './collar/CreateCollarPage';

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
                console.log({csrfToken});
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
                console.log({session: data});
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
                console.log({login: data});
                setIsAuthenticated(true);
                setUsername("");
                setPassword("");
                setError("");
                navigate(ROUTES.createCollar);

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
                console.log({logout: data});
                setIsAuthenticated(false);
                getCSRF();
            })
            .catch((err) => console.log(err));
    };

    const createCollar = () => {
        navigate(ROUTES.createCollar);
    }


    if (!isAuthenticated) {
        return (
            <Row justify='center'>
                <Col>
                    <Card>
                        <Typography.Title>who let the dogs out?</Typography.Title>
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
                                    <Button htmlType="submit">Login</Button>
                                </Col>
                            </Row>
                        </form>
                    </Card>
                </Col>
            </Row>
        );
    }
    return (
        <Row justify='center'>
            <Col>
                <Card>
                    <Typography.Text>are you sure you want to log out?</Typography.Text>
                    <br/>
                    <br/>
                    <Row justify='center' gutter={20}>
                        <Col>
                            <Button type='primary' onClick={logout}>Yes</Button>
                        </Col>
                        <Col>
                            <Button onClick={createCollar}>No</Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

export default Auth;