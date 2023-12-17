import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sortBy from "sort-by";
import { Col, Row, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import { API_URL, APP_NAME } from "../../statics";
import { capitalize } from "../../utils/text";

export default function Motors() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [sort, setSort] = useState("price");

  useEffect(() => {
    fetch(`${API_URL}/motors?type_motor=${type}`)
      .then((res) => res.json())
      .then((res) => res.data)
      .then((res) => setCategory(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <>
      <Helmet>
        <title>{`Motor ${capitalize(type)} - ${APP_NAME}`}</title>
      </Helmet>

      <h2 className="text-capitalize">Motor {type}</h2>

      <div className="album bg-body-tertiary my-4">
        <div className="container">
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="SortBy">
              <Form.Label column sm={4}>
                Urutkan Motor Berdasarkan
              </Form.Label>
              <Col sm={8}>
                <Form.Select onChange={(e) => setSort(e.target.value)}>
                  <option value="name" selected={sort === "name"}>
                    Nama Motor (A-Z)
                  </option>
                  <option value="-name" selected={sort === "-name"}>
                    Nama Motor (Z-A)
                  </option>
                  <option value="price" selected={sort === "price"}>
                    Harga Termurah
                  </option>
                  <option value="-price" selected={sort === "-price"}>
                    Harga Termahal
                  </option>
                  <option value="stocks" selected={sort === "stocks"}>
                    Stok Paling Sedikit
                  </option>
                  <option value="-stocks" selected={sort === "-stocks"}>
                    Stok Paling Banyak
                  </option>
                </Form.Select>
              </Col>
            </Form.Group>
          </Form>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {category &&
              category.sort(sortBy(sort)).map((item, index) => {
                return (
                  <div className="col" key={index}>
                    <div className="card shadow-sm">
                      <img src={item.image} alt={item.name} />

                      <div className="card-body">
                        <h3 className="card-title">{item.name}</h3>
                        <p className="card-text">
                          Biaya Sewa{" "}
                          <span className="fw-bold">{rupiah(item.price)}</span>
                          /Hari
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              disabled={item.stocks <= 0}
                              onClick={() =>
                                navigate(
                                  `/app/order/new?mtId=${item.id}&name=${item.name}&category=${item.category}`
                                )
                              }
                            >
                              {item.stocks > 0 ? <>Order</> : <>Stock Kosong</>}
                            </button>
                          </div>
                          <small>
                            <>Tersedia {item.stocks} Motor</>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
