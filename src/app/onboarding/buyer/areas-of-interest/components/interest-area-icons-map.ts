import { FaBriefcaseMedical, FaCarSide } from 'react-icons/fa';
import { IconType } from 'react-icons';
import {
  HiCode,
  HiOutlineChip,
  HiOutlineCloudUpload,
  HiOutlineOfficeBuilding,
} from 'react-icons/hi';
import {
  HiBeaker,
  HiComputerDesktop,
  HiGlobeAlt,
  HiLightBulb,
  HiPhone,
  HiPlay,
  HiShieldCheck,
  HiVideoCamera,
} from 'react-icons/hi2';

export const InterestAreaIconsMap: Readonly<Record<number, IconType>> = {
  1: FaCarSide,
  2: HiOutlineCloudUpload,
  3: HiGlobeAlt,
  4: HiComputerDesktop,
  5: HiOutlineChip,
  6: HiLightBulb,
  7: FaBriefcaseMedical,
  8: HiOutlineOfficeBuilding,
  9: HiBeaker,
  10: HiPlay,
  11: HiShieldCheck,
  12: HiVideoCamera,
  13: HiCode,
  14: HiPhone,
};
