import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { Menu, MenuCategory } from "@prisma/client";
import { SetStateAction } from "react";

interface Props {
  title: string;
  selected: number[];
  setSelected: (value: SetStateAction<number[]>) => void;
  item: Menu[] | MenuCategory[];
}

const MultipleSelect = ({ title, selected, setSelected, item }: Props) => {
  return (
    <Box>
      <FormControl sx={{width: 300}}>
        <InputLabel>{title}</InputLabel>
        <Select
          value={selected}
          onChange={(event) => {
            const ticket = event.target.value as number[];
            setSelected(ticket);
          }}
          multiple
          renderValue={() => {
            return selected
              .map((itemId) => item.find((item) => item.id === itemId) as Menu)
              .map((menuName) => menuName?.name)
              .join(", ");
          }}
        >
          {item.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={selected.includes(item.id)}></Checkbox>
                <ListItemText>{item.name}</ListItemText>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultipleSelect;
