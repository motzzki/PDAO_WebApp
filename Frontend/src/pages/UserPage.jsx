import React from "react";
import UserHeader from "../components/UserHeader";
import FooterUser from "../components/UserFooter";
import hehe from "../images/hehe.jpg";

const UserPage = () => {
  return (
    <div className="userpage-container">
      <main>
        <div className="user-header m-2">
          <img
            src={hehe}
            className="img-fluid w-100 h-100"
            alt="Responsive"
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* brsSSQEkXn */}
        <div className="userinfo mx-2">
          <div className="row">
            <div className="col-12 col-lg-8 col-md-6 px-3">
              <h1 className="text-center">Welcome to the User Page</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vitae nisi in nulla fermentum commodo. Integer quis
                magna sit amet libero commodo dapibus. Phasellus sit amet odio
                vel purus auctor tincidunt. Vivamus sollicitudin, velit non
                laoreet cursus, sapien ante convallis nunc, et fermentum velit
                arcu a elit. Duis in est libero. Cras auctor, erat vitae viverra
                consectetur, ante sapien suscipit ex, a gravida felis ligula et
                massa.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vitae nisi in nulla fermentum commodo. Integer quis
                magna sit amet libero commodo dapibus. Phasellus sit amet odio
                vel purus auctor tincidunt. Vivamus sollicitudin, velit non
                laoreet cursus, sapien ante convallis nunc, et fermentum velit
                arcu a elit. Duis in est libero. Cras auctor, erat vitae viverra
                consectetur, ante sapien suscipit ex, a gravida felis ligula et
                massa.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent vitae nisi in nulla fermentum commodo. Integer quis
                magna sit amet libero commodo dapibus. Phasellus sit amet odio
                vel purus auctor tincidunt. Vivamus sollicitudin, velit non
                laoreet cursus, sapien ante convallis nunc, et fermentum velit
                arcu a elit. Duis in est libero. Cras auctor, erat vitae viverra
                consectetur, ante sapien suscipit ex, a gravida felis ligula et
                massa.
              </p>
            </div>
            <div className="col-12 col-lg-4 col-md-6 my-3">
              <img
                src={hehe}
                className="img-fluid w-100 h-100"
                alt="Responsive"
              />
            </div>
          </div>
        </div>

        <div className="about m-2">
          <h1 className="text-center">ABOUT US</h1>
          <p className="my-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vitae nisi in nulla fermentum commodo. Integer quis magna sit amet
            libero commodo dapibus. Phasellus sit amet odio vel purus auctor
            tincidunt. Vivamus sollicitudin, velit non laoreet cursus, sapien
            ante convallis nunc, et fermentum velit arcu a elit. Duis in est
            libero. Cras auctor, erat vitae viverra consectetur, ante sapien
            suscipit ex, a gravida felis ligula et massa.
          </p>
        </div>

        <div className="contact-us m-2">
          <h1 className="text-center mt-5">Contact Us</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-danger">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </main>
      <FooterUser />
    </div>
  );
};

export default UserPage;
