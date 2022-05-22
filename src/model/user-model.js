export const REGULAR = 0;
export const ADMIN = 1;

export const ROLES = ["user", "admin"];

export const GENDER_MALE = 0;
export const GENDER_FEMALE = 1;

export const GENDERS = ["male", "female"];

export class User {
  constructor({
    email = "",
    firstName = "",
    lastName = "",
    username = "",
    password = "",
    imageUrl = "",
    gender = GENDERS[GENDER_MALE],
    role = ROLES[REGULAR],
    active = true,
  }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.imageUrl = imageUrl;
    this.gender = gender;
    this.role = role;
    this.active = active;
  }
}
