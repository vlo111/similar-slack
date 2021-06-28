import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Validate from "../../helpers/Validate";

class Input extends Component {

    constructor(props) {
        super(props);

        this.state = {
            validEmail: false
        }
    }
    static propTypes = {
        id: PropTypes.string,
        onChangeText: PropTypes.func,
        onChange: PropTypes.func,
        label: PropTypes.string,
        error: PropTypes.string,
    }

    static defaultProps = {
        id: undefined,
        onChangeText: undefined,
        onChange: undefined,
        label: undefined,
        error: undefined,
    }

    handleChange = (ev) => {
        const { onChangeText } = this.props;

        const value = ev.target.value;
        const name = ev.target.name;

        if (onChangeText) {
            onChangeText(value, name);
        }

        if (ev.target.name === 'email') {
            if (Validate.isEmail(value)) {
                this.setState({ validEmail: true });
            }
            else {
                this.setState({ validEmail: false });
            }
        }
    }

    render() {
        const {
            id, label, placeholder, name, error, type, min, value
        } = this.props;

        const { validEmail } = this.state;

        return (
            <React.Fragment>
                {label ? (
                        <label htmlFor={id}
                               className="c-label onscreen">
                            <span className="c-label__text">{label}</span>
                            <span/>
                        </label>
                ) : null}

                <div className="signup_form__input">
                    <div>
                        <input
                            className={`${error && 'c-input_text_error'} c-input_text c-input_text--large`}
                            id={id}
                            value={value}
                            name={name}
                            type={type}
                            min={min}
                            placeholder={placeholder}
                            onChange={this.handleChange} />
                    </div>
                    {validEmail && <i className="c_success_icon fas fa-check" />}
                </div>
                {error ? (
                    <div className="error">
                        <i className="c_warning_icon" />
                        {error}
                    </div>
                ) : null}
            </React.Fragment>
        );
    }
}

export default Input;
