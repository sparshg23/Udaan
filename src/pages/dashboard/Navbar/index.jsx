import React from "react";
import 'bootstrap';
import 'react-bootstrap';
import './navbar.css';


export default function Section() {
  return (
    <>
    <div className="App">
      <nav className="navbar  navbar-expand-lg .bg-gradient">
        <div className="container-fluid">
          <img
            src="./logo.png"
            alt="Udghosh Logo"
            width="50"
            className="d-inline-block align-text-top navbar-logo ms-5"
          />

          <button
            className="btnn d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasResponsive"
            aria-controls="offcanvasResponsive"
          >
          <span className="navbar-toggler-icon"><i class="fa-solid fa-bars"></i></span>
          </button>

          <div
            className="offcanvas-lg offcanvas-end"
            tabindex="-1"
            id="offcanvasResponsive"
            aria-labelledby="offcanvasResponsiveLabel"
          >
            <div className="offcanvas-header">
              <img
                src="./logo.png"
                alt="Udghosh Logo"
                width="100"
                className="offcanvas-title ms-auto me-auto"
              />
              <button
                type="button"
                // className="btn-close "
                data-bs-dismiss="offcanvas"
                data-bs-target="#offcanvasResponsive"
                aria-label="Close"
               
              ><i style={{fontSize: '30px'}} class="bi bi-x-circle-fill"></i></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav mb-lg-0">
                <li className="nav-item me-3">
                  <a
                    className="nav-link"
                    href="#"
                    
                  >
                    HOME
                  </a>
                </li>
                <li className="nav-item me-3">
                  <a
                    className="nav-link"
                    href="#why"
                    
                  >
                    WHY CA
                  </a>
                </li>
                <li className="nav-item me-3">
                  <a
                    className="nav-link"
                    href="#responsiblity"
                    
                  >
                    RESPONSIBLITIES 

                  </a>
                </li>
                <li className="nav-item me-3">
                  <a
                    className="nav-link"
                    href="#perks"
                    
                  >
                  PERKS & SPONSORS
                  </a>
                </li>
                
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#contact"
                    
                  >
                    CONTACT US
                  </a>
                </li>
              </ul>
              <a href='/register'> 
              <button
                type="button"
                style={{ color: "white", border: '1px solid blue', borderRadius: '10px', margin:'5px 0 0 8px', padding: '5px', backgroundColor: 'blue'}}
              >
                Register Now
              </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
    </>
  );
}
