import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Card, Table } from "react-bootstrap";

import { API_URL, APP_NAME } from "../../statics";
import { UserContext } from "../../contexts";

export default function OrderDetail() {
  const { id } = useParams();
  const user = useContext(UserContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/orders/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrder(data?.data))
      .catch((err) => console.error(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Order ${id} - ${APP_NAME}`}</title>
      </Helmet>

      <h2 className="text-capitalize">Order Detail</h2>

      <Card>
        <Card.Body>
          <Card.Text>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{id}</td>
                  <td>2021-01-01</td>
                  <td>Processing</td>
                </tr>
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
