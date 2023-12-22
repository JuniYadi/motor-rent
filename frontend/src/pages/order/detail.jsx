import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Card, Col, Form, Row } from "react-bootstrap";

import { APP_NAME } from "../../statics";
import { rupiah } from "../../utils/currency";
import { metodePembayaran } from "../../utils/payments";
import { useFetchUser } from "../../hooks/useFetchUser";
import PaymentStatus from "../../components/PaymentStatus";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function OrderDetail() {
  const { id } = useParams();
  const { response: order, isLoading } = useFetchUser(`orders/${id}`);

  return (
    <>
      <Helmet>
        <title>{`Order Detail ${id} - ${APP_NAME}`}</title>
      </Helmet>

      <h2 className="text-capitalize">Order Detail {id}</h2>

      {isLoading && !order ? (
        <p>Loading...</p>
      ) : (
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
                    <PaymentStatus status={order?.status} />
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
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Tanggal Pengambilan Motor
                  </Form.Label>
                  <Col sm="8">
                    <p>
                      {dayjs(order?.pickup_date).format(
                        "DD MMMM YYYY HH:mm ZZ"
                      )}
                    </p>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Tanggal Pengembalian Motor
                  </Form.Label>
                  <Col sm="8">
                    <p>
                      {dayjs(order?.dropoff_date).format(
                        "DD MMMM YYYY HH:mm ZZ"
                      )}
                    </p>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mb-2">
            <Card.Header>Detail Motor</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Tipe Motor
                  </Form.Label>
                  <Col sm="8">
                    <p>{order?.motor_name}</p>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Biaya Sewa Motor / Hari
                  </Form.Label>
                  <Col sm="8">
                    <p>{order?.motor_price ? rupiah(order.motor_price) : 0}</p>
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
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Jaminan Identitas
                  </Form.Label>
                  <Col sm="8">
                    <p>{order?.identity.toUpperCase()}</p>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
}
