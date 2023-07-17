import { Validator } from '@/components/ui/form/validators/validator';
import { Chunk, FindChunks } from 'react-highlight-words';

export const patentIdValidator: Validator<string> = {
  name: 'is-valid-patent-id',
  message:
    'Invalid patentId',
  test: (patentsIds: string, context): boolean => patentsIds.split(',').every(isValidPatentId)
};

// TODO: replace with patentId regex
const isValidPatentId = (patentId: string): boolean => patentId?.trim().length > 3;

export const getInvalidPatentsIds = (patentsIds: string): string[] => {
  return patentsIds
    .split(',')
    .filter(patentId => !isValidPatentId(patentId));
};

const commaLength = 1;
const calculateLengthToIndex = (arr: string[], indexPosition: number): number => {
  if (indexPosition >= arr.length) {
    return 0;
  }

  let sum = 0;
  for (let i = 0; i < indexPosition; i++) {
    sum += arr[i].length + commaLength;
  }
  return sum;
};

export const findChunks = ({ textToHighlight, searchWords }: FindChunks): Chunk[] => {
  const allWords = textToHighlight.split(',');
  return searchWords
    .map((wordToHighlight, wordIndex) => {
      if (typeof wordToHighlight === 'string') {
        const start = allWords.findIndex(word => word === wordToHighlight);
        const positionInPlainText = calculateLengthToIndex(allWords, start);
        const end = positionInPlainText + wordToHighlight.length;
        return {
          start: positionInPlainText,
          end
        };
      }
      return {
        start: -1, end: -1
      };
    })
    .filter(chunk => chunk.start > -1);
};
