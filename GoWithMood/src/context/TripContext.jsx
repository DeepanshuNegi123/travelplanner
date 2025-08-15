import React, { createContext, useContext, useEffect, useState } from "react";

const TripContext = createContext(undefined);

export const TripProvider = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // 👤 User state
  const [userId, setUserId] = useState(() => {
    const storedId = localStorage.getItem("userId");
    return storedId && storedId !== "undefined" && storedId !== "null" ? storedId : null;
  });

  const [userData, setUserData] = useState(undefined); // undefined means "still checking"

  // 🔁 Fetch userData whenever userId changes
  useEffect(() => {
    if (!userId || userId === "undefined" || userId === "null") {
      setUserData(null); // No user logged in
      localStorage.removeItem("userId"); // 🧹 Clean up corrupted localStorage
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:4002/api/auth/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setUserData(null); // Fallback to logged-out
      }
    };

    fetchUserData();
  }, [userId]);

  const toggleLogin = (open) => setIsLoginOpen(open);

  const planTrip = () => {
    if (!selectedMood || !budget || !duration) {
      alert("Please complete all steps to plan your trip.");
      return;
    }

    alert(`🎉 Planning your ${duration}-day ${selectedMood.toLowerCase()} trip with ₹${budget} budget!`);
  };

  const value = {
    selectedMood,
    setSelectedMood,
    budget,
    setBudget,
    duration,
    setDuration,
    isLoginOpen,
    toggleLogin,
    planTrip,
    userId,
    setUserId,
    userData,
    setUserData,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
};
