import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Table, Form, Col, Row } from "react-bootstrap";
import sortBy from "sort-by";

import { APP_NAME } from "../../statics";
import { rupiah } from "../../utils/currency";
import { Link } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";
import PaymentStatus from "../../components/PaymentStatus";

export default function OrderDetail() {
  const { response: order, isLoading } = useFetchUser(`orders`);
  const [sort, setSort] = useState("-pickup_date");

  return (
    <>
      <Helmet>
        <title>{`Order Lists - ${APP_NAME}`}</title>
      </Helmet>

      <h2 className="text-capitalize">Order Lists</h2>

      {isLoading && !order ? (
        <p>Loading...</p>
      ) : (
        <>
          <Card className="mb-2">
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="SortBy">
                  <Form.Label column sm={4}>
                    Urutkan Order List Berdasarkan
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Select onChange={(e) => setSort(e.target.value)}>
                      <option
                        value="pickup_date"
                        selected={sort === "pickup_date"}
                      >
                        Pick Up Date (Terlama)
                      </option>
                      <option
                        value="-pickup_date"
                        selected={sort === "-pickup_date"}
                      >
                        Pick Up Date (Terbaru)
                      </option>

                      <option
                        value="motor_name"
                        selected={sort === "motor_name"}
                      >
                        Nama Motor (A-Z)
                      </option>
                      <option
                        value="-motor_name"
                        selected={sort === "-motor_name"}
                      >
                        Nama Motor (Z-A)
                      </option>

                      <option value="total" selected={sort === "total"}>
                        Total (Kecil ke Besar)
                      </option>
                      <option value="-total" selected={sort === "-total"}>
                        Total (Besar ke Kecil)
                      </option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Form>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Pick Up</th>
                    <th>Return</th>
                    <th>Type Motor</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    order &&
                    order.sort(sortBy(sort)).map((item) => (
                      <tr key={item.id}>
                        <td>{item.pickup_date}</td>
                        <td>{item.dropoff_date}</td>
                        <td>{item.motor_name}</td>
                        <td>
                          <PaymentStatus status={item.status} />
                        </td>
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
      )}
    </>
  );
}
