import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, Link, Outlet } from '@remix-run/react';
import { Button, Input, PageHeader, Space } from 'antd';
import { json } from '@remix-run/node';
async function loader() {
    return null;
};
function New() {
    var __PS_MV_REG;
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    return <div><PageHeader onBack={function () {
    navigate(-1);
    __PS_MV_REG = [];
    return null;
}} title="New Proposal" extra={[<Button key="3" type="link">Restart</Button>, <Button key="2" type="default">Back<onClick></onClick>{function () {
    __PS_MV_REG = [];
    return setStep(Math.max(0, step - 1));
}}</Button>, <Button key="1" type="primary">Next<onClick></onClick>{function () {
    __PS_MV_REG = [];
    return setStep(Math.max(0, step - 1));
}}</Button>]}></PageHeader></div>;
};
export default New;
export { loader };