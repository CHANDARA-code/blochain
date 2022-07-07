import React, { useState } from "react";
import { Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { BaseURL } from "../../env";
import { encrypt } from "../../Lib/encrypt";
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
  const [FileEncrypt, SetFileEncrypt] = useState();
  const [FileEncryptFromLocal, SetFileEncryptFromLocal] = useState(
    getFromLocal("FileImage")?.FileImage
  );
  const [files, setFiles] = useState();

  const onChange = (text) => {
    console.log("cool", text.target.value);
    SetText(text.target.value);
  };
  const baseURL = `${BaseURL}/api/decrypt`;
  const baseURL_File = `${BaseURL}/api/decrypt-file`;

  const onSubmit = () => {
    console.log("on submit");
    const encryptText = encrypt(Text);
    const encryptFile = encrypt(files);

    if (Text) {
      console.log("text");
      SetTextEncrypt(encryptText);
      setToLocal("cypherText", { cypherText: encryptText });
      postData(baseURL, { ciphertext: encryptText }).then((data) => {
        SetText("");
        console.log(data);
      });
    }
    if (files) {
      console.log("file");
      SetFileEncrypt(encryptFile);
      setToLocal("FileImage", { fileEncrypt: encryptFile });
      postData(baseURL_File, { ciphertext: encryptFile }).then((data) => {
        setFiles(null);
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
        <FileBase64
          type="file"
          multiple={false}
          onDone={(data) => setFiles(data.base64)}
        />

        {/* <FileInput
          name="myImage"
          accept=".png,.gif"
          placeholder="My Image"
          className="inputClass"
          onChange={this.handleChange}
        /> */}

        <Button onClick={onSubmit}>Click me</Button>
        <p>History</p>
        <p>{TextEncryptFromLocal ?`Text:${TextEncryptFromLocal}`:""}</p>
        <p>{FileEncryptFromLocal?`File:${FileEncryptFromLocal}`:""}</p>
      </Box>
    </div>
  );
};
