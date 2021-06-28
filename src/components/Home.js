import React from "react";
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';

function App() {
    return (
        <>
            <Wrapper className="homePage" auth={false}>
                <header className="homeHeader"/>
                <div className="home_page_container">
                    <div className="middle">
                        <div className="inner">
                            <h1 className="homepage_section">Slack
                                makes it <span
                                    className="homepage_sectionText-yellow">downright pleasant</span> to work
                                together</h1>
                            <Link className="c_button signInBtn" to="/get-started/sign-in">Get started</Link>
                        </div>
                    </div>
                </div>
                <footer/>
            </Wrapper>
        </>
    );
}

export default App;
