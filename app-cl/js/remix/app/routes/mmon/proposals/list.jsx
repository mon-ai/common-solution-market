import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, Form, Link, Outlet } from '@remix-run/react';
import { useAuth } from '@clerk/remix';
import { Layout } from 'antd';
import Header from '~/components/header';
const { Content } = Layout;
import { json } from '@remix-run/node';
async function loader() {
    return null;
};
function ListProposals() {
    var __PS_MV_REG;
    const { userId, sessionId, getToken } = useAuth();
    __PS_MV_REG = [];
    return <Layout><Header variant="proposals/list" buttonLink="/mmon/proposals/new" buttonMethod="get" buttonText="New Proposal"></Header><Content className="p-6"><Outlet></Outlet></Content></Layout>;
};
export default ListProposals;
export { loader };