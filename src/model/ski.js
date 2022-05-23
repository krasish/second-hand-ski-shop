import { CATEGORIES, CATEGORY_MEN } from "./category";
import { SKILLS, SKILL_BEGINNER } from "./skill";

export const DEFAULT_YEAR = 2000;

export class Ski {
  constructor({
    id = "",
    userId = "",
    manufacturer = "",
    description = "",
    size = 0,
    category = CATEGORIES[CATEGORY_MEN],
    year = DEFAULT_YEAR,
    model = "",
    skill = SKILLS[SKILL_BEGINNER],
    price = 0.0,
    condition = 1,
    photos = [],
  }) {
    this.id = id;
    this.userId = userId;
    this.manufacturer = manufacturer;
    this.description = description;
    this.size = size;
    this.category = category;
    this.year = year;
    this.model = model;
    this.skill = skill;
    this.price = price;
    this.condition = condition;
    this.photos = photos;
  }
}
