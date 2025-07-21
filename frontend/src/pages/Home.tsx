import { useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import Tools from "../components/Tools";

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  // Pre-warm the backend (Render free tier) by sending a ping request on initial load
  useEffect(() => {
    axios.get(`${apiUrl}/ping`).catch(() => {});
  }, []);

  return (
    <>
      <Hero />
      <Tools />
    </>
  );
};

export default Home;
