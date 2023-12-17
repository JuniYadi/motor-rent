import { Link, useSearchParams } from "react-router-dom";

export default function OrderNew() {
  const [searchParams] = useSearchParams();
  const mtId = searchParams.get("mtId");
  const name = searchParams.get("name");
  const category = searchParams.get("category");

  return (
    <>
      <h2 className="text-capitalize">
        Order Sewa Motor {name} ({category})
      </h2>
    </>
  );
}
