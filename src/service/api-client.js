export const API_BASE_URL = "http://localhost:6969/api/";
export const SKI_PATH = "ski/";
export const SKI_BOOT_PATH = "boots/";
export const USERS_PATH = "user/";
export const REVIEWS_PATH = "review/";

class ApiClient {
  constructor(baseApiUrl = API_BASE_URL, debugLogs = false) {
    this.baseApiUrl = baseApiUrl;
    this.debugLogs = debugLogs;
  }

  //USER
  async createUser(user) {
    return this.handleResponse(this.POSTRequestFunction(USERS_PATH, user));
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

  async deleteUser(userId) {
    return this.handleResponse(this.DELETERequestFunction(USERS_PATH, userId));
  }

  //SKI
  async createSki(ski) {
    return this.handleResponse(this.POSTRequestFunction(SKI_PATH, ski));
  }

  async fetchSkis() {
    return this.handleResponse(async () =>
      fetch(`${this.baseApiUrl}${SKI_PATH}`)
    );
  }

  async deleteSki(skiId) {
    return this.handleResponse(this.DELETERequestFunction(SKI_PATH, skiId));
  }

  //SKI-BOOTS
  async createBoot(boot) {
    return this.handleResponse(this.POSTRequestFunction(SKI_BOOT_PATH, boot));
  }

  async fetchBoots() {
    return this.handleResponse(async () =>
      fetch(`${this.baseApiUrl}${SKI_BOOT_PATH}`)
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
