import tw from 'tailwind-styled-components';
import { Checkbox, Select as SelectAntd } from 'antd';

const CheckboxGroupAntd = Checkbox.Group;

export const Button = tw.button`
  flex-center
  rounded-md
`;

export const ErrorMessage = tw.p`
  text-red-400
  input-text
`;

export const InputWrapper = tw.div`
  flex
  w-full
  flex-col
`;

export const Label = tw.label`
  mb-6
  text-left
  text-sm
  text-black-350
`;

export const Input = tw.input`
  h-50
  rounded-lg
  border-[1px]
  border-solid
  px-18
  py-16
  text-sm
  placeholder:text-black-200 
  focus:border-skyblue-500 
  focus:outline-none 
  disabled:bg-black-050
  disabled:text-black-200
`;

export const MarginBottomInput = tw.div`
  mb-24
`;

export const CheckboxGroup = tw(CheckboxGroupAntd)`
  text-gray-400
  gap-3
`;

export const CheckboxWrapper = tw.div`
  flex
  justify-between
`;

export const Select = tw(SelectAntd)`
  w-full
  text-center
`;
