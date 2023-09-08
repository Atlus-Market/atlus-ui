import { Session, User } from 'next-auth';

/**
 * Use this static class to get/set the accessToken for hitting the API.
 */
export class AtlusSessionManager {

  private constructor() {
  }

  private static atlusSession: Session | null;

  static get accessToken() {
    return AtlusSessionManager.atlusSession?.user?.accessToken;
  }

  static get csrfToken() {
    return AtlusSessionManager.atlusSession?.user?.csrfToken;
  }

  static get user(): User | undefined {
    return AtlusSessionManager.atlusSession?.user;
  }

  static set session(session: Session | null) {
    AtlusSessionManager.atlusSession = session;
  }

  static get session(): Session | null {
    return AtlusSessionManager.atlusSession;
  }
}
