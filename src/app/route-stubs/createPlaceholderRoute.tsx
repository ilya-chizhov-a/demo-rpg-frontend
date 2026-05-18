import { PlaceholderPage } from './PlaceholderPage/PlaceholderPage';
import type { PlaceholderRouteKey } from './placeholderRoutes';

export function createPlaceholderRoute(key: PlaceholderRouteKey) {
  return function PlaceholderRoute() {
    return <PlaceholderPage routeKey={key} />;
  };
}
