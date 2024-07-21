import React, { useEffect, useState } from "react";
import classes from "./dashboard.module.scss";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import axiosInstanceToken from "../../authentication/ApiClientToken";

const Dashboard = () => {
  const [cardData, setCardData] = useState([
    { title: "Main Course", count: 0, icon: RestaurantMenuIcon },
    { title: "Starter", count: 0, icon: RestaurantMenuIcon },
    { title: "Breakfast", count: 0, icon: RestaurantMenuIcon },
    { title: "Dssert", count: 0, icon: RestaurantMenuIcon },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSequentialApiCalls = async () => {
    setLoading(true);
    setError(null);

    try {
      // First API Call
      const firstResponse = await axiosInstanceToken.get("getStarterList");
      const strlistCount = firstResponse.data.length;

      // Second API Call
      const secondResponse = await axiosInstanceToken.get("getMainCourseList");
      const maincourselistCount = secondResponse.data.length;

      // Third API Call
      const thirdResponse = await axiosInstanceToken.get("getBreakfastList");
      const breakfastlistCount = thirdResponse.data.length;

      // Fourth API Call
      const fourthResponse = await axiosInstanceToken.get("getDssertList");
      const dssertlistCount = fourthResponse.data.length;

      // Update cardData state
      setCardData((prevCardData) =>
        prevCardData.map((card) => {
          switch (card.title) {
            case "Main Course":
              return { ...card, count: maincourselistCount };
            case "Starter":
              return { ...card, count: strlistCount };
            case "Breakfast":
              return { ...card, count: breakfastlistCount };
            case "Dssert":
              return { ...card, count: dssertlistCount };
            default:
              return card;
          }
        })
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSequentialApiCalls();
  }, []);

  return (
    <Container maxWidth="xl" className={classes.dashboardContainer}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Dashboard
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {cardData.map((data, index) => {
          const IconComponent = data.icon;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card className={classes.card}>
                <Box className={classes.cardIcon}>
                  <IconComponent />
                </Box>
                <CardContent className={classes.cardContent}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {data.title}
                  </Typography>
                  <Typography variant="h5">{data.count}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Dashboard;
