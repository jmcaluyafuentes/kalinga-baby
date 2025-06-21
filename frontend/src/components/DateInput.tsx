import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type DateInputProps = {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
};

const DateInput = ({ label = "Select Date", value, onChange }: DateInputProps) => {
  return (
    <DatePicker
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

export default DateInput;
