import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const Review = () => {
  const peopleReview = [
    {
      id: 1,
      name: "Sithu",
      time: "3 hours ago",
      review:
        "This foodie app is really good for me because it is really easy and useful for customer that why I really love it.",
      image: "/man1.png",
    },
    {
      id: 2,
      name: "Tin Cho",
      time: "1 week ago",
      review:
        "I was not familier with tech but I can use it. It can also QR image for every single table. That's why customer can order food and we don't need waiter for ordering",
      image: "/woman1.png",
    },
    {
      id: 3,
      name: "Zaw Min",
      time: "1 month ago",
      review:
        "This foodie app is really good for me because it is really easy and useful for customer that why I really love it.",
      image: "/man2.png",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center"
      }}
    >
      {peopleReview.map((item) => {
        return (
          <Card sx={{ maxWidth: { xs: "60%", md: 345 }, m: 2 }} key={item.id}>
            <CardHeader
              sx={{ fontSize: { xs: "12px", md: "20px" } }}
              avatar={<Avatar alt="Ted talk" src={item.image} />}
              title={item.name}
              subheader={item.time}
            />

            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                component="p"
                sx={{ fontSize: { xs: "12px", md: "20px" } }}
              >
                {item.review}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default Review;
