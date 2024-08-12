import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toast, Toaster } from "react-hot-toast";
import {
  auth,
  db,
  logout,
  setProfile,
  getProfile,
  uploadImage,
} from "../config/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Sidebar from "./dashboard/Navbar/Sidebar";
import Leaderboard from "./dashboard/Leaderboard";
import Rewards from "./dashboard/Rewards";
import "../index.css";
import { useMediaQuery } from "react-responsive";
import { copy } from "clipboard-copy";
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <ul style={{ listStyle: "none", display: "flex", padding: 0 }}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            style={{
              margin: "0 5px",
              cursor: "pointer",
              padding: "5px 10px",
              backgroundColor:
                currentPage === number ? "#3B82F6" : "transparent",
              color: currentPage === number ? "#FFFFFF" : "#3B82F6",
              borderRadius: "5px",
              fontWeight: currentPage === number ? "bold" : "normal",
            }}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProfileNTasks(props) {
  //
  const user = props.user;
  const college = props.college;
  const email = props.email;
  const name = props.name;
  const phone = props.phone;
  const url = props.url;
  const token = props.token;
  //

  const [score, setScore] = useState(0);
  const [reff, setReff] = useState(0);
  // const [data10, setData10] = useState("");

  const [image, setImage] = useState(null);
  const [tskurl, settskUrl] = useState(null);
  const [idx, setidx] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [Status, setStatus] = useState(0);

  const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter tasks based on the current page
  const currentTasks = tasks.slice(startIndex, endIndex);

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // let id=user.uid
  const navigate = useNavigate();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const upload = async (task) => {
    setStatus(1);
    console.log(task);

    if (idx === task) {
      settskUrl(await uploadImage(image, user.uid, user, task));
      toast.success("Uploaded Successfully");
    } else toast.error("Please select a file");
    console.log(tskurl);
    setStatus(0);
    getUserTasks();
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 769px)",
  });

  // get user tasks everytime the user changes

  // let Tasks;
  const getTasks = async () => {
    const y = collection(db, "Tasks24");
    let docs = await getDocs(y);
    // const task=Tasks.doc.finc
    // console.log(docs);
    let finaldocs = [];
    let i = 0;
    docs.forEach((doc) => {
      finaldocs.push(doc.data());
      finaldocs[i] = { ...finaldocs[i], taskid: doc.id };
      console.log(doc.id);
      i = i + 1;
    });
    // sort by datetime doc.taskDeadline.toDate()
    finaldocs.sort((a, b) => {
      const today = new Date();
      if (today > a.taskDeadline.toDate() && today > b.taskDeadline.toDate()) {
        return a.taskDeadline.toDate() - b.taskDeadline.toDate();
      } else if (
        today > a.taskDeadline.toDate() &&
        today < b.taskDeadline.toDate()
      ) {
        return 1;
      } else if (
        today < a.taskDeadline.toDate() &&
        today > b.taskDeadline.toDate()
      ) {
        return -1;
      } else {
        return a.taskDeadline.toDate() - b.taskDeadline.toDate();
      }
    });
    console.log(finaldocs);
    if (finaldocs.length) setTasks(finaldocs);
    console.log(tasks);
  };

  // const isApproved=async (id)=>{
  //   let s=await getDoc(doc(db,"Submissions24",id));
  //   // console.log(s.data());
  //   return 0;
  // }
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      navigator.clipboard.writeText(token); // Copy the referralToken to the clipboard
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset the copy status after 2 seconds
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const getUserTasks = async () => {
    let y;
    // let tasksDone
    if (user) {
      y = doc(db, "UserScores24", user.uid);
      console.log(user.uid);
      const userRef = await getDoc(y);
      // tasksDone=userRef.data().tasks
      setTasksDone(userRef.data().tasks);
      console.log(tasksDone);
      setScore(userRef.data().score);
      setReff(userRef.data().referrals);
      console.log(score);
    }
  };
  useEffect(() => {
    getUserTasks();
    getTasks();
  }, [user]);
  return (
    <>
      <div className="p-3">
        <div className="maitn1">
          {/* toaster */}
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 2000,
            }}
          />
          <div className="rewards1">
            <p>Your Score is: {score} </p>
            <p>Referral Count: {reff} </p>
          </div>
          <br />
          {!isDesktopOrLaptop && (
            <div
              className="idcard"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: "300px",
                overflow: "hidden",
              }}
            >
              <img className="imgurl" src={url} />
            </div>
          )}
          <table class="styled-table1">
            <thead>
              <tr>
                <th>Field</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm">
              <tr>
                <td>Name</td>
                <td>{name}</td>
              </tr>

              <tr>
                <td>Email Id</td>
                <td>{email}</td>
              </tr>

              <tr>
                <td>Phone Number</td>
                <td>{phone}</td>
              </tr>

              <tr>
                <td>College</td>
                <td>{college}</td>
              </tr>
              <tr>
                <td>Invite via Referral Code</td>
                <td>{token}
                <button
                  className="btn btn-primary ml-3"
                  onClick={copyToClipboard}
                  disabled={isCopied}
                  style={{ backgroundColor:"transparent", color:"blue", border:"none"}}
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
                </td>
                
              </tr>
            </tbody>
          </table>
          <div className="rewards">
            <p>Current Tasks</p>
          </div>
          <table className="styled-table text-xs md:text-sm">
            <thead>
              <tr className="parentrow">
                <th>Id</th>
                <th>Task</th>
                <th>Deadline</th>
                <th>Submission</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((doc) => (
                <React.Fragment key={doc.taskid}>
                  <tr>
                    <td>{doc.taskid.substring(0, 4)}</td>
                    <td>
                      {doc.taskType}
                      <br />
                      {doc.taskLink !== "" && (
                        <a
                          href={doc.Link}
                          target="_blank"
                          className=" text-xs md:text-sm"
                        >
                          <span style={{ color: "#3B82F6" }}>Link</span>
                        </a>
                      )}
                    </td>
                    <td>
                      {doc.taskDeadline.toDate().getDate() +
                        "-" +
                        (doc.taskDeadline.toDate().getMonth() + 1) +
                        "-" +
                        doc.taskDeadline.toDate().getFullYear()}
                      <br />
                      {("0" + doc.taskDeadline.toDate().getHours()).slice(-2) +
                        ":" +
                        ("0" + doc.taskDeadline.toDate().getMinutes()).slice(
                          -2
                        )}
                    </td>
                    {tasksDone[doc.taskid] &&
                      tasksDone[doc.taskid].approved === 1 && (
                        //  dark orange
                        <td
                          style={{
                            color: "rgba(209, 112, 0, 1)",
                          }}
                        >
                          <span>
                            <i
                              className="fa fa-clock-o faa-tada animated"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Approval Pending
                        </td>
                      )}
                    {tasksDone[doc.taskid] &&
                      tasksDone[doc.taskid].approved === 2 && (
                        <td style={{ color: "#10B981" }}>
                          <span>
                            <i
                              className="fa fa-check-circle faa-tada animated"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Approved
                        </td>
                      )}
                    {(!tasksDone[doc.taskid] ||
                      (tasksDone[doc.taskid] &&
                        tasksDone[doc.taskid].approved === 0)) &&
                      new Date() < doc.taskDeadline.toDate() && (
                        <td className="mb-6">
                          <label
                            className="block mb-2 text-sm"
                            htmlFor="file_input"
                          >
                            {tasksDone[doc.taskid] ? "Upload Again" : "Upload"}
                          </label>
                          <input
                            disabled={Status}
                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file_input"
                            type="file"
                            onChange={(e) => {
                              setImage(e.target.files[0]);
                              setidx(doc.taskid);
                            }}
                          />
                          <button
                            disabled={Status}
                            onClick={() => {
                              upload(doc.taskid);
                            }}
                          >
                            Upload
                          </button>
                        </td>
                      )}
                    {!tasksDone[doc.taskid] &&
                      new Date() > doc.taskDeadline.toDate() && (
                        <td className="deadline" style={{ color: "#EF4444" }}>
                          <span>
                            <i
                              className="fa fa-exclamation-circle faa-tada animated"
                              aria-hidden="true"
                            ></i>
                          </span>
                          Deadline Passed
                        </td>
                      )}
                    <td>{doc.taskPoints}</td>
                  </tr>
                  <tr className="parentrow">
                    <td
                      colSpan={5}
                      style={{
                        padding: "5px 0",
                      }}
                    >
                      <p
                        className="taskDescription  text-xs md:text-sm"
                        style={{
                          textAlign: "left",
                          color: "rgba(0,0,0, 0.8)",
                          padding: "0 5%",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "rgba(0,0,0, 1)",
                          }}
                        >
                          Description:
                        </span>{" "}
                        {doc.taskDescription}
                      </p>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Render the pagination component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [currpage, setcurrpage] = useState("profile");

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    else {
      sun();
    }
  }, [user, loading]);

  const sun = async () => {
    const snap = await getDoc(doc(db, "NewUser/", user.uid));

    if (snap.exists()) {
      // console.log(typeof(snap.data()['fb']));
      setCollege(snap.data()["college"]);
      setEmail(snap.data()["email"]);
      setName(snap.data()["name"]);
      setPhone(snap.data()["phone"]);
      setUrl(snap.data()["url"]);
      console.log(snap.data()["referralToken"]);
      setToken(snap.data()["referralToken"]);
      console.log(token);
      return snap;
    } else {
      console.log("No such document");
    }
  };

  const pageChange = (page) => {
    setcurrpage(page);
  };

  return (
    <div className="flex flex-col md:flex-row maitn1">
      <div className="basis-1/4">
        <Sidebar
          name={name}
          collage={college}
          url={url}
          pageChange={pageChange}
        />
      </div>
      <div
        className="basis-3/4"
        style={{
          minHeight: "95vh",
        }}
      >
        {currpage === "profile" ? (
          <ProfileNTasks
            user={user}
            college={college}
            email={email}
            name={name}
            phone={phone}
            url={url}
            token={token}
          />
        ) : currpage === "leaderboard" ? (
          <Leaderboard />
        ) : currpage === "rewards" ? (
          <Rewards />
        ) : (
          <div className="err">
            <h1>Error: 404</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export function reload() {
  window.location.reload();
}
