import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { oAuthRequest } from '../../store/actions/account';
import { toast } from "react-toastify";
import {ReactComponent as ChromeSVG} from "../../assets/images/authGoogle.svg";

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

class OAuthButtonGoogle extends Component {
    static propTypes = {
        oAuthRequest: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        window.handleGoogleInit = this.handleGoogleInit;
    }

    handleGoogleInit = () => {
        const { gapi } = window;
        gapi.load('auth2', () => {
            const auth = gapi.auth2.init({
                client_id: REACT_APP_GOOGLE_CLIENT_ID,
                cookiepolicy: 'single_host_origin',
            });
            auth.attachClickHandler(this.button, {}, (googleUser) => {
                const { mc: { access_token: accessToken } } = googleUser;
                if (!accessToken) {
                    toast.error('Something went wrong');
                    return;
                }
                this.props.oAuthRequest('google', { accessToken });
            }, (error) => {
                if (error.error !== 'popup_closed_by_user') {
                    toast.error(`Something went wrong: ${error.error}`);
                }
                console.warn(error);
            });
        });
    }

    render() {
        return (
            <>
                <Helmet>
                    <script async defer src="https://apis.google.com/js/api:client.js?onload=handleGoogleInit" />
                </Helmet>
                <div className="mail_form">
                    <button ref={(ref) => this.button = ref}
                        className="c_button c_button_primaty c_button_large full_width" type="button">
                        <ChromeSVG/>
                        <span className="c-google_login__label"><span>Continue with Google</span></span>
                    </button>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    oAuthRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OAuthButtonGoogle);

export default Container;
