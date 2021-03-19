import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";
import logo from "./ui/logo-coral.svg";

import "./css/uifont.css";
import "./css/props.css";
import "./css/App.css";

import { Route, NavLink, HashRouter } from "react-router-dom";

//Screen
import Header from "./screens/header";
import Sidebar from "./screens/sidebar";
import HomePage from "./screens/home";
import Rightbar from "./screens/rightbar";
import CoursePage from "./screens/course";
import DiscoverPage from "./screens/discover";
import CategoriesPage from "./screens/categories";
import MyCoursesPage from "./screens/mycourses";

import AccountPage from "./screens/oauth";

import firebase from "firebase";

global.firebase = firebase;
global.fire = {
    ID: null,
};

// var firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     databaseURL: "YOUR_DB_URL",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_SENDER_ID",
//     appId: "YOUR_APP_ID",
// };
var firebaseConfig = {
    apiKey: "AIzaSyArmCLqInefBdesmqRXkQcxMcLRdfeUBu4",
    authDomain: "sm-lms-demo-1.firebaseapp.com",
    databaseURL: "https://sm-lms-demo-1-default-rtdb.firebaseio.com/",
    projectId: "sm-lms-demo-1",
    storageBucket: "sm-lms-demo-1.appspot.com",
    messagingSenderId: "257525549329",
    appId: "1:257525549329:web:408301dd2ac332fd9264b0",
    // measurementId: "G-BM9VNM7ZZR",
};

// Initialize Firebase
global.firebase.initializeApp(firebaseConfig);

export default function AppLoader() {
    const [isFireUser, setIsFireUser] = useState(false);

    const initFirebase = async (context) => {
        global.firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("You are signed in...");
                setIsFireUser(true);
            } else {
                console.log("You are guest...");
                setIsFireUser(false);
                setTimeout(() => {
                    context.setAppLoaded(true);
                }, 500);
            }
        });
    };

    const splash = (context) => {
        return (
            <div className="App flex">
                <div className="splash abs abc">
                    <img src={logo} className="bl" />
                </div>
            </div>
        );
    };

    const loadApp = async (context) => {
        await initFirebase(context);
    };

    return (
        <AppContext.Consumer>
            {(context) => {
                return context.appLoaded() ? (
                    <div className="App flex">
                        <HashRouter>
                            <Sidebar />
                            <div className="app-content">
                                <Route exact path="/" component={HomePage} />
                                <Route
                                    path="/course/:courseid"
                                    component={CoursePage}
                                />
                                <Route
                                    path="/discover"
                                    component={DiscoverPage}
                                />
                                <Route
                                    path="/cates"
                                    component={CategoriesPage}
                                />
                                <Route
                                    path="/my-courses"
                                    component={MyCoursesPage}
                                />
                                <Route path="/oauth" component={AccountPage} />
                            </div>
                        </HashRouter>
                    </div>
                ) : (
                    <AppContext.Consumer>
                        {(context) => {
                            loadApp(context);
                            return splash(context);
                        }}
                    </AppContext.Consumer>
                );
            }}
        </AppContext.Consumer>
    );
}
