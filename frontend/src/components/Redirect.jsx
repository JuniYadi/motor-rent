import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect({ to: url }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(url);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return null;
}
