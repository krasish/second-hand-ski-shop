export const API_BASE_URL = "http://localhost:6969/api/";
export const SKI_PATH = "ski/";
export const SKI_BOOT_PATH = "boots/";
export const USERS_PATH = "user/";
export const REVIEWS_PATH = "review/";

class ApiClient {
  constructor(baseApiUrl = API_BASE_URL, debugLogs = false) {
    this.createUser = this.createUser.bind(this);
    this.login = this.login.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchUserById = this.fetchUserById.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.createSki = this.createSki.bind(this);
    this.fetchSkis = this.fetchSkis.bind(this);
    this.fetchSkiById = this.fetchSkiById.bind(this);
    this.deleteSki = this.deleteSki.bind(this);
    this.createBoot = this.createBoot.bind(this);
    this.fetchBoots = this.fetchBoots.bind(this);
    this.fetchBootsById = this.fetchBootsById.bind(this);
    this.deleteBoot = this.deleteBoot.bind(this);
    this.createReview = this.createReview.bind(this);
    this.fetchReviews = this.fetchReviews.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.POSTRequestFunction = this.POSTRequestFunction.bind(this);
    this.PUTRequestFunction = this.PUTRequestFunction.bind(this);
    this.DELETERequestFunction = this.DELETERequestFunction.bind(this);

    this.baseApiUrl = baseApiUrl;
    this.debugLogs = debugLogs;
  }

  //USER
  async createUser(user) {
    return this.handleResponse(this.POSTRequestFunction(USERS_PATH, user));
  }

  async editUser(user) {
    return this.handleResponse(
      this.PUTRequestFunction(`${USERS_PATH}/${user.id}`, user)
    );
  }

  async login(username, password) {
    try {
      const users = await this.handleResponse(async () =>
        fetch(
          `${this.baseApiUrl}${USERS_PATH}?username=${username}&password=${password}`
        )
      );
      if (users && users.length) {
        return users[0];
      } else {
        throw new Error("no such user");
      }
    } catch (err) {
      return Promise.reject(`Login failed: ${err.message}`);
    }
  }

  async fetchUsers() {
    return this.handleResponse(async () =>
      fetch(`${this.baseApiUrl}${USERS_PATH}`)
    );
  }

  async fetchUserById(userId) {
    return this.handleResponse(async () =>
      fetch(`${this.baseApiUrl}${USERS_PATH}${userId}`)
    );
  }

  async deleteUser(userId) {
    return this.handleResponse(this.DELETERequestFunction(USERS_PATH, userId));
  }

  //SKI
  async createSki(ski) {
    return this.handleResponse(this.POSTRequestFunction(SKI_PATH, ski));
  }

  async editSki(ski) {
    return this.handleResponse(
      this.PUTRequestFunction(`${SKI_PATH}/${ski.id}`, ski)
    );
  }

  async fetchSkis() {
    return this.handleResponse(async () =>
      fetch(`${this.baseApiUrl}${SKI_PATH}`)
    );
  }

  async fetchSkiById(skiId) {
    return this.handleResponse(async () =>
      fetch(`${this.baseApiUrl}${SKI_PATH}${skiId}`)
    );
  }

  async deleteSki(skiId) {
    return this.handleResponse(this.DELETERequestFunction(SKI_PATH, skiId));
  }

  //SKI-BOOTS
  async createBoot(boot) {
    return this.handleResponse(this.POSTRequestFunction(SKI_BOOT_PATH, boot));
  }

  async editBoot(boot) {
    return this.handleResponse(
      this.PUTRequestFunction(`${SKI_BOOT_PATH}/${boot.id}`, boot)
    );
  }

  async fetchBoots() {
    return this.handleResponse(async () =>
      fetch(`${this.baseApiUrl}${SKI_BOOT_PATH}`)
    );
  }

  async fetchBootsById(skiBootId) {
    return this.handleResponse(async () =>
      fetch(`${this.baseApiUrl}${SKI_BOOT_PATH}${skiBootId}`)
    );
  }

  async deleteBoot(bootId) {
    return this.handleResponse(
      this.DELETERequestFunction(SKI_BOOT_PATH, bootId)
    );
  }

  //REVIEWS
  async createReview(review) {
    return this.handleResponse(this.POSTRequestFunction(REVIEWS_PATH, review));
  }

  async fetchReviews() {
    return this.handleResponse(async () =>
      fetch(`${this.baseApiUrl}${REVIEWS_PATH}`)
    );
  }

  async deleteReview(reviewId) {
    return this.handleResponse(
      this.DELETERequestFunction(REVIEWS_PATH, reviewId)
    );
  }

  //utils
  POSTRequestFunction(path, body) {
    return async () => {
      fetch(`${this.baseApiUrl}${path}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    };
  }

  PUTRequestFunction(path, body) {
    return async () => {
      fetch(`${this.baseApiUrl}${path}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    };
  }

  DELETERequestFunction(path, id) {
    return async () => {
      fetch(`${this.baseApiUrl}${path}${id}`, {
        method: "DELETE",
      });
    };
  }

  async handleResponse(ayncRequestFunction) {
    try {
      const resp = await ayncRequestFunction();
      if (resp && resp.status < 400) {
        const content = await resp.json();
        this.debugLogs &&
          console.log(
            `Successfult HTTP request [${resp.status}]: ${JSON.stringify(
              content
            )}`
          );
        return content;
      } else if (resp) {
        const msg = `HTTP error ${resp.status}: ${JSON.stringify(resp)}`;
        this.debugLogs && console.log(msg);
        return Promise.reject(msg);
      }
    } catch (err) {
      const msg = `HTTP error while performing request: ${err}`;
      this.debugLogs && console.log(msg);
      return Promise.reject(msg);
    }
  }
}

export default new ApiClient(API_BASE_URL, false);
