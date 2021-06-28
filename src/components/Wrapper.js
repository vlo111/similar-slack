import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMyAccountRequest } from '../store/actions/account';

class Wrapper extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        token: PropTypes.string.isRequired,
        className: PropTypes.string,
        auth: PropTypes.bool,
        getMyAccountRequest: PropTypes.func.isRequired,
    }

    static defaultProps = {
        auth: true,
        className: undefined,
    }

    componentDidMount() {
        const { auth } = this.props;
        if (auth) {
            this.props.getMyAccountRequest();
        }
    }

    render() {
        const {
            className, children, token, auth,
        } = this.props;

        if (!token && auth) {
            return (<Redirect to="/" />);
        }

        return (
            <main className={className}>
                {children}
            </main>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.account.token,
});

const mapDispatchToProps = {
    getMyAccountRequest
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Wrapper);

export default Container;
