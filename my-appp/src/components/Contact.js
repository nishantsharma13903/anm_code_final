import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Contact = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 fw-bold" style={{ color: "#a05200" }}>
        Contact Us
      </h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card shadow-sm border-0" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-4">
              <h5 className="card-title text-center mb-4 fw-semibold">
                <i className="bi bi-envelope-paper-heart-fill me-2 text-warning"></i>
                Get in Touch
              </h5>
              <div className="contact-info fs-5">
                <p>
                  <i className="bi bi-building me-2 text-warning"></i>
                  <strong>Business:</strong>{" "}
                  <span className="text-muted">A&M PRINTS</span>
                </p>
                <p>
                  <i className="bi bi-geo-alt-fill me-2 text-info"></i>
                  <strong>Address:</strong>{" "}
                  <span className="text-muted">
                    19-4-340/53/2/B/1, Mahmood Nagar Colony,
                    Kishan Bagh, Attapur, Hyderabad - 500048, Telangana, India
                  </span>
                </p>
                <p>
                  <i className="bi bi-telephone-fill me-2 text-success"></i>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+919391252873" className="text-muted text-decoration-none">
                    +91 93912 52873
                  </a>
                </p>
                <p>
                  <i className="bi bi-envelope-at-fill me-2 text-danger"></i>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:anmprints01@gmail.com"
                    className="text-decoration-none text-muted"
                  >
                    anmprints01@gmail.com
                  </a>
                </p>
                <p>
                  <i className="bi bi-clock-fill me-2 text-primary"></i>
                  <strong>Business Hours:</strong>{" "}
                  <span className="text-muted">
                    Monday to Saturday: 10:00 AM – 7:00 PM <br />
                    Sunday: Closed
                  </span>
                </p>
                <p>
                  <i className="bi bi-instagram me-2 text-danger"></i>
                  <strong>Instagram:</strong>{" "}
                  <a
                    href="https://www.instagram.com/anmprints_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted text-decoration-none"
                  >
                    @anmprints_official
                  </a>
                </p>
                <p>
                  <i className="bi bi-facebook me-2 text-primary"></i>
                  <strong>Facebook:</strong>{" "}
                  <a
                    href="https://www.facebook.com/anmprintsofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted text-decoration-none"
                  >
                    facebook.com/anmprintsofficial
                  </a>
                </p>
                <p>
                  <i className="bi bi-whatsapp me-2 text-success"></i>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href="https://wa.me/919391252873"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted text-decoration-none"
                  >
                    93912 52873
                  </a>
                </p>
                <hr />
                <p className="text-center text-muted mt-3">
                  Need help or have a question? <br />
                  Feel free to call, message, or email us. <br />
                  We typically respond within 24 hours on working days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
