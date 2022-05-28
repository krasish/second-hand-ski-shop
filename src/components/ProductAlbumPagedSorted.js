import {
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {
  sortByDateAsc,
  sortByDateDesc,
  sortByPriceAsc,
  sortByPriceDesc,
} from "../model/sort";
import ProductAlbum from "./ProductAlbum";

const sortOptions = [
  "Date (Asc.)",
  "Date (Desc.)",
  "Price (Asc.)",
  "Price (Desc.)",
];

function ProductAlbumPagedSorted({
  products,
  elementsPerPage = 4,
  heading = "Ski",
}) {
  const [page, setPage] = useState(1);
  const [sortFunc, setSortFunc] = useState(() => sortByDateAsc);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (e, value) => {
    switch (e.target.value) {
      case sortOptions[0]:
        setSortFunc(() => sortByDateAsc);
        break;
      case sortOptions[1]:
        setSortFunc(() => sortByDateDesc);
        break;
      case sortOptions[2]:
        setSortFunc(() => sortByPriceAsc);
        break;
      case sortOptions[3]:
        setSortFunc(() => sortByPriceDesc);
        break;
      default:
        setSortFunc(() => sortByDateAsc);
    }
  };

  let pagesCount = Math.floor(products?.length / (elementsPerPage + 1)) + 1;

  return (
    <Grid
      item
      xs={12}
      sm={9}
      sx={{
        display: "flex",
        boxShadow: 5,
        justifyContent: "center",
        flexWrap: "wrap",
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{ width: "100%" }}
      >
        {heading}
      </Typography>
      <Box
        width="100%"
        sx={{
          pl: 3,
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "baseline",
        }}
      >
        <InputLabel variant="standard" sx={{ mr: 2 }}>
          Order by
        </InputLabel>
        <NativeSelect id="order-by" name="order-by" onChange={handleSortChange}>
          {sortOptions.map((so) => (
            <option key={so} value={so}>
              {so}
            </option>
          ))}
        </NativeSelect>
      </Box>
      <ProductAlbum
        products={products?.slice(
          elementsPerPage * (page - 1),
          elementsPerPage * page
        )}
        smallestCardSize={3}
        sortFunc={sortFunc}
      ></ProductAlbum>
      <Box py={2}>
        <Stack spacing={2}>
          <Pagination
            count={pagesCount}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
    </Grid>
  );
}

export default ProductAlbumPagedSorted;
