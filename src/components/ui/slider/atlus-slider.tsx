import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './atlus-slider.css';
import { SliderStyles } from 'rc-slider/lib/interface';

interface AtlusSliderProps {
  min: number;
  max: number;
  value: number;
  step: number;
  onChange: (value: number) => void;
}

const styles: SliderStyles = {
  track: {
    backgroundColor: 'var(--color-orange)',
  },
  rail: {
    backgroundColor: 'var(--color-light-grey)',
  },
  handle: {
    backgroundColor: 'var(--color-orange)',
    borderColor: 'var(--color-orange)',
    opacity: 1,
  },
};

export const AtlusSlider = (props: AtlusSliderProps) => {
  const { onChange, ...restProps } = props;
  return (
    <Slider
      {...restProps}
      styles={styles}
      onChange={value => {
        if (Array.isArray(value)) {
          return; // TODO: Change this if the slider is modified to support more features.
        }
        onChange(value);
      }}
    />
  );
};
