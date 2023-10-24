export interface ButtonState {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: string;
}

export interface ButtonDesignProps {
  normal: ButtonState;
  hover: ButtonState;
  active: ButtonState;
  disabled: ButtonState;
  loading: ButtonState;
}
