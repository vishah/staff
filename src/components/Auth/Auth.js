import React, { Component } from 'react';
//import styles from './Auth.module.css';
import { Row, Col, Card } from 'antd';
import LoginForm from './LoginForm/LoginForm';

class Auth extends Component {
    state = {
        cardTitle: 'Login',
        currentForm: 'login'
    }
    goToLoginPage = () => {
        this.setState({
            cardTitle: 'Login',
            currentForm: 'login'
        })
    }

    render() {
        let currForm = null;
        if (this.state.currentForm === 'login') {
            currForm = <LoginForm />
        }

        return (
            <Row type="flex" justify="center">
                <Col xl={8} md={12} xs={24}>
                    <Card
                        title={this.state.cardTitle}
                        bordered={false}
                    >
                        {currForm}
                    </Card>
                </Col>
            </Row>

        );
    }

}
export default Auth;

