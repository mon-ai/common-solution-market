import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, useOutletContext, Form, Link } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import { Button, Card, Divider, Input, Space } from 'antd';
import { json, redirect } from '@remix-run/node';
import { getAuth } from '@clerk/remix/ssr.server';
import { stripe, redis } from '~/services/clients.server';
async function loader(req) {
    var __PS_MV_REG;
    const request = req.request;
    const { userId } = await (getAuth(request));
    const cachedName = await (redis.get('autosave-proposal:name' + userId));
    __PS_MV_REG = [];
    return json({ 'cachedName' : cachedName });
};
async function action(req) {
    var __PS_MV_REG;
    const request = req.request;
    const body = await (request.formData());
    const { userId } = await (getAuth(request));
    const reply = await (redis.set('autosave-proposal:name' + userId, body.get('name')));
    __PS_MV_REG = [];
    return reply === 'OK' ? redirect('/mmon/proposals/new/elaborate') : json({ 'error' : 'failed to save proposal name to cache' });
};
function ProposeForm(props) {
    var __PS_MV_REG;
    const { name, setName, nextDisabled } = useOutletContext();
    const data = useLoaderData();
    useEffect(() => {
        if (data.cachedName) {
            setName(data.cachedName);
        };
        __PS_MV_REG = [];
        return undefined;
    }, []);
    __PS_MV_REG = [];
    return <Card className="w-full h-auto min-h-[50vh] shadow-ant-light"><Form method="post"><Space className="w-full" direction="vertical"><Input name="name" value={name} onChange={(e) => {
    __PS_MV_REG = [];
    return setName(e.target.value, null);
}} placeholder="What would you like to solve?"></Input><Button type="primary" htmlType="submit" disabled={nextDisabled}>Confirm and Elaborate</Button></Space></Form></Card>;
};
export default ProposeForm;
export { loader, action };