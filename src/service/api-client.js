export const API_BASE_URL = "http://localhost:6969/api/";
export const SKI_PATH = "ski/";

class ApiClient {
  constructor(baseApiUrl = API_BASE_URL) {
    this.baseApiUrl = baseApiUrl;
  }

  async fetchSkis() {
    return this.fetchHandleResponse(async () =>
      fetch(`${this.baseApiUrl}${SKI_PATH}`)
    );
  }

  //error handling
  async handleResponse(ayncRequestFunction) {
    try {
      const resp = await ayncRequestFunction();
      const content = await resp.json();
      if (resp.status < 400) {
        console.log(
          `Successfult HTTP request [${resp.status}]: ${JSON.stringify(
            content
          )}`
        );
        return content;
      } else {
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
