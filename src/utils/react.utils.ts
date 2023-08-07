import { ReactNode } from 'react';
import { isArray } from 'lodash';

/** Checks if the children is null */
export const isChildNull = (children: any): boolean => {
  return Boolean(children?.type() === null);
};

/**
 * Returns the count of children that are not null.
 * @param children
 */
export const countValidChildren = (children: ReactNode | ReactNode[]): number => {
  let count = 0;
  const childrenArray = isArray(children) ? children : [children];
  childrenArray.forEach(child => {
    if (!isChildNull(child)) {
      count++;
    }
  });
  return count;
};
