import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BaseURL } from "../../env";

import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

console.log("BaseURL:", BaseURL);

export const Decrypt = () => {
  // const [data, setData] = React.useState(null);
  const url = `${BaseURL}/api/encrypt`;
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  const [Text, SetText] = useState();
  const onChange = (text) => {
    console.log("cool", text.target.value);
    SetText(text.target.value);
  };
  const onSubmit = () => {
    console.log("on submit");
    SetText("");
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Custom Decrypt</h1>
      {!loading && <p>{data.data}</p>}
      {loading && <CircularProgress color="success" />}
      <TextField
        id="outlined-basic"
        label="Text to Encrypt"
        variant="outlined"
        onChange={onChange}
        value={Text}
      />
      <Button onClick={onSubmit}>Click me</Button>
    </Box>
  );
};
