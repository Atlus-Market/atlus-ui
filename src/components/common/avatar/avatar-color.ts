import { randomInteger } from '@/utils/math';

interface AvatarColor {
  backgroundColor: string;
  textColor: string;
}

const colors: AvatarColor[] = [
  {
    backgroundColor: 'bg-[#EDEFA9]',
    textColor: 'text-[#767816]',
  },
  {
    backgroundColor: 'bg-[#F8C4DD]',
    textColor: 'text-[#BE1868]',
  },
  {
    backgroundColor: 'bg-[#D4F9DD]',
    textColor: 'text-[#14852F]',
  },
  {
    backgroundColor: 'bg-[#E5D1FF]',
    textColor: 'text-[#4F00B2]',
  },
  {
    backgroundColor: 'bg-[#B2F0E5]',
    textColor: 'text-[#0F855E]',
  },
];

/**
 * Returns a random number.
 * If the random number has been used and count of colors
 * has not been used, then generate a new random number.
 */
const getRandomNumber = () => {
  const colorsCount = colors.length - 1;
  const usedNumbers = new Set();
  return (): number => {
    let rand = randomInteger(0, colorsCount);
    while (colorsCount !== usedNumbers.size) {
      if (usedNumbers.has(rand)) {
        rand = randomInteger(0, colorsCount);
      } else {
        usedNumbers.add(rand);
        return rand;
      }
    }
    return rand;
  };
};

export class AvatarColorPicker {
  private static colorsMap = new Map<string, AvatarColor>();

  private static getRandomColorNumber = getRandomNumber();

  constructor() {
    throw new Error('This class can not be instantiated');
  }

  static getColor(word: string | undefined): AvatarColor {
    const char = AvatarColorPicker.getChar(word);
    let avatarColor = AvatarColorPicker.colorsMap.get(char);

    if (!avatarColor) {
      avatarColor = AvatarColorPicker.getRandomColor();
      AvatarColorPicker.colorsMap.set(char, avatarColor);
      console.log(`Avatar config: ${char} - ${avatarColor}`);
    }

    return avatarColor;
  }

  static getChar(word: string | undefined): string {
    return word?.at(0)?.toLowerCase() ?? '-';
  }

  private static getRandomColor(): AvatarColor {
    return colors[AvatarColorPicker.getRandomColorNumber()];
  }
}
