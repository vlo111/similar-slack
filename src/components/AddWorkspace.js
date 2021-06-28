import React, {Component} from 'react';
import Wrapper from "./Wrapper";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Input from "./form/Input";
import PropTypes from 'prop-types';
import _ from 'lodash';
import { createWorkspaceRequest } from '../store/actions/workspace'
import Validate from "../helpers/Validate";
import { toast } from 'react-toastify';

class AddWorkspace extends Component {
    static propTypes = {
        createWorkspaceRequest: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            requestData: {
                workspace: '',
                member: '',
            },
            suggest: '',
            errors: {},
        };
    }

    goBack = () => {
        this.props.history.replace('/get-started/workspace')
    }

    handleChange = (path, value) => {
        const { requestData, errors } = this.state;
        _.set(requestData, path, value);
        _.unset(errors, path, value);

        this.setState({ requestData, errors, suggest: '' });
    }

    createWorkspace = async () => {
        const {requestData} = this.state;

        let errors = {};

        errors.workspace = Validate.required(requestData.workspace, 'workspace');

        errors.member = Validate.required(requestData.member, 'member');

        if (!errors.workspace && !errors.member) {
            const { payload } = await this.props.createWorkspaceRequest(requestData);

            const { data = {} } = payload;

            if (data.status === 'ok') {
                this.toast = toast.success('successfully created');

                this.goBack()
            }

            if (data.status === 'exist') {
                errors.workspace = 'THIS --WORKSPACE-- IS EXIST';

                this.setState({ errors, suggest:  [requestData.workspace + '1', requestData.workspace + '2']});
            }
        }
        else {
            this.setState({ errors });
        }
    }

    render() {

        const { requestData: { workspace, member, }, errors, suggest} = this.state;

        return (
            <Wrapper className='full_height full_width addWorkspace'>
                <div className="container">
                    <div className="mirror">
                       <h2> {workspace && workspace.length > 13
                            ? `${workspace.substr(0, 13)}... `
                            : workspace}</h2>
                    </div>
                    <h2 className="subheader">What’s the name of your
                        company or team?</h2>
                    <p className="deprecated-margin">This will be the
                        name of your Slack workspace — choose something that your team will recognize.</p>

                    <div className="signUp_form">
                        <Input
                            id="workspace"
                            label="Add Workspace"
                            placeholder="Ex: Acme Marketing or Acme Co"
                            value={workspace}
                            error={errors.workspace}
                            onChangeText={(v) => this.handleChange('workspace', v)}
                        />
                        {suggest.length ?
                            <div className="suggestion">
                                <p>Suggestion</p>
                                {suggest.map(p => <div onClick={() => this.handleChange('workspace', p)} className="suggestionText">{p} </div>)}
                            </div>
                             : <div />}
                    </div>
                    <div className="signUp_form">
                        <Input
                            id="member"
                            label="Add Member"
                            type="number"
                            min={0}
                            placeholder="Maximum number of members"
                            value={member}
                            error={errors.member}
                            onChangeText={(v) => this.handleChange('member', v)}
                        />
                        <div className="footerContainer">
                            <button onClick={() => this.goBack()}
                                    className="c_button c_button_large c_button_bring backBtn">
                                <i className="fa fa-arrow-left icon" aria-hidden="true"/>
                                Back
                            </button>

                            <button onClick={() => this.createWorkspace()}
                                    className="c_button c_button_large c_button_bring">Create
                            </button>
                        </div>
                    </div>
                </div>
            </Wrapper>);
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    createWorkspaceRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddWorkspace);

export default withRouter(Container);