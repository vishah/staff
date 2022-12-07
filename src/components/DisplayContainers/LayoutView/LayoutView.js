import React, { Component } from 'react';
import { Menu, Layout, Icon } from 'antd';
import styles from './LayoutView.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
const { Header, Content, Sider } = Layout;

class LayoutView extends Component {
    state = {
        current: '',
    };


    componentDidMount() {

    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });

    };

    menuOnClick = (item) => {
        console.log(item.key)
    }

    render() {
        const { SubMenu } = Menu;

        let containerClass = styles.Container;

        return (
            <Layout className={containerClass}>
                <Header
                    theme="light"
                >

                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                        onClick={this.handleClick}
                    >
                        {!this.props.isAuthenticated
                            ? <Menu.Item key="login">
                                <NavLink
                                    to='/login'
                                    exact
                                >
                                    Login
                                </NavLink>
                            </Menu.Item>
                            : <Menu.Item key="logout">
                                <NavLink
                                    to='/logout'
                                    exact
                                >
                                    Logout
                                </NavLink>
                            </Menu.Item>
                        }
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={250} collapsible={true} style={{ background: '#AAAAAA' }} breakpoint="lg" collapsedWidth="0">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            onClick={this.menuOnClick}
                        >
                            <SubMenu
                                key="Staff"
                                title={
                                    <span><Icon type="bank" />Staff</span>
                                }
                            >
                                <Menu.Item key="viewStaff">
                                    <NavLink to='/staff' exact >Overview</NavLink>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Content style={{ padding: '50px 50px' }}>
                        {this.props.children}
                    </Content>

                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.access_token !== null,
    }
}
export default connect(mapStateToProps)(LayoutView);
