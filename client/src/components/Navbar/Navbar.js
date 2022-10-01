import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Typography, Toolbar, Button, Avatar} from "@material-ui/core";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import useStyles from "./styles";
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../actions/actions';
import { useHistory, useLocation } from 'react-router-dom';
import {flash} from 'react-universal-flash';
import jwt_decode from 'jwt-decode';

export default function Navbar(){
    const classes = useStyles();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    //if it has been 1hr(expiration) since the current user logged in then log out the user when they tried to refresh page
    React.useEffect(()=>{
      const token = user?.token;
      if(token){
        const decoded = jwt_decode(token);
        //console.log(`Date.now(): ${Date.now()} >= decoded.exp*1000: ${decoded.exp*1000} ?`);//1sec is 1000 
        if(Date.now() >= decoded.exp * 1000){ 
          dispatch(logout());
          history.push('/auth');
          flash("Session expired! Please Log back in!", 5000, 'error');
        }
      }
    }, [location]) //location contains info about currentURL

    const handleLogout = () => {
      dispatch(logout());
      history.push('/auth');
      flash("Successfully Loged out!", 10000, 'success');
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Link to="/" className={classes.brandContainer}>
            <img src={memoriesText} alt="icon" height='45px' />
            <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
          </Link>
          <Toolbar className={classes.toolbar}>
            {
              user ? (
                <div className={classes.profile}>
                  <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant='h6'>{user.name}</Typography>
                  <Button color='secondary' variant='contained' onClick={handleLogout}>Log out</Button>
                </div>)
                : <Button color='primary' variant='contained' component={Link} to='/auth'>Sign in</Button>
            }

          </Toolbar>
        </AppBar>
    );
}
