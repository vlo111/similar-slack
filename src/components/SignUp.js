import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Input from "./form/Input";
import { signUpRequest } from '../store/actions/account';
import WrapperSign from "./WrapperSign";
import Validate from "../helpers/Validate";
import PropTypes from 'prop-types';
import _ from 'lodash';
import { toast } from 'react-toastify';

class SignUp extends Component {
    static propTypes = {
        signUpRequest: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            requestData: {
                lastName: '',
                firstName: '',
                email: '',
                password: '',
                passwordConfirm: '',
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

    signUp = async (ev) => {
        ev.preventDefault();

        const { requestData: { email, password } } = this.state;

        let errors = {};

        errors.email = Validate.emailName(email);

        errors.password = Validate.password(password);

        const { payload } = await this.props.signUpRequest(this.state.requestData);

        const { data = {} } = payload;

        if (data.status === 'ok') {
            this.props.history.push('/get-started/sign-in');

            alert('You have successfully signed up, please try to log in')

            return;
        }

        if (data.status === 'error') {
            toast.error(data.message);
        }
        this.setState({ errors: data.errors || {}, loading: false });
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
                            <div className="horizontal_content">
                                <hr className="horizontal_content-left"/>
                                <div className="horizontal_content-middle">Sign Up</div>
                                <hr className="horizontal_content-right"/>
                            </div>
                        </div>
                        <form onSubmit={this.signUp} className="signUp_form">
                            <Input
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                placeholder="Your first name"
                                value={email}
                                // error={errors.email}
                                onChangeText={this.handleChange}
                            />

                            <Input
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                placeholder="Your last name"
                                value={password}
                                // error={errors.password}
                                onChangeText={this.handleChange}
                            />

                            <Input
                                id="email"
                                name="email"
                                label="Email"
                                placeholder="Your email"
                                value={password}
                                // error={errors.password}
                                onChangeText={this.handleChange}
                            />

                            <Input
                                id="password"
                                name="password"
                                label="Password"
                                placeholder="Your password"
                                value={password}
                                // error={errors.password}
                                onChangeText={this.handleChange}
                            />

                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                value={password}
                                // error={errors.password}
                                onChangeText={this.handleChange}
                            />
                            <button
                                className="c_button c_button_large c_button_bring" type="submit">Sign Up
                            </button>
                            <div className="existing_workspaces">
                                <div className="form__already_using">Already using Slack?</div>
                                <Link target="_self" className="c-link" to="/get-started/sign-in">
                                    Sign in to an existing account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </WrapperSign>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.account.token,
});

const mapDispatchToProps = {
    signUpRequest,
};
const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignUp);

export default Container;
