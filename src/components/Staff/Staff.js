import React, { Component } from 'react';
//import styles from './Auth.module.css';
import { Row, Col, Card } from 'antd';
import StaffForm from './Staff/StaffForm';

class Auth extends Component {

    render() {
       
        return (
            <Row type="flex" justify="center">
                <Col xl={24} md={24} xs={24}>
                    <h2>Employments</h2>
                    <h4>A list of all employments for the individual.</h4>
                    <Card
                        bordered={false}
                    >
                       <StaffForm/> 
                    </Card>
                </Col>
            </Row>
            

        );
    }

}
export default Auth;

/*help={<div className={styles.Label}>Should be a valid password</div>}*/
