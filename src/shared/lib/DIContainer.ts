import { isClient } from './helpers/isClient';

// Minimal dependency-injection container with three scopes:
//   - singleton: one instance per container lifetime
//   - clientSingleton: one browser instance; fresh instances during SSR
//   - transient: a fresh instance on every `get()`
//
// ViewModels register as `transient` so each page mount gets a clean store.
// Long-lived stateless services (ApiService, EnvironmentService) register as
// `singleton`. Browser-global UI state can use `clientSingleton` when it must
// not leak between concurrent SSR requests.
//
// We intentionally do NOT support a `session` scope: in SSR the container is
// shared across concurrent requests, and per-request state stored on a module
// singleton would leak between requests. If per-request state becomes needed,
// pass an explicit context through the call site (or AsyncLocalStorage in the
// loader/action) — do not add it back to this container.

type Scope = 'clientSingleton' | 'singleton' | 'transient';

type Factory<T> = () => T;

interface Registration<T> {
  factory: Factory<T>;
  scope: Scope;
  singletonInstance?: T;
}

export type Token<T> = new (...args: never[]) => T;

class DIContainer {
  private readonly registrations = new Map<Token<unknown>, Registration<unknown>>();

  public register<T>(token: Token<T>, factory: Factory<T>, options: { scope: Scope }): void {
    this.registrations.set(token, {
      factory,
      scope: options.scope,
    });
  }

  public get<T>(token: Token<T>): T {
    const registration = this.registrations.get(token) as Registration<T> | undefined;
    if (!registration) {
      throw new Error(`DIContainer: token "${token.name}" is not registered`);
    }

    if (registration.scope === 'singleton' || registration.scope === 'clientSingleton') {
      if (registration.scope === 'clientSingleton' && !isClient()) {
        return registration.factory();
      }

      registration.singletonInstance ??= registration.factory();
      return registration.singletonInstance;
    }

    return registration.factory();
  }
}

export const container = new DIContainer();
