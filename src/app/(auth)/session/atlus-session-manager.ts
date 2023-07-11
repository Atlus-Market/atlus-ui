/**
 * Use this static class to get/set the accessToken for hitting the API.
 */
export class AtlusSessionManager {

  private constructor() {
  }

  private static atlusAccessToken: string | undefined;

  static get accessToken() {
    return AtlusSessionManager.atlusAccessToken;
  }

  static set accessToken(accessToken: string | undefined) {
    AtlusSessionManager.atlusAccessToken = accessToken;
  }
}
