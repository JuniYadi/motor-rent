import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";
import { HelmetProvider } from "react-helmet-async";
import { Amplify } from "aws-amplify";

import "./scss/styles.scss";
import "@aws-amplify/ui-react/styles.css";
import {
  AWS_REGION,
  AWS_USER_POOL_ID,
  AWS_USER_POOL_WEB_CLIENT_ID,
} from "./statics";

Amplify.configure({
  Auth: {
    Cognito: {
      region: AWS_REGION,
      userPoolId: AWS_USER_POOL_ID,
      userPoolClientId: AWS_USER_POOL_WEB_CLIENT_ID,
      loginWith: {
        email: true,
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <SWRConfig
        value={{
          refreshInterval: 30000,
          suspense: false,
          fetcher: ([url, token, queryParam]) =>
            fetch(
              queryParam ? `${url}?${queryParam}` : url,
              token
                ? {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                : undefined
            ).then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                throw res;
              }
            }),
        }}
      >
        <RouterProvider router={router} />
      </SWRConfig>
    </HelmetProvider>
  </React.StrictMode>
);
