import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import { ToastContainer, Slide as ToastSlide } from 'react-toastify';
import Workspaces from "./components/Workspaces";
import AddWorkspace from "./components/AddWorkspace";

function App() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/get-started/workspace" component={Workspaces} />
                    <Route path="/account/sign-up" component={SignUp} />
                    <Route path="/workspace/create" component={AddWorkspace} />
                    <Route path="/sign/sign-out" component={SignOut} />
                    <Route path="/get-started/sign-in" component={SignIn} />
                    <Route path="/" component={Home} />
                </Switch>
            </BrowserRouter>
            <ToastContainer hideProgressBar transition={ToastSlide} autoClose={3000} pauseOnFocusLoss={false} />
        </>
    );
}

export default App;
