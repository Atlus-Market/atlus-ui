export interface AvatarColor {
  backgroundColor: string;
  textColor: string;
}

const avatarColors: readonly AvatarColor[] = [
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

export class AvatarColorPicker {
  constructor() {
    throw new Error('This class can not be instantiated');
  }

  static getAvatarColor(word: string | undefined): AvatarColor {
    const charCode = AvatarColorPicker.getChar(word).charCodeAt(0);
    const colorIndex = charCode % avatarColors.length;
    return avatarColors[colorIndex];
  }

  static getChar(word: string | undefined): string {
    return word?.at(0)?.toLowerCase() ?? '-';
  }
}
