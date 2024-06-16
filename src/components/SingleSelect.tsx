import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AddonCategory } from "@prisma/client";
import { SetStateAction } from "react";

interface Props {
    title: string
  selected: number | undefined;
  setSelected: (value: SetStateAction<number | undefined>) => void;
  item: AddonCategory[];
}
const SingleSelected = ({title,  selected, setSelected, item }: Props) => {
  return (
    <FormControl sx={{ width: "100%", p: 1, mb: 2 }}>
      <InputLabel>{title}</InputLabel>
      <Select
        value={Number(selected)}
        label={title}
        onChange={(event) => setSelected(Number(event.target.value))}
      >
        {item.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SingleSelected;
