import React, { useState } from "react";
import { Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { BaseURL } from "../../env";
import { EncryptLib } from "../../Lib/encrypt";
import FileBase64 from "react-file-base64";
import { postData } from "../../Lib/postData";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { setToLocal, getFromLocal } from "../../Lib/localStorageLib";

export const Encrypt = () => {
  const [Text, SetText] = useState();
  const [TextEncrypt, SetTextEncrypt] = useState();
  const [TextEncryptFromLocal, SetTextEncryptFromLocal] = useState(
    getFromLocal("cypherText")?.cypherText
  );
  const [FileEncryptFromLocal, SetFileEncryptFromLocal] = useState(
    getFromLocal("FileImage")?.FileImage
  );
  const [files, setFiles] = useState();

  const onChange = (text) => {
    console.log("cool", text.target.value);
    SetText(text.target.value);
  };
  const baseURL = `${BaseURL}/api/rsa/decrypt`;

  const onSubmit = () => {
    console.log("on submit");
    const encryptText = EncryptLib(Text);

    if (Text) {
      console.log("encryptText:",encryptText)
      SetTextEncrypt(encryptText);
      setToLocal("cypherText", { text: encryptText });
      postData(baseURL, { text: encryptText }).then((data) => {
        SetText("");
        console.log(data);
      });
    }
  };

  return (
    <div>
      <h1>Text Input</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Text to Encrypt"
          variant="outlined"
          onChange={onChange}
          value={Text}
        />

        <Button onClick={onSubmit}>Click me</Button>
        <p>History</p>
        <p>{TextEncryptFromLocal ?`Text:${TextEncryptFromLocal}`:""}</p>
        <p>{FileEncryptFromLocal?`File:${FileEncryptFromLocal}`:""}</p>
      </Box>
    </div>
  );
};
