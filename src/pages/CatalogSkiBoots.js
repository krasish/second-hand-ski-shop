import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import ProductAlbumPagedSorted from "../components/ProductAlbumPagedSorted";
import { useSearchParams } from "react-router-dom";
import {
  CATEGORY_SEARCH_PARAM,
  MANUFACTURER_SEARCH_PARAM,
  PRICE_FROM_SEARCH_PARAM,
  PRICE_TO_SEARCH_PARAM,
  SIZE_FROM_SEARCH_PARAM,
  SIZE_TO_SEARCH_PARAM,
} from "../model/search-params";
import { SKI_BOOT_MANUFACTURERS } from "../components/SkiBootForm";

function CatalogSkiBoots({ skiBoots }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredSki, setFilteredSki] = useState([]);

  useEffect(() => {
    function filterCategories(ski) {
      const category = searchParams.get(CATEGORY_SEARCH_PARAM);
      const allowedCategories = category ? category.split(",") : null;
      return allowedCategories
        ? allowedCategories.includes(ski.category)
        : true;
    }

    function filterManufacturer(ski) {
      const manufacturer = searchParams.get(MANUFACTURER_SEARCH_PARAM);
      const allowedManufacturers = manufacturer
        ? manufacturer.split(",")
        : null;
      return allowedManufacturers
        ? allowedManufacturers.includes(ski.manufacturer)
        : true;
    }

    function filterPriceFrom(ski) {
      const priceFrom = searchParams.get(PRICE_FROM_SEARCH_PARAM);
      return priceFrom
        ? Number.parseFloat(ski.price) >= Number.parseFloat(priceFrom)
        : true;
    }

    function filterPriceTo(ski) {
      const priceTo = searchParams.get(PRICE_TO_SEARCH_PARAM);
      return priceTo
        ? Number.parseFloat(ski.price) <= Number.parseFloat(priceTo)
        : true;
    }

    function filterSizeFrom(ski) {
      const sizeFrom = searchParams.get(SIZE_FROM_SEARCH_PARAM);
      return sizeFrom
        ? Number.parseFloat(ski.size) >= Number.parseFloat(sizeFrom)
        : true;
    }

    function filterSizeTo(ski) {
      const sizeTo = searchParams.get(SIZE_TO_SEARCH_PARAM);
      return sizeTo
        ? Number.parseFloat(ski.size) <= Number.parseFloat(sizeTo)
        : true;
    }

    setFilteredSki(
      skiBoots
        .filter(filterCategories)
        .filter(filterManufacturer)
        .filter(filterPriceFrom)
        .filter(filterPriceTo)
        .filter(filterSizeFrom)
        .filter(filterSizeTo)
    );
  }, [skiBoots, searchParams]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        bgcolor: "background.default",
        pb: 50,
        pt: 12,
      }}
    >
      <Grid
        item
        xs={12}
        sm={2}
        sx={{
          display: "flex",
          boxShadow: 5,
          mx: 3,
          py: 3,
          height: "fit-content",
          justifyContent: "center",
          flexWrap: "wrap",
          bgcolor: "background.paper",
        }}
      >
        <Filter
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          manufacturerList={SKI_BOOT_MANUFACTURERS}
          includeSkill={false}
        />
      </Grid>
      <ProductAlbumPagedSorted
        products={filteredSki}
        elementsPerPage={8}
        heading="Ski Boots"
      />
    </Grid>
  );
}

export default CatalogSkiBoots;
