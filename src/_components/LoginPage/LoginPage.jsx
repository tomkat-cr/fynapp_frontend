import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../../_services/db.authentication.service';
import { getUrlParams } from '../../_helpers/url-params';
import { console_debug_log } from '../../_services/loging.service';
import { WAIT_ANIMATION_IMG } from '../../_constants/general_constants';
import { getPrefix, history } from '../../_helpers/history';
import { Navigate } from 'react-router-dom';
class LoginPage extends React.Component {

    urlParams = {}

    constructor(props) {
        super(props);

        this.props = props;
        this.urlParams = getUrlParams(props);
        if( typeof this.urlParams.redirect === 'undefined') {
            this.urlParams.redirect = getPrefix(true)+'/';
        }

        // // redirect to home if already logged in
        // if (authenticationService.currentUserValue) { 
        //     // history.push(this.urlParams.redirect);
        // }
    }

    render() {
        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            return <Navigate to={{ pathname: this.urlParams.redirect, state: { from: this.props.location } }} />
        }

        return (
            <div>
                <div className="alert alert-info">
                    FynApp
                </div>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    let from;
                                    if (typeof this.props.location !== 'undefined') {
                                        if (typeof this.props.location.state !== 'undefined') {
                                            from = this.props.location.state.from;
                                        }
                                    }
                                    if (!from) {
                                        from = { pathname: this.urlParams.redirect };
                                    }
                                    history.push(from);
                                },
                                error => {
                                    setSubmitting(false);

                                    // console_debug_log('..--> LoginPage.render.Formik() | response NO ok... / error =');
                                    console_debug_log(error);
                        
                                    setStatus(error);
                                }
                            );
                    }}
                >{({ errors, status, touched, isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                            {isSubmitting &&
                                <img src={WAIT_ANIMATION_IMG} alt="Wait..."/>
                            }
                        </div>
                        {status &&
                            <div className={'alert alert-danger'}>{status}</div>
                        }
                    </Form>
                )}
                </Formik>
            </div>
        )
    }
}

export { LoginPage }; 