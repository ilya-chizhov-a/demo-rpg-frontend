import { isRouteActive, type ActiveNavigationItem } from 'src/shared/config';
import type { GuideSectionItemCopy } from './guideCopy';

export function getGuideSectionNavigationItems(
  items: readonly GuideSectionItemCopy[],
  pathname: string,
): readonly ActiveNavigationItem[] {
  return items.map((item) => ({
    ...item,
    isActive: isRouteActive(pathname, item.to),
  }));
}
