import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BaseURL } from "../../env";

import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { DecryptLib } from "../../Lib/decrypt";
import { setToLocal, getFromLocal } from "../../Lib/localStorageLib";

console.log("BaseURL:", BaseURL);

export const Decrypt = () => {
  const url = `${BaseURL}/api/rsa/encrypt-public`;
  const [data, setData] = useState();
  const [dataFile, setDataFile] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [DecryptData, SetDecryptData] = useState();
  const [DecryptDatarText, SetDecryptDataText] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data.data);
        console.log("data:", data);
        const haha = DecryptLib(data.data);
        console.log("Decrypt=>:", haha);
        SetDecryptDataText(haha);
        setData(data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [url]);

  const [Text, SetText] = useState();
  const onChange = (text) => {
    console.log("cool", text.target.value);
    SetText(text.target.value);
  };
  const onSubmit = () => {
    console.log("on submit");
    const decryptData = DecryptLib(Text);
    SetDecryptData(decryptData);
    SetDecryptDataText(decryptData);
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
      <p>{loading ? "" : data.data}</p>
      <TextField
        id="outlined-basic"
        label="Text to Decrypt"
        variant="outlined"
        onChange={onChange}
        value={Text}
      />
      <Button onClick={onSubmit}>Click me</Button>
      {!loading && <p>Decrypt Cypertext:{DecryptDatarText}</p>}
    </Box>
  );
};
