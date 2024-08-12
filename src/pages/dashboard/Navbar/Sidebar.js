import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../../../config/firebase";
import { useMediaQuery } from "react-responsive";
import logo from "../../../logo.png";
import "./sidebar.css";
import LeaderBoard from "../Leaderboard";

const Leftbar = (props) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const pageChange = props.pageChange;
  const [navShow, setNavShow] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/register");
  }, [user, loading]);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 769px)",
  });

  const checkbox = () => {
    let check = document.getElementById("nav-check");
    check.checked = false;
  };

  const signOut = () => {
    logout();
    navigate("/");
  };

  const linkStyle = {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  };

  return (
    <>
      {isDesktopOrLaptop && (
        <aside
          className="hidden md:block mx-auto w-full h-screen sticky top-0 z-40  bg-white border-b  dark:bg-gray-800"
          aria-label="Sidebar"
        >
          <div className="overflow-y-auto h-full py-4 px-2 lg:px-6 border-r  shadow-sm  ">
            <div className="lg:p-2">
              <div>
                <div className="nav-title">
                  <img src={logo} alt="" />
                  <div className="name" style={{
                    display: "flex",
                    flexDirection: "column",
                  }}>
                    <div className="firstpart">
                    UDGHOSH'<span>24</span>
                    </div>
                    <div className="secondpart" style={{
                      marginTop: "-15px",
                    }}>
                      <span style={{
                        color: "Blue",
                        fontSize: "13px",
                      }}>
                        CAMPUS AMBASSADOR
                      </span>
                      </div>

                  </div>
                </div>
                <br />
              </div>
              <div className="space-y-1 font-medium dark:text-white">
                <div className="text-[25px] text-gray-500">{props.name}</div>
                <div className="text-[25px] text-gray-500 uppercase">
                  {props.collage}
                </div>
              </div>
            </div>

            <ul className="space-y-2 mt-6">
              <li>
                <button
                  className="switchpage"
                  onClick={() => pageChange("profile")}
                  style={linkStyle}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="switchpage"
                  onClick={() => pageChange("leaderboard")}
                  style={linkStyle}
                >
                  Leaderboard
                </button>
              </li>
              <li style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: "250px",
                overflow: "hidden",
              }}>
                <img src={props.url} alt="" style={{
                }}/>
              </li>
              <br />
              <li>
                <button
                  className="switchpage"
                  onClick={signOut}
                  style={linkStyle}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </aside>
      )}

      {!isDesktopOrLaptop && (
        <div className="nav">
          <input type="checkbox" id="nav-check" />
          <div className="nav-header">
            <div className="nav-title" style={{
              textAlign: "center",
            }}>
            <div className="name" style={{
                    display: "flex",
                    flexDirection: "column",
                  }}>
                    <div className="firstpart">
                    UDGHOSH'<span>24</span>
                    </div>
                    <div className="secondpart" style={{
                      marginTop: "-5px",
                    }}>
                      <span style={{
                        color: "rgba(0, 0, 0, 0.5)",
                        fontSize: "13px",
                      }}>
                        CAMPUS AMBASSADOR
                      </span>
                      </div>

                  </div>
            </div>
          </div>
          <div className="nav-btn">
            <label htmlFor="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <div className="nav-links">
            <div className="space-y-1 font-medium dark:text-white">
              <div className="text-center text-[30px] text-gray-500 ">
                {props.name}
              </div>
              <div
                className="text-center text-[30px] text-gray-500 uppercase linksm"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  checkbox();
                  pageChange("profile")}}
              >
                Profile
              </div>
              <div
                className="text-center text-[30px] text-gray-500 uppercase linksm"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  checkbox();
                  pageChange("leaderboard")}}
              >
                Leaderboard
              </div>
              <div
                className="text-center text-[30px] text-gray-500 uppercase linksm"
                style={{ cursor: "pointer" }}
                onClick={signOut}
              >
                Sign Out
              </div>
            </div>
          </div>

          <div className="toggler" id="checkbox" onClick={checkbox}></div>
        </div>
      )}
    </>
  );
};

export default Leftbar;
