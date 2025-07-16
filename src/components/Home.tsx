import React from "react";

const Home = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div>
      <h1>Welcome to the home page!</h1>
    </div>
  );
};

export default Home;
