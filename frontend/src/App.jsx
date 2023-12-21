import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { APP_NAME } from "./statics";
import { Button, Container, Nav, NavDropdown } from "react-bootstrap";
import {
  getCurrentUser,
  signOut,
  fetchUserAttributes,
  fetchAuthSession,
} from "aws-amplify/auth";
import SHA256 from "crypto-js/sha256";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { UserContext } from "./contexts";

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    gravatar: "",
    isVerified: false,
    isAdmin: false,
    tokens: null,
  });
  const navigate = useNavigate();

  const onSignOut = async (e) => {
    e.preventDefault();

    setUser({
      username: "",
      email: "",
      gravatar: "",
      isVerified: false,
      isAdmin: false,
      tokens: null,
    });
    setIsAuthenticated(false);

    await signOut();
    window.href.location = "/";
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        // set isAuthenticated to true
        setIsAuthenticated(true);

        const attributes = await fetchUserAttributes(user);
        const { idToken } = (await fetchAuthSession()).tokens || {};

        // get cognito groups
        const groups = idToken?.payload["cognito:groups"] || [];

        // hash email for gravatar
        const emailHash = SHA256(
          attributes?.email.toLocaleLowerCase()
        ).toString();

        setUser({
          name: attributes?.name,
          username: user?.username,
          email: attributes?.email,
          phone_number: attributes?.phone_number,
          phone_number_verified: attributes?.phone_number_verified,
          gravatar: `https://www.gravatar.com/avatar/${emailHash}?s=45&d=identicon`,
          isVerified: attributes?.email_verified,
          isAdmin: groups.includes("administrator"),
          tokens: idToken?.toString(),
        });
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <div className="container py-2">
        <header>
          <div className="d-flex flex-column flex-md-row align-items-center border-bottom shadow">
            <a
              href="/"
              className="d-flex align-items-center link-body-emphasis text-decoration-none"
            >
              <img src="/logo_3.png" alt="" width="64" height="100%" />
              <span className="fs-4">{APP_NAME}</span>
            </a>

            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
              <Link
                to="#"
                className="me-3 py-2 link-body-emphasis text-decoration-none"
              >
                Features
              </Link>
              <Link
                to="#"
                className="me-3 py-2 link-body-emphasis text-decoration-none"
              >
                Support
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/app/order"
                    className="me-3 py-2 link-body-emphasis text-decoration-none"
                  >
                    My Order
                  </Link>
                  <Nav>
                    <NavDropdown
                      title={
                        <>
                          <span className="m-2">{user?.name}</span>

                          <picture>
                            <img
                              src={user?.gravatar}
                              alt="avatar"
                              className="rounded-circle hide-on-mobile"
                              width="32"
                              height="100%"
                            />
                          </picture>
                        </>
                      }
                      id="collapsible-nav-dropdown"
                    >
                      <NavDropdown.Item href="#grant">
                        Status{" "}
                        {user?.isVerified ? "Verified ✅" : "Unverified ❌"}
                      </NavDropdown.Item>
                      <NavDropdown.Divider />

                      {user?.isAdmin && (
                        <>
                          <NavDropdown.Item href="#grant">
                            Admin Access
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                        </>
                      )}

                      <NavDropdown.Item href="#signout" onClick={onSignOut}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    className="me-3 py-2"
                    size="sm"
                    onClick={() => navigate("/app/order")}
                  >
                    Login
                  </Button>
                </>
              )}
            </nav>
          </div>
        </header>
      </div>

      <Container>
        <UserContext.Provider value={user}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </UserContext.Provider>
      </Container>

      <footer className="my-5 pt-5 text-body-secondary text-center text-small">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} {APP_NAME}
        </p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#">Privacy</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms</a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export const AppPrivate = withAuthenticator(App, {
  formFields: {
    signUp: {
      name: {
        required: true,
        type: "text",
        minLength: 3,
        maxLength: 255,
      },
      phone_number: {
        required: true,
      },
    },
  },
});
