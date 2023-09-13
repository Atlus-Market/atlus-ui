import pluralizeWord from 'pluralize';

export const pluralize = (word: string | undefined, count: number): string => {
  if (!word) {
    return '';
  }
  return pluralizeWord(word, count);
};
