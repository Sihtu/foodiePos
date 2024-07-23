
import ItemCard from "@/src/components/ItemCard";
import { useAppSelector } from "@/src/store/hook";
import { Box } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";

const Setting = () => {
  const { company } = useAppSelector((item) => item.company);

  return (
    <Box>
      <Box sx={{ display: "flex", }}>
        {company && (
          <ItemCard 
            icon={<StoreIcon />}
            title={company.name}
            href={`/backoffice/setting/${company.id}`}
          />
        )}
      </Box>
    </Box>
  );
};

export default Setting;
