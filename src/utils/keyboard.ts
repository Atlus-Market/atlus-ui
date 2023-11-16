import { KeyboardEvent } from 'react';

export const isEnterKeyEvent = (e: KeyboardEvent<HTMLElement>): boolean => {
  return e.key === 'Enter' || e.code === 'Enter' || e.which === 13 || e.keyCode === 13;
};
