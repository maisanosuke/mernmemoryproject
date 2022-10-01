import React from "react";
import {Grid, InputAdornment, IconButton} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {TextValidator} from 'react-material-ui-form-validator';

const Input = ({ half, name, label, type, autoFocus, showPassword, handleShowpassword, handleChange, value}) => {

  return (
    <Grid item xs={half ? 6 : 12}>

      <TextValidator
        autoFocus={autoFocus}
        required
        name={name}
        type={(name==='password' && showPassword) ? 'text' : type}
        variant='outlined'
        label={label}
        fullWidth
        onChange={handleChange}
        value={value}
        validators={name==='email' ? ['required', 'isEmail'] : name==='repeatPassword' ? ['required', 'isPasswordMatch']:['required']}
        errorMessages={name==='email' ? ['this field is required', 'Email is not valid'] : name==='repeatPassword' ? ['this field is required', 'Password Mismatch'] : ['this field is required']}
        InputProps={name==='password' ? 
        {
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  onClick={handleShowpassword}
                  //onMouseDown={handleMouseDownPassword}
                  //edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
        }: null}
        />

    </Grid>
  );
};

export default Input;
