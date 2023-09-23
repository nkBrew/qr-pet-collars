import React from "react";

import { Button, Card, Col, Form, Input, Row, Typography  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from './routes';

import { CreateCollarPage } from './CreateCollar/CreateCollarPage';

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
            })
            .catch((err) => {
                console.log({err});
                setError("Wrong username or password")
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
                        <Typography.Title>Auth</Typography.Title>
                        <form onSubmit={login}>
                            <Row gutter={3}>
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
                            <div className="form-group">


                                <div>
                                    {error &&
                                        <small className="text-danger">
                                            {error}
                                        </small>
                                    }
                                </div>
                            </div>
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
                    <Typography.Title>You are logged in!</Typography.Title>
                    <br/>
                    <Row justify='center' gutter={10}>
                        <Col>
                            <Button onClick={logout}>Log Out</Button>
                        </Col>
                        <Col>
                            <Button onClick={createCollar}>Create Collar</Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

export default Auth;