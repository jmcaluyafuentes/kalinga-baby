import { TimePicker } from '@mui/x-date-pickers/TimePicker';

type TimeInputProps = {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
};

const TimeInput = ({ label = "Select Time", value, onChange }: TimeInputProps) => {
  return (
    <TimePicker
      label={label}
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          fullWidth: true,
          variant: 'outlined',
        },
      }}
    />
  );
};

export default TimeInput;
