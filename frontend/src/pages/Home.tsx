import { useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import Features from "../components/Features";

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  // Pre-warm the backend (Render free tier) by sending a ping request on initial load
  useEffect(() => {
    axios.get(`${apiUrl}/ping`).catch(() => {});
  }, []);

  return (
    <>
      <Hero />
      <Features />
    </>
  );
};

export default Home;
