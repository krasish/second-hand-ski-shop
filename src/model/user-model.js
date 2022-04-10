export const REGULAR = 0;
export const ADMIN = 1;

export const Role = ["REGULAR", "ADMIN"];

export class User {
  constructor(
    firstName = "",
    lastName = "",
    username = "",
    passwod = "",
    imageUrl = "",
    role = REGULAR,
    active = true
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.passwod = passwod;
    this.imageUrl = imageUrl;
    this.role = role;
    this.active = active;
  }
}
