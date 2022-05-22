export const API_BASE_URL = "http://localhost:6969/api/";
export const SKI_PATH = "ski/";
export const USERS_PATH = "user/";

class ApiClient {
  constructor(baseApiUrl = API_BASE_URL) {
    this.baseApiUrl = baseApiUrl;
  }

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

  async fetchSkis() {
    return this.handleResponse(async () =>
      fetch(`${this.baseApiUrl}${SKI_PATH}`)
    );
  }

  //error handling
  async handleResponse(ayncRequestFunction) {
    try {
      const resp = await ayncRequestFunction();
      if (resp && resp.status < 400) {
        const content = await resp.json();
        console.log(content);
        console.log(
          `Successfult HTTP request [${resp.status}]: ${JSON.stringify(
            content
          )}`
        );
        return content;
      } else if (resp) {
        const msg = `HTTP error ${resp.status}: ${JSON.stringify(resp)}`;
        console.log(msg);
        return Promise.reject(msg);
      }
    } catch (err) {
      const msg = `HTTP error while performing request: ${err}`;
      console.log(msg);
      return Promise.reject(msg);
    }
  }
}

export default new ApiClient(API_BASE_URL);
