import React, { useEffect, useState } from "react";
import ApiClient from "../service/api-client";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProductAlbum from "../components/ProductAlbum";
import SkiAppBar from "../components/SkiAppBar";
import { Outlet } from "react-router-dom";

function Home({ settings, pages }) {
  const [ski, setSki] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchSkis() {
      try {
        const response = await ApiClient.fetchSkis();
        setSki(response);
      } catch (error) {
        setErrors(error);
      }
      // ...
    }
    fetchSkis();
  }, []);

  return (
    <>
      <main>
        <SkiAppBar settings={settings} pages={pages} />
        <Outlet />
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
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
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
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
