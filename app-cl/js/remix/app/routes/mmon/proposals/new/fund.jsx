import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, useOutletContext, Form, Link } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import { Button, Card, Divider, InputNumber, Space } from 'antd';
import { redirect } from '@remix-run/node';
import stripe from '~/services/stripe.server';
async function action(req) {
    var __PS_MV_REG;
    const body = await (req.request.formData());
    const session = await (stripe.checkout.sessions.create({ 'line_items' : [{ 'price_data' : { 'currency' : 'usd',
                                                                                                'unit_amount' : 100 * body.get('amount'),
                                                                                                'product_data' : { 'name' : 'Initial Funding' }
                                                                                              }, 'quantity' : 1 }],
                                                             'mode' : 'payment',
                                                             'success_url' : 'http://localhost:3000/mmon/proposals/list',
                                                             'cancel_url' : 'http://localhost:3000/mmon/proposals/new/fund'
                                                           }));
    __PS_MV_REG = [];
    return redirect(session.url);
};
function FundForm() {
    var __PS_MV_REG;
    const { funding, setFunding, nextDisabled } = useOutletContext();
    __PS_MV_REG = [];
    return <Card className="w-full h-auto min-h-[50vh] shadow-ant-light"><Form method="post"><Space direction="vertical"><Space><Button onClick={() => {
    setFunding(10);
    __PS_MV_REG = [];
    return null;
}}>$ 10</Button><Button onClick={() => {
    setFunding(100);
    __PS_MV_REG = [];
    return null;
}}>$ 100</Button><Button onClick={() => {
    setFunding(1000);
    __PS_MV_REG = [];
    return null;
}}>$ 1000</Button><Button onClick={() => {
    setFunding(10000);
    __PS_MV_REG = [];
    return null;
}}>$ 10000</Button></Space><InputNumber className="w-full" name="amount" value={funding} onChange={(e) => {
    setFunding(e || 0);
    __PS_MV_REG = [];
    return null;
}} prefix="$" step={10}></InputNumber><Button type="primary" htmlType="submit" disabled={nextDisabled}>{'Confirm and Commit $' + funding}</Button></Space></Form></Card>;
};
export default FundForm;
export { action };