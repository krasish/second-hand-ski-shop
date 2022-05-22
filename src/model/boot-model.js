import { CONDITION_BAD, CONDITIOTNS } from "./condition-model";

export const DEFAULT_YEAR = 2000;

export class Boot {
  constructor({
    id = "",
    userId = "",
    manufacturer = "",
    description = "",
    size = 0.0,
    flexIndex = 0,
    year = DEFAULT_YEAR,
    model = "",
    price = 0.0,
    condition = 1,
    photos = [],
  }) {
    this.id = id;
    this.userId = userId;
    this.manufacturer = manufacturer;
    this.description = description;
    this.size = size;
    this.flexIndex = flexIndex;
    this.year = year;
    this.model = model;
    this.price = price;
    this.condition = condition;
    this.photos = photos;
  }
}
