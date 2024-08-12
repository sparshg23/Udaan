import React, { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase"; // Import Firebase configurations
import { orderBy } from "lodash";
import { getDocs, query, collection } from "firebase/firestore";
export const LeaderBoard = () => {
    const [people, setPeople] = useState([]);
    const [peoplePerPage, setPeoplePerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPeople, setCurrentPeople] = useState([]);

    useEffect(() => {
        const fetchPeople = async () => {
            const peopleRef = collection(db, "UserScores24");
            try {
                const querySnapshot = await getDocs(peopleRef);
                const peopleData = [];
                querySnapshot.forEach((doc) => {
                    peopleData.push(doc.data());
                });
                peopleData.sort((a, b) => b.score - a.score);
                setPeople(peopleData);
            } catch (error) {
                console.error("Error fetching people: ", error);
            }
        };
        fetchPeople();
    }, []);

    useEffect(() => {
        const indexOfLastPerson = currentPage * peoplePerPage;
        const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
        setCurrentPeople(people.slice(indexOfFirstPerson, indexOfLastPerson));
    }, [currentPage, peoplePerPage, people]);

    const handlePageChange = (e) => {
        setCurrentPage(parseInt(e.target.value));
    };

    const handlePeoplePerPage = (e) => {
        setPeoplePerPage(parseInt(e.target.value));
    };

    const getdate = (timestamp) => {
        const date = timestamp.toDate();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    };

    return (
        <div
            className="leaderboard-container"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                margin: "20px auto",
                maxWidth: "800px",
                width: "90%",
            }}
        >
            <h2
                style={{
                    fontSize: "24px",
                    marginBottom: "10px",
                    color: "#333",
                }}
            >
                LeaderBoard
            </h2>
            <div
                className="select-options"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "20px",
                }}
            >
                <div
                    className="peopleperpagediv"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <label
                        htmlFor="peoplePerPage"
                        style={{
                            marginTop: "0px",
                        }}
                    >
                        People Per Page
                    </label>
                    <select
                        name="peoplePerPage"
                        id="peoplePerPage"
                        value={peoplePerPage}
                        onChange={handlePeoplePerPage}
                        style={{
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            backgroundColor: "#fff",
                            cursor: "pointer",
                            transition: "border-color 0.3s, box-shadow 0.3s",
                        }}
                    >
                        <option value="1">1</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <div
                    className="currentpagediv"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <label
                        htmlFor="currentPage"
                        style={{
                            marginTop: "0px",
                        }}
                    >
                        Current Page
                    </label>
                    <select
                        name="currentPage"
                        id="currentPage"
                        value={currentPage}
                        onChange={handlePageChange}
                        style={{
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            backgroundColor: "#fff",
                            cursor: "pointer",
                            transition: "border-color 0.3s, box-shadow 0.3s",
                        }}
                    >
                        {Array.from(
                            { length: Math.ceil(people.length / peoplePerPage) },
                            (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>

            <table
                className="leaderboard-table"
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr
                        style={{
                            textAlign: "left",
                        }}
                    >
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>LastSub</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPeople.map((person, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{person.Name}</td>
                            <td>{person.score}</td>
                            <td>
                                {person["lastSubmission"]
                                    ? getdate(person["lastSubmission"])
                                    : "Not Submitted"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderBoard;