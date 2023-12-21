import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Table } from "react-bootstrap";
import axios from "axios";

import { API_URL, APP_NAME } from "../../statics";
import { UserContext } from "../../contexts";
import { rupiah } from "../../utils/currency";
import { Link } from "react-router-dom";

export default function OrderDetail() {
  const user = useContext(UserContext);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (user && user.tokens) {
      axios
        .get(`${API_URL}/orders`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.tokens}`,
          },
        })
        .then((res) => res.data)
        .then((res) => setOrder(res.data));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Order Lists - ${APP_NAME}`}</title>
      </Helmet>

      <h2 className="text-capitalize">Order Lists</h2>

      <Card className="mb-2">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {order.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.status}</td>
                  <td>{rupiah(item.total)}</td>
                  <td>
                    <Link to={`/app/order/${item.id}`}>
                      <a className="btn btn-primary btn-sm">Detail</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
