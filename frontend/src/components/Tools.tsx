import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Tooltip,
  Box,
} from "@mui/material";

const features = [
  {
    feature: "Food Tracker",
    description:
      "Track your baby's daily food intake and view summaries by date.",
    path: "/food",
    image:
      "https://plus.unsplash.com/premium_photo-1734028798334-002cbff207a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    feature: "Sleep Tracker",
    description: "Log your baby's naps and overnight sleep patterns.",
    path: "/sleeptracker",
    image:
      "https://plus.unsplash.com/premium_photo-1680089161834-f5c024421ec1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGJhYnklMjBzbGVlcHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    feature: "Milestones",
    description: "Celebrate and record your baby's developmental milestones.",
    path: "/milestones",
    image:
      "https://media.istockphoto.com/id/865900638/photo/cute-baby-sings-with-open-mouth-while-playing-with-wooden-blocks.webp?a=1&b=1&s=612x612&w=0&k=20&c=lNB17is7tJlW_QBpX6W5GBkyoQkLTnJ6K4hmb2LdB3o=",
  },
  {
    feature: "Baby Items",
    description:
      "List and keep track of baby essentials and gear you own or need.",
    path: "/babyitems",
    image:
      "https://media.istockphoto.com/id/1303393070/photo/woman-packing-diaper-bag-in-maternity-hospital.webp?a=1&b=1&s=612x612&w=0&k=20&c=zuvwAcJn28roRgYA-AbNteH72wZ-RMRWFREgUm7eluI=",
  },
  {
    feature: "Appointments",
    description:
      "Manage doctor visits, vaccinations, and important baby appointments.",
    path: "/appointments",
    image:
      "https://images.unsplash.com/photo-1632053002434-b203dc8efb37?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhYnklMjBpbW11bml6YXRpb258ZW58MHx8MHx8fDA%3D",
  },
  {
    feature: "Todo List",
    description:
      "Stay organized with a parenting task checklist and reminders.",
    path: "/todolist",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9kbyUyMGxpc3R8ZW58MHx8MHx8fDA%3D",
  },
  {
    feature: "Tips",
    description:
      "Read and share parenting tips and helpful resources from the community.",
    path: "/tips",
    image:
      "https://images.unsplash.com/photo-1743437935056-a1a706476320?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhYnklMjBhZHZpY2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    feature: "Blog",
    description:
      "Read blog posts about baby care, routines, and parenting stories.",
    path: "/blog",
    image:
      "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

const Tools = () => {
  return (
    <>
      <Container>
        <Typography variant="h5" sx={{ my: 5, mb: 3 }}>
          Explore Tools
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)", // mobile: 2 columns
              sm: "repeat(4, 1fr)", // tablet: 4 columns
              md: "repeat(5, 1fr)", // desktop: 5 columns
            },
          }}
        >
          {features.map(({ feature, path, description, image }) => (
            <Tooltip
              key={feature}
              title={description}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
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
                    opacity: 0.8,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                  },
                },
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <CardActionArea
                  component={Link}
                  to={path}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={feature}
                    sx={{
                      height: 140,
                      width: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      minHeight: 90,
                    }}
                  >
                    <Typography variant="h6" fontSize={18}>
                      {feature}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Tooltip>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Tools;
