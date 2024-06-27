import ItemCard from "@/src/components/ItemCard";
import NewTableDialog from "@/src/components/NewTableDialog";
import { useAppSelector } from "@/src/store/hook";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import TableBarIcon from "@mui/icons-material/TableBar";

const Table = () => {
  const [open, setOpen] = useState(false);
  const { selectedLocation } = useAppSelector((item) => item.app);
  const tables = useAppSelector((item) => item.table.tables).filter(
    (item) => item.locationId === selectedLocation?.id
  );
  const handleImageQRPrint = (assetUrl: string) => {
    const imageWindow = window.open("")
    imageWindow?.document.write(`<html><head><title>Print QR Image</title></head><body><img src="${assetUrl}" onload=window.print();window.close() /></body></html>`)
  }
  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ bgcolor: "#627254", "&:hover": { bgcolor: "#78876a" } }}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            New Table
          </Button>
        </Box>
        <Box sx={{ display: "flex",  flexWrap: "wrap" }}>
          {tables.map((item) => {
            return (
              <Box key={item.id} sx={{display : "flex", flexDirection: "column", alignItems: "center"}}>
                <ItemCard
                  title={item.name}
                  icon={<TableBarIcon />}
                  href={`/backoffice/table/${item.id}`}
                />
                <Button variant="contained" onClick={()=> {handleImageQRPrint(item.assetUrl)}}>Print Table QR</Button>
              </Box>
            );
          })}
        </Box>
        <NewTableDialog setOpen={setOpen} open={open} />
      </Box>
    </Box>
  );
};

export default Table;
