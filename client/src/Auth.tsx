import React from "react";

const API_HOST = 'http://localhost:8000';

export const Auth = () => {
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

    const whoami = () => {
        fetch(`${API_HOST}/whoami/`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => console.log("You are logged in as: " + data.username))
            .catch((err) => console.log({err}));
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

    if (!isAuthenticated) {
        return (
            <div>
                <h1>Auth</h1>
                <form onSubmit={login}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username"
                               value={username} onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Password</label>
                        <input type="password" className="form-control" id="password" name="password"
                               value={password} onChange={(event) => setPassword(event.target.value)}/>
                        <div>
                            {error &&
                                <small className="text-danger">
                                    {error}
                                </small>
                            }
                        </div>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
    return (
        <div>
            <h1>Auth</h1>
            <p>You are logged in!</p>
            <button onClick={whoami}>WhoAmI</button>
            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default Auth;