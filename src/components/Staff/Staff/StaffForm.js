import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Table, Icon } from 'antd';
import styles from './StaffForm.module.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CSVLink } from "react-csv";
import { Col } from '../../../../node_modules/antd/lib/index';

class StaffForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.searchEmployee(values.id_card_no, this.props.access_token)
            }
        });
    };

    render() {
        let authRedirect = null;
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to="/login" />
        }
        const { getFieldDecorator } = this.props.form;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Employer Name',
                dataIndex: 'employer_name',
                key: 'employer_name',
            },
            {
                title: 'Member Name',
                dataIndex: 'member_name',
                key: 'member_name',
            },
            {
                title: 'NIC',
                dataIndex: 'nic',
                key: 'nic',
            },
            {
                title: 'Start Date',
                dataIndex: 'start_date',
                key: 'start_date',
            },
            {
                title: 'End Date',
                dataIndex: 'end_date',
                key: 'end_date',
            },
        ];
        return (
            <div>
                {authRedirect}
                <Col xs={24}>
                    < Form layout="inline" onSubmit={this.handleSubmit} className="login-form"  >
                        <Form.Item>
                            {getFieldDecorator('id_card_no', {
                                rules: [{ required: true, message: 'Please input staff ID!' }],
                            })(
                                <Input
                                    placeholder="Staff ID Card No,"
                                    size="large"
                                    style={{ width: "400pt", marginBottom: 10 }}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                icon="search"
                                htmlType="submit"
                                className={styles.StaffFormButton}
                                size="large"
                            >
                                Search
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            {this.props.data && <Button
                                type="primary"
                                className={styles.StaffFormButton}
                                size="large">
                                <CSVLink
                                    filename={"table.csv"}
                                    data={this.props.data}
                                    className="btn btn-primary">
                                    Export to CSV
                                </CSVLink>
                            </Button>}
                        </Form.Item>
                    </Form >
                </Col>
                <Col xs={24}>
                    <Table dataSource={this.props.data} columns={columns} />
                </Col>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        access_token: state.auth.access_token,
        isAuthenticated: state.auth.access_token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        data: state.staff.data
    }
}
const mapDispatchToProps = dispatch => {
    return {
        searchEmployee: (id_card_no, access_token) => dispatch(actions.searchStaff(id_card_no, access_token))
    }
}
//export default Form.create()(StaffForm);
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(StaffForm));
