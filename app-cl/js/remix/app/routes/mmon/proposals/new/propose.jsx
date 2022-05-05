import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, useOutletContext, Form, Link } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import { Button, Card, Divider, Input, Space } from 'antd';
function ProposeForm() {
    var __PS_MV_REG;
    const { name, setName, nextDisabled } = useOutletContext();
    __PS_MV_REG = [];
    return <Card className="w-full h-auto min-h-[50vh] shadow-ant-light"><Space className="w-full" direction="vertical"><Input value={name} onChange={(e) => {
    __PS_MV_REG = [];
    return setName(e.target.value, null);
}} placeholder="What would you like to solve?"></Input><Link to="/mmon/proposals/new/elaborate"><Button type="primary" disabled={nextDisabled}>Confirm and Elaborate</Button></Link></Space></Card>;
};
export default ProposeForm;