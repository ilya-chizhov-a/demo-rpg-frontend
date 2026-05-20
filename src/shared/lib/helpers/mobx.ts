import { makeAutoObservable, type AnnotationsMap } from 'mobx';

export function makeAutoBoundObservable<
  T extends object,
  AdditionalKeys extends PropertyKey = never,
>(
  target: T,
  overrides?: AnnotationsMap<T, AdditionalKeys>,
): void {
  makeAutoObservable(target, overrides, { autoBind: true });
}
