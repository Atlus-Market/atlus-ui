/**
 * Use this static class to get/set the accessToken for hitting the API.
 */
export class AtlusSessionManager {

  private constructor() {
  }

  private static atlusAccessToken: string | undefined;
  private static atlusCsrfToken: string | undefined;

  static get accessToken() {
    return AtlusSessionManager.atlusAccessToken;
  }

  static set accessToken(accessToken: string | undefined) {
    AtlusSessionManager.atlusAccessToken = accessToken;
  }

  static get csrfToken() {
    return AtlusSessionManager.atlusCsrfToken;
  }

  static set csrfToken(csrfToken: string | undefined) {
    AtlusSessionManager.atlusCsrfToken = csrfToken;
  }
}
