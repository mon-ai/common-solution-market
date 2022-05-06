import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoaderData, Form, Link, Outlet } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import { Button, Card, Divider, Layout, PageHeader, Space, Steps } from 'antd';
import Header from '~/components/header';
const { Content } = Layout;
const { Step } = Steps;
import { json } from '@remix-run/node';
async function loader() {
    return null;
};
function pageLink(step) {
    switch (step) {
    case 0:
        return '/mmon/proposals/new/propose';
    case 1:
        return '/mmon/proposals/new/elaborate';
    case 2:
        return '/mmon/proposals/new/fund';
    case 3:
        return '/mmon/proposals/new/commit';
    default:
        return '/mmon/proposals/list';
    };
};
function buttonText(step, funding) {
    switch (step) {
    case 0:
        return 'Propose';
    case 1:
        return 'Elaborate';
    case 2:
        return 'Fund';
    case 3:
        return 'Commit $' + funding;
    default:
        return 'Back';
    };
};
const routeToStep = { '/mmon/proposals/new/propose' : 0,
                      '/mmon/proposals/new/elaborate' : 1,
                      '/mmon/proposals/new/fund' : 2
                    };
function NewProposal() {
    var __PS_MV_REG;
    const location = useLocation();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('## Description\n\n\n\n## Context\n\n\n\n## Criteria\n\n');
    const [funding, setFunding] = useState(100);
    const [nextDisabled, setNextDisabled] = useState(true);
    const restart = useCallback(() => {
        setStep(0);
        setName('');
        setDescription('## Description\n\n\n\n## Context\n\n\n\n## Criteria\n\n');
        setFunding(100);
        __PS_MV_REG = [];
        return setNextDisabled(true);
    });
    useEffect(() => {
        __PS_MV_REG = [];
        return setStep(routeToStep[location.pathname]);
    }, [location]);
    useEffect(() => {
        __PS_MV_REG = [];
        return setNextDisabled((function () {
            switch (step) {
            case 0:
                return name.length === 0;
            case 1:
                return description.length === 0;
            case 2:
                return funding === 0;
            };
        })());
    }, [step, name, description, funding]);
    __PS_MV_REG = [];
    return <Layout><Header variant="proposals/new" buttonLink={pageLink(step)} buttonMethod="post" buttonText={buttonText(step + 1, funding)} buttonDisabled={nextDisabled}></Header><Content className="p-6"><Space className="w-full" direction="vertical"><PageHeader className="shadow-ant-light" ghost={false} onBack={() => {
    navigate(-1);
    __PS_MV_REG = [];
    return null;
}} title="New Proposal" extra={[<Link to="/mmon/proposals/new/propose" key="3"><Button key="3" type="link" onClick={restart}>Restart</Button></Link>, <Link to={pageLink(step - 1)} key="2"><Button key="2" type="default" disabled={step === 0}>{buttonText(step - 1, funding)}</Button></Link>, <Form method="post" action={pageLink(step)} key="1"><Button key="1" type="primary" htmlType="submit" disabled={nextDisabled}>{buttonText(step + 1, funding)}</Button></Form>]}><Steps current={step}><Step title="Propose" description="problem to solve"></Step><Step title="Elaborate" description="context and criteria"></Step><Step title="Fund" description="your new proposal"></Step></Steps></PageHeader><Outlet context={{ name, setName, description, setDescription, funding, setFunding, nextDisabled }}></Outlet></Space></Content></Layout>;
};
export default NewProposal;
export { loader };