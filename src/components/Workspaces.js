import React, {Component} from "react";
import Wrapper from "./Wrapper";
import {Link, withRouter} from "react-router-dom";
import {ReactComponent as UserSVG} from "../assets/images/users.svg";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getWorkspacesRequest} from '../store/actions/workspace'
import memoizeOne from 'memoize-one';

class Workspaces extends Component {
    static propTypes = {
        myAccount: PropTypes.object.isRequired,
        getWorkspacesRequest: PropTypes.func.isRequired,
    }

    getWorkspaces = memoizeOne((id) => {
        this.props.getWorkspacesRequest(id)
    })

    render() {
        const {
            myAccount, workspaces
        } = this.props;
        if (myAccount) {
            this.getWorkspaces(myAccount._id);
        }
        return (
            <Wrapper className='workspaces full_height full_width'>
                <header>
                    <div className="headerLogo">
                        <div className="left-col"/>
                        <div className="center-col">
                            <Link target="_self" className="c-link" to="/">
                                <img src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" height="34"
                                     title="Slack"
                                     alt='slack'/>
                            </Link>
                        </div>
                        <div className="right-col">
                            <div className="confirmEmail">
                                Confirmed as
                                <span title={myAccount.email}
                                      className="email"> {myAccount.email} </span>
                                <Link className="confirmEmailLink" to="/sign/sign-out">
                                    Change
                                </Link>
                            </div>
                            <div className="lastPanel"/>
                        </div>
                    </div>
                    <div className="headerContent">
                        <div className="display_flex">
                            <div className="createWorkspacePanel">
                                <h2 className="get_started_title">Create a new Slack
                                    workspace</h2>
                                <div className="p-get_started_subtitle">Slack gives
                                    your team a home — a place where they can talk and work together. To create a new
                                    workspace, click the button below.
                                </div>
                                <button
                                    onClick={() => this.props.history.replace('/workspace/create')}
                                    className="c_button c_button_large c_button_bring">
                                    Create a Workspace
                                    <i className="fa fa-arrow-right icon" aria-hidden="true"/>
                                </button>
                                <div className="credentials">By
                                    continuing, you’re agreeing to our Customer Terms of
                                    Service, Privacy Policy and Cookie Policy.
                                </div>
                            </div>
                            <div className="userPicture">
                                <UserSVG/>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="footer">
                    <div className="workspacesBottom">
                        <div className="workspacesContent">
                            <div className="container">
                                <div className="workspaces_or_divider">
                                    <div className="workspaces_or_dividerText">OR</div>
                                </div>
                                <h3 className="workspaces_title">Open a workspace</h3>
                            </div>

                            <div className="workspace_list_container">
                                <div className="panel_subtitle"><h4>Workspaces
                                    for <strong>{myAccount.email}</strong></h4>
                                </div>
                                <div className="workspace_list">
                                    {workspaces.length ? workspaces.map(w =>
                                        (<Link className="workspaces_list__link" to="#">
                                            <div className="workspace_info">
                                                <i className="c_team_default"
                                                   role="img">{w.workspace.substring(0, 1).toUpperCase()}</i>
                                                <div className="p-workspace_info__content">
                                                    <div className="p-workspace_info__title">{w.workspace}</div>
                                                    <div className="p-workspace_info__members">
                                                        <div className="avatar_stack">
                                                            <img className="avatar"
                                                                 src="https://secure.gravatar.com/avatar/98c0fb8ec64c3b856c323a4a14adfc04.jpg?s=48&amp;d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0012-48.png"
                                                                 alt="User Avatar"/>
                                                        </div>
                                                        <div className="count">{w.member ? w.member : 0} members</div>
                                                    </div>
                                                </div>
                                                <div className="workspace_info__action">
                                                    <i className="fa fa-arrow-right icon" aria-hidden="true"/>
                                                </div>
                                            </div>
                                        </Link>)
                                    ) : <div/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    myAccount: state.account.myAccount,
    workspaces: state.workspace.workspaces,
});

const mapDispatchToProps = {
    getWorkspacesRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Workspaces);

export default withRouter(Container);