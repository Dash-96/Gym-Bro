import { getTokenAsync } from "./secureStore";

class HttpClient {
  static baseUrl = process.env.EXPO_PUBLIC_API_URL;
  private clientUrl;
  private hasRetried = false;

  constructor(clientUrl: string) {
    this.clientUrl = HttpClient.baseUrl + clientUrl;
  }

  public async postRequest<TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> {
    const token = getTokenAsync();
    const response = await fetch(this.clientUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const statusCodeResponse = response.status;
    }

    return await response.json();
  }

  private async handleError(statusCode: number) {
    switch (statusCode) {
      case 401:
        if (!this.hasRetried) {
          this.sendRefreshToken();
        }
    }
  }

  private async sendRefreshToken() {}
}
