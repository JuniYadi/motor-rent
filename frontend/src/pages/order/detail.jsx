import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Card, Col, Form, Row } from "react-bootstrap";
import axios from "axios";

import { API_URL, APP_NAME } from "../../statics";
import { UserContext } from "../../contexts";
import { rupiah } from "../../utils/currency";
import { metodePembayaran } from "../../utils/payments";

export default function OrderDetail() {
  const { id } = useParams();
  const user = useContext(UserContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function getData() {
      if (user && user.tokens) {
        const req = await axios.get(`${API_URL}/orders/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.tokens}`,
          },
        });

        if (req.data.data) {
          setOrder(req.data.data);
        } else {
          alert("Order not found");
        }
      }
    }

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Order Detail ${id} - ${APP_NAME}`}</title>
      </Helmet>

      <h2 className="text-capitalize">Order Detail {id}</h2>

      {order ? (
        <>
          <Card className="mb-2">
            <Card.Header>Detail Order</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Order ID
                  </Form.Label>
                  <Col sm="8">
                    <p>{order?.id}</p>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Status
                  </Form.Label>
                  <Col sm="8">
                    <p>{order?.status?.replace("_", " ")}</p>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Total Pembayaran
                  </Form.Label>
                  <Col sm="8">
                    <p>{rupiah(order?.total)}</p>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Metode Pembayaran
                  </Form.Label>
                  <Col sm="8">
                    <p>
                      {order?.payment
                        ? metodePembayaran.map((item) =>
                            item.slug === order?.payment ? item.name : null
                          )
                        : null}
                    </p>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Detail Penyewa Motor</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Nama
                  </Form.Label>
                  <Col sm="8">
                    <p>{order?.name}</p>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Email
                  </Form.Label>
                  <Col sm="8">
                    <p>{order?.email}</p>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Nomor Telpon
                  </Form.Label>
                  <Col sm="8">
                    <p>{order?.phone_number}</p>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
