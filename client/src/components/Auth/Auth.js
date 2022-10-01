import React from 'react'
import useStyles from './styles';
import { Container, Grid, Button, Avatar, Paper, Typography} from "@material-ui/core";
import {Lock} from "@material-ui/icons";
import Input from "./Input";
import {GoogleLogin} from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import {ValidatorForm} from 'react-material-ui-form-validator';
import { useDispatch } from 'react-redux';
import { login, signup, signin } from '../../actions/actions';
import {useHistory} from "react-router-dom";

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const initialUserInfo = () => (
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: ''
        }
    )

    const [isSignUp, setIsSignUp] = React.useState(true); 
    const [showPassword, setShowPassword] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState(initialUserInfo());

        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== userInfo.password) {
                return false;
            }
            return true;
        });

    function handleChange(e){
        const {name, value} = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();

        if (isSignUp) {//login
          dispatch(signin(userInfo, history));
        } 
        else {//signup
          dispatch(signup(userInfo, history));
        }
    }

    function handleShowPassword (){
        setShowPassword(prevState => !prevState);
    }

    async function googleSignIn(res) {
      const decoded = jwt_decode(res.credential);
      console.log(decoded);
      const { name, email, picture, sub } = decoded;
      const user = {
          name: name,
          email: email,
          imageUrl: picture,
          _id: sub,
          token: res.credential
      }
      dispatch(login(user));
      history.goBack(); //history.push('/');
    }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}><Lock/></Avatar>
        <Typography variant='h5'>{isSignUp ? "Sign In" : "Sign Up"}</Typography>
        <ValidatorForm className={classes.form} onSubmit={handleSubmit}  onError={errors => console.log(errors)}>
        <Grid container spacing={2}>
            {!isSignUp &&
            <>
                <Input type='text' value={userInfo.firstName} autoFocus half name='firstName' label='First Name' handleChange={handleChange}/>
                <Input type='text' value={userInfo.lastName} half name='lastName' label='Last Name' handleChange={handleChange}/>
            </>}
            <Input type='email' value={userInfo.email} name='email' label='Email Address' handleChange={handleChange}/>
            <Input type='password' value={userInfo.password} name='password' label='Password' showPassword={showPassword} handleShowpassword={handleShowPassword}  handleChange={handleChange}/>
            {!isSignUp && <Input value={userInfo.repeatPassword} type='password' name='repeatPassword' label='Repeat Password' handleChange={handleChange} />}
        </Grid>
            <Button type='submit' className={classes.submit} fullWidth color='primary' variant='contained'>{isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            {/* <Button onClick={googleSignIn} className={classes.googleButton} fullWidth color='primary' variant='contained'>{icon()} &nbsp; GOOGLE SIGN IN</Button> */}
            <GoogleLogin className={classes.googleButton} onSuccess={googleSignIn} onError={(e)=>{console.log('Google Login Failed. Try again later',e);}}/>
        <Grid container justifyContent='flex-end'>
            <Grid item><Button onClick={()=>setIsSignUp(preState=>!preState)}>{isSignUp ? "DON'T HAVE ACCOUNT? SIGN UP" : "ALREADY HAVE ACCOUNT? SING IN"}</Button></Grid>
        </Grid>
        </ValidatorForm>
      </Paper>
    </Container>
  )
}

export default Auth
