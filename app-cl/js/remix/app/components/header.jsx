import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, Form, Link, Outlet } from '@remix-run/react';
import { useAuth } from '@clerk/remix';
import { ClientOnly } from 'remix-utils';
import { Button, Divider, Input, Layout, Menu, Space } from 'antd';
import { UserButton } from '@clerk/clerk-react';
const { Header, Content } = Layout;
const { Search } = Input;
function CustomHeader(props) {
    var __PS_MV_REG;
    const { userId, sessionId, getToken } = useAuth();
    __PS_MV_REG = [];
    return <Header className="z-10 sticky top-0 w-screen flex items-center shadow-black"><div className="w-full"><Menu className="w-full" theme="dark" mode="horizontal" defaultSelectedKeys={props.variant === 'proposals/list' ? ['1'] : []} items={[{ 'key' : '1', 'label' : 'All' }, { 'key' : '2', 'label' : 'My Proposals' }]}></Menu></div><Search className="w-full p-1" placeholder="search proposals" size="middle"></Search><ClientOnly>{() => {
    return userId ? <Link to={props.buttonLink}><Button type="primary" size="middle" disabled={props.buttonDisabled} onClick={props.buttonOnClick}>{props.buttonText}</Button></Link> : <a href="https://accounts.exciting.puma-58.lcl.dev/preview/sign-up" target="_blank" rel="noreferrer"><Button type="primary" size="middle">Sign In</Button></a>;
}}</ClientOnly><div className="w-fit min-w-fit ml-2 flex items-end"><UserButton></UserButton></div></Header>;
};
export default CustomHeader;