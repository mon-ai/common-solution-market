import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, useOutletContext, Form, Link } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import { Button, Card, Divider, Layout, PageHeader, Space, Steps } from 'antd';
import { Remark } from 'react-remark';
import CodeMirror from '~/components/codemirror.client';
function ElaborateForm() {
    var __PS_MV_REG;
    const { description, setDescription, nextDisabled } = useOutletContext();
    __PS_MV_REG = [];
    return <Card className="w-full h-auto min-h-[50vh] break-words shadow-ant-light"><Card.Grid className="w-1/2 min-h-[50vh]"><ClientOnly>{() => {
    return <CodeMirror value={description} options={{ 'mode' : 'markdown',
  'lineWrapping' : true,
  'viewportMargin' : Infinity
}} onBeforeChange={(editor, data, value) => {
    setDescription(value);
    __PS_MV_REG = [];
    return null;
}}></CodeMirror>;
}}</ClientOnly></Card.Grid><Card.Grid className="w-1/2"><Remark>{description}</Remark></Card.Grid><Link to="/mmon/proposals/new/fund"><Button className="m-3" type="primary" disabled={nextDisabled}>Confirm and Fund</Button></Link></Card>;
};
export default ElaborateForm;