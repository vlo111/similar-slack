import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Input from "./form/Input";
import WrapperSign from "./WrapperSign";
import Validate from "../helpers/Validate";
import _ from 'lodash';
import { signInRequest } from '../store/actions/account';
import { toast } from 'react-toastify';
import OAuthButtonGoogle from "./Account/OAuthButtonGoogle";

class SignIn extends Component {
    static propTypes = {
        signInRequest: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            requestData: {
                email: '',
                password: '',
            },
            errors: {},
        };
    }

    handleChange = (value, path) => {
        const { requestData, errors } = this.state;

        _.set(requestData, path, value);

        _.unset(errors, path, value);

        this.setState({ requestData, errors });
    }

    signIn = async (ev) => {
        ev.preventDefault();

        const { requestData: { email, password } } = this.state;

        let errors = {};

        errors.email = Validate.emailName(email);

        errors.password = Validate.password(password);

        if (!errors.email && !errors.password) {

            const { payload } = await this.props.signInRequest(email, password);

            const { data = {} } = payload;

            if (data.status !== 'ok') {
                this.toast = toast.error('Invalid email or password');
            }
            this.setState({ errors });
        }
        else {
            this.setState({ errors });
        }
    }

    render() {
        const { requestData: { password, email }, errors } = this.state;

        return (
            <WrapperSign>
                <div className="get_started_app_root">
                    <header className="header-signUp">
                        <div className="left-col"/>
                        <div className="center-col">
                            <Link target="_self" className="c-link" to="/">
                                <img src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" height="34"
                                     title="Slack"
                                     alt='slack'/>
                            </Link>
                        </div>
                        <div className="right-col"/>
                    </header>
                    <div className="content">
                        <h1 className="headerText">First, enter your email</h1>
                        <div className="sub_heading">We suggest using the <strong>email address you
                            use at work.</strong>
                        </div>
                        <div className="signUp_google_form">
                            <OAuthButtonGoogle />
                            <div className="horizontal_content">
                                <hr className="horizontal_content-left"/>
                                <div className="horizontal_content-middle">OR</div>
                                <hr className="horizontal_content-right"/>
                            </div>
                        </div>
                        <form onSubmit={this.signIn} className="signUp_form">
                            <Input
                                id="email"
                                name="email"
                                label="Email address"
                                placeholder="name@work-email.com"
                                value={email}
                                error={errors.email}
                                onChangeText={this.handleChange}
                            />

                            <Input
                                id="password"
                                name="password"
                                label="Password"
                                placeholder="Your password"
                                value={password}
                                error={errors.password}
                                onChangeText={this.handleChange}
                            />
                            <button
                                className="c_button c_button_large c_button_bring"
                                id="submit_btn" data-style="expand-right" data-qa="submit_button" type="submit">Sign In
                            </button>
                            <div className="existing_workspaces">
                                <div className="form__already_using">Do you want to create a new account?</div>
                                <Link target="_self" className="c-link" to="/account/sign-up">
                                    Sign up to a create account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </WrapperSign>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    signInRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignIn);

export default Container;
