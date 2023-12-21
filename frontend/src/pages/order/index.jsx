import { Helmet } from "react-helmet-async";
import { Card, Table } from "react-bootstrap";

import { APP_NAME } from "../../statics";
import { rupiah } from "../../utils/currency";
import { Link } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";

export default function OrderDetail() {
  const { response: order } = useFetchUser(`orders`);

  return (
    <>
      <Helmet>
        <title>{`Order Lists - ${APP_NAME}`}</title>
      </Helmet>

      <h2 className="text-capitalize">Order Lists</h2>

      {order ? (
        <>
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
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
