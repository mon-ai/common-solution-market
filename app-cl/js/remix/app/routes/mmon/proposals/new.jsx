import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, Form, Link, Outlet } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import { Button, Card, Divider, Layout, PageHeader, Space, Steps } from 'antd';
import { Remark } from 'react-remark';
import CodeMirror from '~/components/codemirror.client';
import Header from '~/components/header';
const { Content } = Layout;
const { Step } = Steps;
import { json } from '@remix-run/node';
async function loader() {
    return null;
};
function ElaborateForm(props) {
    return <Card className="w-full h-auto min-h-[50vh] break-words shadow-ant-light"><Card.Grid className="w-1/2 min-h-[50vh]"><ClientOnly>{() => {
    return <CodeMirror value={props.description} options={{ 'mode' : 'markdown',
  'lineWrapping' : true,
  'viewportMargin' : Infinity
}} onBeforeChange={(editor, data, value) => {
    props.setDescription(value);
    return null;
}}></CodeMirror>;
}}</ClientOnly></Card.Grid><Card.Grid className="w-1/2"><Remark>{props.description}</Remark><Outlet></Outlet></Card.Grid></Card>;
};
function ProposeForm(props) {
    return <Card className="w-full h-auto min-h-[50vh] shadow-ant-light"></Card>;
};
function FundForm(props) {
    return <Card className="w-full h-auto min-h-[50vh] shadow-ant-light"></Card>;
};
function page(step) {
    switch (step) {
    case 0:
        return ProposeForm;
    case 1:
        return ElaborateForm;
    case 2:
        return FundForm;
    default:
        return ProposeForm;
    };
};
function buttonText(step) {
    switch (step) {
    case 0:
        return ['Back', 'Elaborate'];
    case 1:
        return ['Propose', 'Fund'];
    case 2:
        return ['Elaborate', 'Commit'];
    default:
        __PS_MV_REG = [];
        return 'Back'('Next');
    };
};
function NewProposal() {
    var __PS_MV_REG;
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [description, setDescription] = useState('## Description\n\n\n\n## Context\n\n\n\n## Criteria\n\n');
    __PS_MV_REG = [];
    return <Layout><Header variant="proposals/new" buttonLink={page(step)} buttonText={buttonText(step)[1]} buttonOnClick={() => {
    __PS_MV_REG = [];
    return step === 2 ? console.log('go to stripe here') : setStep(Math.min(2, step + 1));
}}></Header><Content className="p-6"><Outlet></Outlet></Content><Content className="p-6"><Space className="w-full" direction="vertical"><PageHeader className="shadow-ant-light" ghost={false} onBack={() => {
    navigate(-1);
    __PS_MV_REG = [];
    return null;
}} title="New Proposal" extra={[<Button key="3" type="link">Restart</Button>, <Button key="2" type="default" disabled={step === 0} onClick={() => {
    __PS_MV_REG = [];
    return setStep(Math.max(0, step - 1));
}}>{buttonText(step)[0]}</Button>, <Button key="1" type="primary" onClick={() => {
    __PS_MV_REG = [];
    return step === 2 ? console.log('go to stripe here') : setStep(Math.min(2, step + 1));
}}>{buttonText(step)[1]}</Button>]}><Steps current={step}><Step title="Propose" description="problem to solve"></Step><Step title="Elaborate" description="context and criteria"></Step><Step title="Fund" description="your new proposal"></Step></Steps></PageHeader>{page(step)({ description, setDescription })}</Space></Content></Layout>;
};
export default NewProposal;
export { loader };