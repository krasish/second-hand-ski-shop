import { SKILLS, SKILL_BEGINNER } from "./skill-model";

export const DEFAULT_YEAR = 2000;

export class Ski {
  constructor(
    manufacturer = "",
    description = "",
    size = 0,
    year = DEFAULT_YEAR,
    model = "",
    skill = SKILLS[SKILL_BEGINNER],
    price = 0.0,
    condition = 1,
    photos = []
  ) {
    this.manufacturer = manufacturer;
    this.description = description;
    this.size = size;
    this.year = year;
    this.model = model;
    this.skill = skill;
    this.price = price;
    this.condition = condition;
    this.photos = photos;
  }
}
