import React, { useState } from "react";
import { Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { BaseURL } from "../../env";
export const Encrypt = () => {
  const [Text, SetText] = useState();
  const onChange = (text) => {
    console.log("cool", text.target.value);
    SetText(text.target.value);
  };
  const baseURL = `${BaseURL}/api/encrypt`;

  const onSubmit = () => {
    console.log("on submit");
    SetText("");
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
      </Box>
    </div>
  );
};
