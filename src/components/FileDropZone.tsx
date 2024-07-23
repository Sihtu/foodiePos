import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";

interface OnDropProps {
  onDrop: (files: File[]) => void;
}
const FileDropZone = ({ onDrop }: OnDropProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Box {...getRootProps()}  sx={{mt: 3, p: 2, border: "2px dotted black", borderRadius: 3}}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Photo has been selected</p>
      ) : (
        <p>Photo has not selected</p>
      )}
    </Box>
  );
};

export default FileDropZone;
