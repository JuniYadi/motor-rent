import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { API_URL } from "../../statics";

export default function Home() {
  const [category, setCategory] = useState({
    bebek: {
      stocks: 0,
      price_start: 0,
    },
    matic: {
      stocks: 0,
      price_start: 0,
    },
    sport: {
      stocks: 0,
      price_start: 0,
    },
  });

  useEffect(() => {
    const getStocks = async () => {
      const req = await fetch(`${API_URL}/motors`);

      if (req.status !== 200) {
        return;
      }

      // fetch data from API
      const resp = await req.json();
      const data = resp.data;

      const bebekData = data.find(
        (motor) => motor.name.toLowerCase() === "bebek"
      );
      const maticData = data.find(
        (motor) => motor.name.toLowerCase() === "matic"
      );
      const sportData = data.find(
        (motor) => motor.name.toLowerCase() === "sport"
      );

      // set data for state
      const categoryData = {
        bebek: {
          stocks: bebekData ? bebekData.stocks : 0,
          price_start: bebekData ? bebekData.price_start : 0,
        },
        matic: {
          stocks: maticData ? maticData.stocks : 0,
          price_start: maticData ? maticData.price_start : 0,
        },
        sport: {
          stocks: sportData ? sportData.stocks : 0,
          price_start: sportData ? sportData.price_start : 0,
        },
      };

      setCategory(categoryData);
    };

    console.log("running for the first time");
    getStocks();

    console.log(category);
  }, []);

  return (
    <>
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
            <div className="col">
              <div className="card shadow-sm">
                <img src="/motorbike_cup.png" alt="" />
                <div className="card-body">
                  <h5 className="card-title">Motor Bebek</h5>
                  <p className="card-text">
                    Motor Cup (Bebek), Sangat cocok untuk Anda yang ingin pergi
                    ke tempat yang tidak terlalu jauh dan hemat bahan bakar.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        disabled={category.bebek.stocks <= 0}
                      >
                        {category.bebek.stocks > 0 ? (
                          <>Order</>
                        ) : (
                          <>Stock Kosong</>
                        )}
                      </button>
                    </div>
                    <small>
                      <>Stock Sisa {category.bebek.stocks}</>
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card shadow-sm">
                <img src="/motorbike_matic.png" alt="" />

                <div className="card-body">
                  <h5 className="card-title">Motor Matic</h5>
                  <p className="card-text">
                    Motor Matic, Sangat cocok untuk Anda yang ingin mengendarai
                    motor dengan mudah dan nyaman.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        disabled={category.matic.stocks <= 0}
                      >
                        {category.matic.stocks > 0 ? (
                          <>Order</>
                        ) : (
                          <>Stock Kosong</>
                        )}
                      </button>
                    </div>
                    <small>
                      <>Stock Sisa {category.matic.stocks}</>
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card shadow-sm">
                <img src="/motorbike_sport.png" alt="" />

                <div className="card-body">
                  <h5 className="card-title">Motor Sport</h5>
                  <p className="card-text">
                    Motor Sport, Sangat cocok untuk Anda yang ingin pergi dengan
                    jarak yang jauh dan ingin merasakan sensasi berkendara yang
                    cepat.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        disabled={category.sport.stocks <= 0}
                      >
                        {category.sport.stocks > 0 ? (
                          <>Order</>
                        ) : (
                          <>Stock Kosong</>
                        )}
                      </button>
                    </div>
                    <small>
                      <>Stock Sisa {category.sport.stocks}</>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
