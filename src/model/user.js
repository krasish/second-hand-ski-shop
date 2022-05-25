export const ROLE_USER = 0;
export const ROLE_ADMIN = 1;

export const ROLES = ["user", "admin"];

export const GENDER_MALE = 0;
export const GENDER_FEMALE = 1;

export const GENDERS = ["male", "female"];

export class User {
  constructor({
    id = "",
    email = "",
    firstName = "",
    lastName = "",
    username = "",
    password = "",
    imageUrl = "",
    phone = "",
    gender = GENDERS[GENDER_MALE],
    role = ROLES[ROLE_USER],
    active = true,
  }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.imageUrl = imageUrl;
    this.phone = phone;
    this.gender = gender;
    this.role = role;
    this.active = active;
  }
}
