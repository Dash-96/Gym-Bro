export class RefreshError extends Error {
  constructor() {
    super("Refresh token expired");
  }
}
