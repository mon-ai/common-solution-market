import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, Link, Outlet } from '@remix-run/react';
import { Button, Input, Layout, Menu, Modal, Space } from 'antd';
const { Header, Content, Footer } = Layout;
const { Search } = Input;
import { json } from '@remix-run/node';
async function loader() {
    return null;
};
function Proposals() {
    return <Layout><Header className="z-10 sticky top-0 w-screen flex items-center shadow-black"><div className="w-full"><Menu className="w-full" theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={[{ 'key' : '1', 'label' : 'All' }, { 'key' : '2', 'label' : 'My Proposals' }]}></Menu></div><Search className="w-full p-1" placeholder="search proposals" size="middle"></Search><Link to="/mmon/proposals/new"><Button type="primary" size="middle">New Proposal</Button></Link></Header><Content><Outlet></Outlet></Content></Layout>;
};
export default Proposals;
export { loader };