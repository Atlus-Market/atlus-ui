import { Validator } from '@/components/ui/form/validators/validator';
import { Chunk, FindChunks } from 'react-highlight-words';

export const patentIdValidator: Validator<string> = {
  name: 'is-valid-patent-id',
  message:
    'Invalid patentId',
  test: (patentsIds: string, context): boolean => mapPatentsIdsToPatentIdsArray(patentsIds).every(isValidPatentId)
};

const isValidPatentId = (patentId: string): boolean => {
  console.log('testing: ', patentId);
  return new RegExp(/^[a-zA-Z]{2}[0-9]{1,12}[a-zA-Z0-9 ]{1,2}$/).test(patentId.trim());
};

export const mapPatentsIdsToPatentIdsArray = (patentsIds: string): string[] =>
  ((patentsIds ?? '').split(',') || []).map(patentId => patentId.trim());

export const getInvalidPatentsIds = (patentsIds: string): string[] => {
  return patentsIds
    .split(',')
    .filter(patentId => !isValidPatentId(patentId));
};

/**
 * Given an array of words and a position of the array,
 * returns the length to the start of the index.
 * It counts the length of the elements separator if provided.
 * @param arr
 * @param indexPosition
 * @param separatorLength
 */
const calculateLengthToIndex = (arr: string[], indexPosition: number, separatorLength: number): number => {
  if (indexPosition >= arr.length) {
    return 0;
  }

  let sum = 0;
  for (let i = 0; i < indexPosition; i++) {
    sum += arr[i].length + separatorLength;
  }
  return sum;
};

const commaLength = 1;
const INVALID_CHUNK_VALUE = -1;
const INVALID_CHUNK = { start: INVALID_CHUNK_VALUE, end: INVALID_CHUNK_VALUE };

export const findChunks = ({ textToHighlight, searchWords }: FindChunks): Chunk[] => {
  const allWords = textToHighlight.split(',');
  return searchWords
    .map((wordToHighlight, wordIndex) => {
      if (typeof wordToHighlight === 'string') {
        const start = allWords.findIndex(
          (word, globalWordIndex) =>
            // globalWordIndex is any word in textToHighlight and its index
            // must be >= than the index of the invalid words to highlight
            // (if not, it means the word to highlight was already counted).
            // This prevents cases where duplicates (for example, at the beginning and at the end)
            // are not highlighted because the word index is always found at first position.
            globalWordIndex >= wordIndex && word === wordToHighlight);

        const positionInPlainText = calculateLengthToIndex(allWords, start, commaLength);
        const end = positionInPlainText + wordToHighlight.length;
        return {
          start: positionInPlainText,
          end
        };
      }
      return INVALID_CHUNK;
    })
    .filter(chunk => chunk.start > INVALID_CHUNK_VALUE);
};
