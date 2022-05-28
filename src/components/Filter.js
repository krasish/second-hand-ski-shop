import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CATEGORIES } from "../model/category";
import {
  CATEGORY_SEARCH_PARAM,
  MANUFACTURER_SEARCH_PARAM,
  PRICE_FROM_SEARCH_PARAM,
  PRICE_TO_SEARCH_PARAM,
  SIZE_FROM_SEARCH_PARAM,
  SIZE_TO_SEARCH_PARAM,
  SKILL_SEARCH_PARAM,
} from "../model/search-params";
import { SKILLS } from "../model/skill";
import { SKI_MANUFACTURERS } from "./SkiForm";

function Filter({
  minPrice = 0,
  maxPrice = 5000,
  minSize = 20,
  maxSize = 350,
  includeSkill = true,
  manufacturerList = SKI_MANUFACTURERS,
  searchParams,
  setSearchParams,
}) {
  const [price, setPrice] = useState([minPrice, maxPrice]);
  const [size, setSize] = useState([minSize, maxSize]);

  function handlePriceSliderChange(event, value) {
    setPrice(value);
    searchParams.set(PRICE_FROM_SEARCH_PARAM, value[0]);
    searchParams.set(PRICE_TO_SEARCH_PARAM, value[1]);

    setSearchParams(searchParams);
  }

  function handleSizeSliderChange(event, value) {
    setSize(value);
    searchParams.set(SIZE_FROM_SEARCH_PARAM, value[0]);
    searchParams.set(SIZE_TO_SEARCH_PARAM, value[1]);

    setSearchParams(searchParams);
  }

  function determineChecked(searchParam, val) {
    return Boolean(searchParams?.get(searchParam)?.split(",")?.includes(val));
  }

  function handleManufacturerChange(event, value) {
    const currentManufacturers = searchParams
      ?.get(MANUFACTURER_SEARCH_PARAM)
      ?.split(",");

    let newManufacturers = currentManufacturers?.filter(
      (m) => m !== event.target.value
    );
    newManufacturers = newManufacturers ? newManufacturers : [];
    if (value) {
      newManufacturers.push(event.target.value);
    }

    if (newManufacturers.length) {
      searchParams.set(MANUFACTURER_SEARCH_PARAM, newManufacturers);
    } else {
      searchParams.delete(MANUFACTURER_SEARCH_PARAM);
    }
    setSearchParams(searchParams);
  }

  function handleCategoryChange(event, value) {
    const currentCategories = searchParams
      ?.get(CATEGORY_SEARCH_PARAM)
      ?.split(",");

    let newCategories = currentCategories?.filter(
      (c) => c !== event.target.value
    );
    newCategories = newCategories ? newCategories : [];
    if (value) {
      newCategories.push(event.target.value);
    }

    if (newCategories.length) {
      searchParams.set(CATEGORY_SEARCH_PARAM, newCategories);
    } else {
      searchParams.delete(CATEGORY_SEARCH_PARAM);
    }
    setSearchParams(searchParams);
  }

  function handleSkillChange(event, value) {
    const currentSkill = searchParams?.get(SKILL_SEARCH_PARAM)?.split(",");

    let newSkills = currentSkill?.filter((c) => c !== event.target.value);
    newSkills = newSkills ? newSkills : [];
    if (value) {
      newSkills.push(event.target.value);
    }

    if (newSkills.length) {
      searchParams.set(SKILL_SEARCH_PARAM, newSkills);
    } else {
      searchParams.delete(SKILL_SEARCH_PARAM);
    }
    setSearchParams(searchParams);
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        bgcolor: "background.paper",
        py: 4,
      }}
    >
      <Grid
        item
        xs={12}
        sx={{ px: 3, display: "flex", justifyContent: "center" }}
      >
        <Typography variant="h5" id="price-slider" gutterBottom>
          Filters
        </Typography>
      </Grid>
      <Grid xs={12} sx={{ px: 3, mt: 2 }}>
        <Typography variant="h6" id="price-slider" gutterBottom>
          Categories
        </Typography>
        <FormControl>
          <FormGroup>
            {CATEGORIES.map((c) => (
              <FormControlLabel
                key={c}
                control={
                  <Checkbox
                    checked={determineChecked(CATEGORY_SEARCH_PARAM, c)}
                    onChange={handleCategoryChange}
                    value={c}
                  />
                }
                label={c.charAt(0).toUpperCase() + c.slice(1)}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>

      <Grid xs={12} sx={{ px: 3, mt: 2 }}>
        <Typography variant="h6" id="price-slider" gutterBottom>
          Manufacturer
        </Typography>
        <FormControl>
          <FormGroup>
            {manufacturerList.map((m) => (
              <FormControlLabel
                key={m}
                control={
                  <Checkbox
                    checked={determineChecked(MANUFACTURER_SEARCH_PARAM, m)}
                    onChange={handleManufacturerChange}
                    value={m}
                  />
                }
                label={m}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>

      {includeSkill && (
        <Grid xs={12} sx={{ px: 3, mt: 2 }}>
          <Typography variant="h6" id="price-slider" gutterBottom>
            Skill
          </Typography>
          <FormControl>
            <FormGroup>
              {SKILLS.map((s) => (
                <FormControlLabel
                  key={s}
                  control={
                    <Checkbox
                      checked={determineChecked(SKILL_SEARCH_PARAM, s)}
                      onChange={handleSkillChange}
                      value={s}
                    />
                  }
                  label={s.charAt(0).toUpperCase() + s.slice(1)}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
      )}

      <Grid item xs={12} sx={{ px: 3 }}>
        <Typography variant="h6" id="price-slider" gutterBottom>
          Size
        </Typography>
        <Slider
          min={minSize}
          max={maxSize}
          value={size}
          getAriaLabel={() => "Size range"}
          onChange={handleSizeSliderChange}
          valueLabelDisplay="auto"
        />
      </Grid>

      <Grid item xs={12} sx={{ px: 3 }}>
        <Typography variant="h6" id="price-slider" gutterBottom>
          Price
        </Typography>
        <Slider
          min={minPrice}
          max={maxPrice}
          value={price}
          getAriaLabel={() => "Price range"}
          onChange={handlePriceSliderChange}
          valueLabelDisplay="auto"
        />
      </Grid>
    </Grid>
  );
}

export default Filter;
