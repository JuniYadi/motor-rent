import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, Row, Form, Col, Button } from "react-bootstrap";

import { API_URL, APP_NAME } from "../../statics";
import { rupiah } from "../../utils/currency";
import { UserContext } from "../../contexts";

import slugify from "slugify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { metodePembayaran } from "../../utils/payments";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function OrderNew() {
  const user = useContext(UserContext);
  const [motor, setMotor] = useState({
    id: "",
    image: "",
    name: "",
    price: "",
  });
  const [order, setOrder] = useState({
    motor_id: "",
    motor_name: "",
    motor_price: "",
    days: 1,
    name: "",
    email: "",
    phone_number: "",
    identity: "",
    pickup_location_id: "",
    pickup_location_fee: 0,
    pickup_date: "",
    dropoff_location_id: "",
    dropoff_location_fee: 0,
    dropoff_date: "",
    payment: "",
  });
  const [pickupDate, setPickupDate] = useState([
    dayjs().format(),
    dayjs().add(1, "day").format(),
  ]);
  const [location, setLocation] = useState([]);
  const [stock, setStock] = useState(0);
  const [validated, setValidated] = useState(null);

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const category = searchParams.get("category");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/motors/${slugify(name.toLocaleLowerCase())}`)
      .then((res) => res.json())
      .then((res) => {
        setMotor(res.data);
        setOrder({
          ...order,
          motor_id: res.data.id,
          motor_name: res.data.name,
          motor_price: res.data.price,
          name: user?.name,
          email: user?.email,
          phone_number: user?.phone_number,
        });
        setStock(1);
      });

    fetch(`${API_URL}/locations`)
      .then((res) => res.json())
      .then((res) => setLocation(res.data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOrder({
      ...order,
      days: dayjs(pickupDate[1]).diff(pickupDate[0], "day"),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupDate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(false);

      event.stopPropagation();
    } else {
      setValidated(true);

      try {
        const req = await fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.tokens}`,
          },
          body: JSON.stringify({
            ...order,
            email:
              user &&
              user.email &&
              order.email &&
              order.email !== "" &&
              order.email !== user.email
                ? order.email
                : user.email,
            name:
              user &&
              user.name &&
              order.name &&
              order.name !== "" &&
              order.name !== user.name
                ? order.name
                : user.name,
            phone_number:
              user &&
              user.phone_number &&
              order.phone_number &&
              order.phone_number !== "" &&
              order.phone_number !== user.phone_number
                ? order.phone_number
                : user.phone_number,
            pickup_date: dayjs(pickupDate[0]).format(),
            dropoff_date: dayjs(pickupDate[1]).format(),
          }),
        });

        const res = await req.json();

        if (req.status !== 200) {
          throw new Error(res.message);
        } else {
          if (order.payment === "cash") {
            navigate(`/order/${res.data.id}`);
          } else {
            window.location.href = res.data.paymentUrl;
          }
        }
      } catch (e) {
        console.error(e.message);
        alert("Maaf, terjadi kesalahan. Silahkan coba lagi.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Order Sewa Motor ${name} - ${APP_NAME}`}</title>
      </Helmet>

      <h2 className="text-capitalize">
        Order Sewa Motor {name} ({category})
      </h2>

      {stock <= 0 ? (
        <p>Maaf, motor yang anda cari tidak tersedia.</p>
      ) : (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Card className="m-2">
            <Card.Header>Detail Penyewa Motor</Card.Header>
            <Card.Body>
              <Form.Group as={Row} className="mb-3" controlId="fullName">
                <Form.Label column sm="4">
                  Nama Lengkap (Sesuai Identitas)
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    defaultValue={user?.name}
                    onChange={(e) =>
                      setOrder({ ...order, name: e.target.value })
                    }
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="identity">
                <Form.Label column sm="4">
                  Jaminan Identitas (KTP/SIM/Paspor)
                </Form.Label>
                <Col sm="8">
                  <Form.Select
                    onChange={(e) =>
                      setOrder({ ...order, identity: e.target.value })
                    }
                    required
                  >
                    <option value="">Pilih Identitas</option>
                    <option value="ktp">KTP</option>
                    <option value="sim">SIM</option>
                    <option value="paspor">Paspor</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="email">
                <Form.Label column sm="4">
                  Email
                </Form.Label>
                <Col sm="8">
                  <p>{user?.email}</p>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="phoneNumber">
                <Form.Label column sm="4">
                  Nomor Telpon
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="text"
                    defaultValue={user?.phone_number}
                    onChange={(e) =>
                      setOrder({ ...order, phone_number: e.target.value })
                    }
                    required
                  />
                  <Form.Text className="text-muted">
                    Untuk mempermudah kami menghubungi anda, pastikan nomor
                    telpon yang anda masukkan benar dan aktif.
                  </Form.Text>
                </Col>
              </Form.Group>
            </Card.Body>
          </Card>

          <Card className="m-2">
            <Card.Header>Detail Sewa Motor</Card.Header>
            <Card.Body>
              <Form.Group as={Row} className="mb-3" controlId="typeBike">
                <Form.Label column sm="4">
                  Tipe Motor
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    plaintext
                    defaultValue={`${name} (${category})`}
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="rentalPrice">
                <Form.Label column sm="4">
                  Biaya Sewa Perhari
                </Form.Label>
                <Col sm="8">
                  <p>{rupiah(motor && motor.price ? motor.price : 0)}</p>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="datePickup">
                <Form.Label column sm="4">
                  Pilih Tanggal Pengambilan Motor
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="datetime-local"
                    min={dayjs(pickupDate[0]).format("YYYY-MM-DDThh:mm")}
                    max={dayjs(pickupDate[1])
                      .add("7", "days")
                      .format("YYYY-MM-DDThh:mm")}
                    onChange={(e) =>
                      setPickupDate([e.target.value, pickupDate[1]])
                    }
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="dateReturn">
                <Form.Label column sm="4">
                  Pilih Tanggal Pengembalian Motor
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    type="datetime-local"
                    min={dayjs(pickupDate[0])
                      .add("1", "days")
                      .format("YYYY-MM-DDThh:mm")}
                    max={dayjs(pickupDate[1])
                      .add("30", "days")
                      .format("YYYY-MM-DDThh:mm")}
                    onChange={(e) =>
                      setPickupDate([pickupDate[0], e.target.value])
                    }
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="F">
                <Form.Label column sm="4">
                  Total Hari Sewa
                </Form.Label>
                <Col sm="8">
                  <p>{`${order.days} Hari`}</p>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="locationPickup">
                <Form.Label column sm="4">
                  Lokasi Pengambilan Kendaraan
                </Form.Label>
                <Col sm="8">
                  <Form.Select
                    onChange={(e) => {
                      const [id, price] = e.target.value.split("-");
                      setOrder({
                        ...order,
                        pickup_location_id: id,
                        pickup_location_fee: price,
                      });
                    }}
                    required
                  >
                    <option value="">Pilih Lokasi</option>
                    {location.map((item, index) => {
                      return (
                        <option key={index} value={`${item.id}-${item.price}`}>
                          {item.name} (Biaya: {rupiah(item.price)})
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="locationDropoff">
                <Form.Label column sm="4">
                  Lokasi Pengembalian Kendaraan
                </Form.Label>
                <Col sm="8">
                  <Form.Select
                    onChange={(e) => {
                      const [id, price] = e.target.value.split("-");
                      setOrder({
                        ...order,
                        dropoff_location_id: id,
                        dropoff_location_fee: price,
                      });
                    }}
                    required
                  >
                    <option value="">Pilih Lokasi</option>
                    {location.map((item, index) => {
                      return (
                        <option key={index} value={`${item.id}-${item.price}`}>
                          {item.name} (Biaya: {rupiah(item.price)})
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="price">
                <Form.Label column sm="4">
                  Total Biaya
                </Form.Label>
                <Col sm="8">
                  <p>
                    {rupiah(
                      motor && motor.price
                        ? motor.price * order.days +
                            (parseInt(order.pickup_location_fee) +
                              parseInt(order.dropoff_location_fee))
                        : 0
                    )}
                  </p>
                  <Form.Text className="text-muted">
                    Biaya sewa motor perhari x jumlah hari sewa + (biaya lokasi
                    penjemputan + biaya lokasi pengembalian)
                  </Form.Text>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="payment">
                <Form.Label column sm="4">
                  Metode Pembayaran
                </Form.Label>
                <Col sm="8">
                  <Form.Select
                    onChange={(e) =>
                      setOrder({ ...order, payment: e.target.value })
                    }
                    required
                  >
                    <option value="">Pilih Metode Pembayaran</option>
                    {metodePembayaran.map((item, index) => {
                      return (
                        <option key={index} value={item.slug}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Card.Body>
          </Card>

          <Card className="m-2">
            <p>Untuk pembayaran cash, anda dapat membayar di lokasi.</p>
            <p>
              Untuk pembayaran virtual account, anda akan diarahkan ke halaman
              pembayaran. Silahkan ikuti instruksi yang ada.
            </p>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Card>
        </Form>
      )}
    </>
  );
}
