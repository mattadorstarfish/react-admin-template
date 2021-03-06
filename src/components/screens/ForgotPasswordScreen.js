import React from 'react';
import {connect} from 'react-redux';
import {forgotPassword} from "../../store/actions/auth";
import {DynamicForm} from "../form/DynamicForm";
import {hasErrors} from "../../helpers/validate";
import {Loading} from "../utility/Loading";

class Forgot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            fields: [
                {
                    name: 'email',
                    value: '',
                    label: 'Email',
                    type: 'email',
                    validation: {
                        presence: {
                            allowEmpty: false,
                            message: '^Please enter an email address'
                        },
                        email: {
                            message: '^Please enter a valid email address'
                        }
                    }
                }
            ]
        };
    }

    onSubmit = ({email}) => {
        this.setState(() => ({
            loading: true
        }));
        this.props.forgotPassword(email).then((action) => {
            if (!this.resultHasErrors(action)) {
                this.setState(() => ({
                    loading: false
                }));

                this.props.history.push("/login");
            }
            else {
                this.setState(() => ({
                    loading: false
                }));
            }
        }).catch((error) => {
            this.setState(() => ({
                loading: false,
                errors: error.payload.response.errors
            }));
        });
    };

    resultHasErrors = (action) => {
        if (hasErrors(action)) {
            this.setState(() => ({
                errors: {password: action.payload.response.message}
            }));

            return true;
        }

        return false;
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>Forgot Password</h1>
                    {
                        this.state.loading ? <Loading active={this.state.loading}/>
                            :
                            <DynamicForm
                                errors={this.state.errors}
                                fields={this.state.fields}
                                columns={2}
                                onSubmit={this.onSubmit}
                                submitLabel='Send Email'
                            />
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    forgotPassword: (email) => dispatch(forgotPassword(email))
});

export const ForgotPasswordScreen = connect(undefined, mapDispatchToProps)(Forgot);