import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetail from "./components/PostDetail/PostDetail";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Flasher } from "react-universal-flash";
import { Message } from "./components/Message/Message";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";


export default function App() {
  const user = useSelector(state => state.user);

  return (
    <GoogleOAuthProvider clientId="440715594921-qjdr7veoc2sitpmgr9agla6kmsdsv4h9.apps.googleusercontent.com">
      <BrowserRouter basename="/">
        <Flasher position="top_center">
          <Message />
        </Flasher>
        <Container maxwidth="xl">
          <Navbar />
          {/* {isLoading ? <Route component={Loading} /> : */}
          <Switch>
            <Route exact path="/" component={()=><Redirect to='/posts'/>} />
            <Route exact path="/posts" component={Home} />
            <Route exact path="/posts/search" component={Home} />
            <Route path="/posts/:id" component={PostDetail} />
            <Route exact path="/auth" component={()=>(user==null? <Auth/> : <Redirect to='/posts'/>)} />
          </Switch> 
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
