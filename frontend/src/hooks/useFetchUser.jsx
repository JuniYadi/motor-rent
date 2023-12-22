import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts";
import { API_URL } from "../statics";

export function useFetchUser(url, options) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        if (user && user.tokens) {
          setIsLoading(true);

          const res = await fetch(`${API_URL}/${url}`, {
            ...options,
            headers: {
              ...options?.headers,
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.tokens}`,
            },
          });

          if (res.ok) {
            const json = await res.json();
            setIsLoading(false);
            setResponse(json.data);
          } else {
            throw res;
          }
        }
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    }

    getData();
  }, [url, options, user]);

  return { response, error, isLoading, user };
}
