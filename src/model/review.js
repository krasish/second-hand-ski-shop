export class Review {
  constructor({
    id = "",
    fromUserId = "",
    forUserId = "",
    rating = 1,
    review = "",
    createdAt = new Date().toString(),
  }) {
    this.id = id;
    this.fromUserId = fromUserId;
    this.forUserId = forUserId;
    this.rating = rating;
    this.review = review;
    this.createdAt = createdAt;
  }
}
