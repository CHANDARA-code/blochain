import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BaseURL } from "../../env";

import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { decrypt } from "../../Lib/decrypt";

console.log("BaseURL:", BaseURL);

export const Decrypt = () => {
  const url = `${BaseURL}/api/encrypt`;
  const url_file = `${BaseURL}/api/encrypt-file`;
  const [data, setData] = useState();
  const [dataFile, setDataFile] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [DecryptData, SetDecryptData] = useState();
  const [DecryptDatarText, SetDecryptDataText] = useState();
  const [img, setImg] = useState();
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [url]);
  useEffect(() => {
    setLoading(true);
    fetch(url_file)
      .then((response) => response.json())
      .then((data) => {
        // console.log("haha:", data.data.base64);
        setDataFile(data.data.base64);
        SetDecryptData(decrypt(data.data.base64));
        setImg(decrypt(data.data.base64));
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [url_file]);
  const [Text, SetText] = useState();
  const onChange = (text) => {
    console.log("cool", text.target.value);
    SetText(text.target.value);
  };
  const onSubmit = () => {
    console.log("on submit");
    const decryptData = decrypt(Text);
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
      {<img src={`data:image/png;base64,` + img} />}
      {!loading && <p>Cypertext Text API : {data.data}</p>}

      {/* {!loading && <p>Cypertext File API : {dataFile}</p>} */}
      {loading && <CircularProgress color="success" />}
      <TextField
        id="outlined-basic"
        label="Text to Decrypt"
        variant="outlined"
        onChange={onChange}
        value={Text}
      />
      <Button onClick={onSubmit}>Click me</Button>
      {!loading && <p>Cypertext Text API : {DecryptDatarText}</p>}
    </Box>
  );
};
