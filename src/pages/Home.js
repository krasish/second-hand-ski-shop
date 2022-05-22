import React from "react";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProductAlbum from "../components/ProductAlbum";
import { useNavigate } from "react-router-dom";

function Home({ ski }) {
  const navigate = useNavigate();

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: "background.default",
            pt: 8,
            pb: 12,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Buy & Sell Ski Equipment Easily
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Join our online platform to buy second-hand ski and ski-boots or
              sell yours with just a few clicks.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
              <Button variant="outlined" onClick={() => navigate("/signin")}>
                Sign In{" "}
              </Button>
            </Stack>
          </Container>
          <ProductAlbum products={ski} />
        </Box>
      </main>
    </>
  );
}

Home.propTypes = {};

export default Home;
