import { useEffect } from "react";
import Hero from "../components/Hero";
import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const features = [
  {
    feature: "Food Tracker",
    description: "Track your baby's daily food intake and view summaries by date.",
    path: "/food",
  },
  {
    feature: "Sleep Tracker",
    description: "Log your baby's naps and overnight sleep patterns.",
    path: "/sleeptracker",
  },
  {
    feature: "Milestones",
    description: "Celebrate and record your baby's developmental milestones.",
    path: "/milestones",
  },
  {
    feature: "Baby Items",
    description: "List and keep track of baby essentials and gear you own or need.",
    path: "/babyitems",
  },
  {
    feature: "Appointments",
    description: "Manage doctor visits, vaccinations, and important baby appointments.",
    path: "/appointments",
  },
  {
    feature: "Todo List",
    description: "Stay organized with a parenting task checklist and reminders.",
    path: "/todolist",
  },
  {
    feature: "Tips",
    description: "Read and share parenting tips and helpful resources from the community.",
    path: "/tips",
  },
  {
    feature: "Blog",
    description: "Read blog posts about baby care, routines, and parenting stories.",
    path: "/blog",
  },
];

const Home = () => {
  // Pre-warm the backend (Render free tier) by sending a ping request on initial load
  useEffect(() => {
    axios.get(`${apiUrl}/ping`).catch(() => {});
  }, []);

  return (
    <>
      <Hero />
      <Container sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Explore Features
        </Typography>
        <Grid container spacing={3} mt={2}>
          {features.map(({ feature, path, description }) => (
            <Tooltip
              key={feature}
              title={description}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [100, 15],
                      },
                    },
                  ],
                },
                tooltip: {
                  sx: {
                    fontSize: "16px",
                    backgroundColor: "#c8f4c7",
                    color: "#000",
                    padding: "15px",
                    borderRadius: "18px",
                    opacity: 0.5,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center',
                  },
                },
              }}
            >
              {/* @ts-expect-error list of available features */}
              <Grid item xs={12} sm={6} md={4} key={feature}>
                <Card>
                  <CardActionArea component={Link} to={path}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontSize: "18px" }}>
                        {feature}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Tooltip>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
