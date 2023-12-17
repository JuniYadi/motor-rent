import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { API_URL, APP_NAME } from "../../statics";

export default function Home() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getStocks = async () => {
      const req = await fetch(`${API_URL}/motors`);

      if (req.status !== 200) {
        return;
      }

      // fetch data from API
      const resp = await req.json();
      const data = resp.data;

      setCategory(data);
    };

    getStocks();
  }, []);

  return (
    <>
      <Helmet>
        <title className="text-capitalize">{`Homepage - ${APP_NAME}`}</title>
      </Helmet>

      <section className="py-2 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h4 className="fw-light">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Kami menyewakan motor dengan berbagai variasi",
                  1000,
                  "Kami menyewakan motor dengan kualitas terbaik",
                  1000,
                  "Kami menyewakan motor dengan harga terjangkau",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: "2em", display: "inline-block" }}
                repeat={Infinity}
              />
            </h4>
            <p className="lead text-body-secondary">
              Anda butuh motor untuk kegiatan sehari-hari? Atau Anda ingin
              liburan ke luar kota? Sewa motor di sini saja. Kami menyediakan
              motor dengan harga terjangkau dan kualitas terbaik. Kami juga
              menyediakan berbagai jenis motor, seperti motor bebek, motor
              matic, dan motor sport.
            </p>
            <p>
              <a href="#" className="btn btn-primary m-2">
                Order Sekarang
              </a>
              <a href="#" className="btn btn-success m-2">
                Punya Pertanyaan?
              </a>
            </p>
          </div>
        </div>
      </section>

      <div className="album bg-body-tertiary mb-4">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {category &&
              category.map((item, index) => {
                return (
                  <div className="col" key={index}>
                    <div className="card shadow-sm">
                      <img src={item.image} alt={item.name} />

                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              disabled={item.stocks <= 0}
                              onClick={() =>
                                navigate(`/motors/${item.name.toLowerCase()}`)
                              }
                            >
                              {item.stocks > 0 ? (
                                <>Pilih Tipe Motor</>
                              ) : (
                                <>Stock Kosong</>
                              )}
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
