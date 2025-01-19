"use client"

import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { database, ref, onValue, update } from "../firebase";
import { Messaging } from "react-cssfx-loading";
import { usePathname, useRouter } from "next/navigation";

const IssuesPage = () => {
  const auth = getAuth(app);
  const [userId, setId] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const pathname = usePathname()
  const router = useRouter()
  const [userLocation, setUserLocation] = useState({ lat: null, long: null });
  const [filter, setFilter] = useState({
    tag: "all",
    madeByYou: false,
    category: "all", // New filter for categories
  });
  const [filteredIssues, setFilteredIssues] = useState([]);

  // Fetch user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setId(user.uid);
      } else {
        if (pathname !== "/login" && pathname !== "/signup") {
          router.push("/login");
        }
      }
    });
  }, [userId]);

  // Fetch issues data from Firebase
  // Fetch issues data from Firebase
useEffect(() => {
  const d = ref(database, "posts");
  onValue(d, (snapshot) => {
    const rawData = snapshot.val();
    if (rawData) {
      const transformedData = Object.keys(rawData).map((key) => ({
        id: key,
        description: rawData[key].description,
        src: rawData[key].imgUrl,
        lat: rawData[key].lat,
        long: rawData[key].lon,
        tag: rawData[key].tag,
        madeBy: rawData[key].userUID,
        madeByName: rawData[key].userName,
        title: rawData[key].title,
        issue: rawData[key].issue, 
        time: rawData[key].milliseconds,
        dist: rawData[key].district
      }));
      transformedData.sort((a, b) => b.time - a.time);
      setData(transformedData);
    }
    setLoad(false);
  });
}, []);


  // Fetch user location
  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error fetching location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchUserLocation();
  });

  // Apply filters
  useEffect(() => {
    const applyFilters = () => {
      if (userLocation.lat === null || userLocation.long === null) return;

      const filtered = data.filter((issue) => {
        const distance = getDistance(
          userLocation.lat,
          userLocation.long,
          issue.lat,
          issue.long
        );
        const isWithinRadius = distance <= 5;

        const matchesTag =
          filter.tag === "all" || issue.tag === filter.tag;

        const matchesMadeByYou =
          !filter.madeByYou || issue.madeBy === userId;

        const matchesCategory =
          filter.category === "all" || issue.issue === filter.category;
        return isWithinRadius && matchesTag && matchesMadeByYou && matchesCategory;
      });

      setFilteredIssues(filtered);
    };

    applyFilters();
  }, [filter, data, userLocation, userId]);

  const markAsCompleted = (id) => {
    // Find the issue with the given ID
    const completedIssue = filteredIssues.find((issue) => issue.id === id);
  
    if (!completedIssue) {
      console.error("Issue not found.");
      return;
    }
  
    // Update the issue locally
    setFilteredIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, pending: false } : issue
      )
    );
  
    // Update the issue in the Firebase database
    const issueRef = ref(database, `posts/${id}`);
    update(issueRef, { tag: "Completed" })
      .then(() => {
        console.log(`Issue with id ${id} marked as completed in Firebase.`);
  
        // Update the score for the district
        const districtRef = ref(database, `Main/Districts/${completedIssue.dist}`);
        onValue(
          districtRef,
          (snapshot) => {
            const districtData = snapshot.val();
            if (districtData && typeof districtData.score === "number") {
              const currentScore = districtData.score;
              update(districtRef, { score: currentScore + 10 })
                .then(() => {
                  console.log(
                    `Score updated for district "${completedIssue.dist}". New score: ${
                      currentScore + 10
                    }`
                  );
                })
                .catch((error) => {
                  console.error("Error updating district score in Firebase:", error);
                });
            } else {
              console.error(
                `District "${completedIssue.dist}" not found or score is not valid.`
              );
            }
          },
          { onlyOnce: true } // Fetch the current score only once
        );
      })
      .catch((error) => {
        console.error("Error updating issue in Firebase:", error);
      });
  };
  
  
  

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const timeAgo = (milliseconds) => {
    const now = Date.now();
    const timeDiff = now - milliseconds;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Issues Around You
      </h1>

      <div className="flex justify-center gap-6 mb-8">
        <div className="flex items-center space-x-2">
          <label className="text-lg text-gray-600">Filter by Tag:</label>
          <select
            className="p-2 border rounded-md"
            value={filter.tag}
            onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
          >
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filter.madeByYou}
            onChange={(e) =>
              setFilter({ ...filter, madeByYou: e.target.checked })
            }
            className="h-5 w-5"
          />
          <label className="text-lg text-gray-600">Made by You</label>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-lg text-gray-600">Filter by Category:</label>
          <select
            className="p-2 border rounded-md"
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="all">All</option>
            <option value="Garbage">Garbage</option>
            <option value="Telephone Wires">Telephone Wires</option>
            <option value="Electricity">Electricity</option>
            <option value="Road">Road</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>

      {!load && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {filteredIssues.map((issue1) => (
            <div
              key={issue1.id}
              className={`p-4 rounded-lg shadow-md bg-white ${
                issue1.tag === "Pending"
                  ? "border-l-4 border-orange-500"
                  : "border-l-4 border-green-500"
              }`}
            >
              <img
                src={issue1.src}
                alt={issue1.title}
                className="w-full h-[230px] object-cover rounded-t-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-[5px]">
                {issue1.title}
              </h2>
              <p className="text-gray-600 mb-[20px]">{issue1.description}</p>
              <div className="flex items-center mb-[5px]">
                <p className="text-gray-600 mr-[5px]">Progress: </p>
                <p
                  className={`p-[6px] rounded-[20px] text-white px-[20px] ${
                    issue1.tag === "Pending"
                      ? "bg-orange-500 "
                      : "bg-green-500"
                  }`}
                >
                  {issue1.tag}
                </p>
              </div>
              <p className="text-gray-600">Created by: {issue1.madeByName}</p>
              <p className="text-gray-600 mt-0">
                Created {timeAgo(issue1.time)}
              </p>
              <p className="p-[6px] rounded-[20px] px-[20px] bg-[#e3e3e3] w-fit mt-[20px]">
                {issue1.issue}
              </p>
              {issue1.tag === "Pending" && issue1.madeBy === userId && (
                <button
                  onClick={() => markAsCompleted(issue1.id)}
                  className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {load && (
        <div className="flex items-center justify-center h-[70vh]">
          <Messaging color="grey" width="20px" height="20px" duration="0.5s" />
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
