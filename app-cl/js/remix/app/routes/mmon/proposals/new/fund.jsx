import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoaderData, useOutletContext, Form, Link } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import { Button, Card, Divider, InputNumber, Space } from "antd";
import { json, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { query as q } from "faunadb";
import { fauna, redis, snowflake, stripe } from "~/services/clients.server";
async function action(req) {
  var __PS_MV_REG;
  const request = req.request;
  const body = await request.formData();
  const { userId } = await getAuth(request);
  const proposalId = snowflake.getUniqueID();
  __PS_MV_REG = [];
  return Promise.all([
    redis.set("autosave-proposal:funding:" + userId, body.get("amount")),
    fauna.query(
      q.Create(q.Ref(q.Collection("proposals"), proposalId.toString()), {
        data: {
          name: body.get("name"),
          proposer: userId.toString(),
          description: body.get("description"),
          funding: 0,
          patrons: [],
        },
      })
    ),
    stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 100 * body.get("amount"),
            product_data: {
              name: "Initial Funding",
              description: body.get("name"),
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_intent_data: { metadata: { proposalId: proposalId } },
      success_url: "http://localhost:3000/mmon/proposals/list",
      cancel_url: "http://localhost:3000/mmon/proposals/new/fund",
    }),
  ]).then((values) => {
    __PS_MV_REG = [];
    return redirect(values[2].url);
  });
}
function FundForm(props) {
  var __PS_MV_REG;
  const { name, description, funding, setFunding, nextDisabled } =
    useOutletContext();
  __PS_MV_REG = [];
  return (
    <Card className="w-full h-auto min-h-[50vh] shadow-ant-light">
      <Form method="post">
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="description" value={description} />
        <Space direction="vertical">
          <Space>
            <Button
              onClick={() => {
                setFunding(10);
                __PS_MV_REG = [];
                return null;
              }}
            >
              $ 10
            </Button>
            <Button
              onClick={() => {
                setFunding(100);
                __PS_MV_REG = [];
                return null;
              }}
            >
              $ 100
            </Button>
            <Button
              onClick={() => {
                setFunding(1000);
                __PS_MV_REG = [];
                return null;
              }}
            >
              $ 1000
            </Button>
            <Button
              onClick={() => {
                setFunding(10000);
                __PS_MV_REG = [];
                return null;
              }}
            >
              $ 10000
            </Button>
          </Space>
          <InputNumber
            className="w-full"
            name="amount"
            value={funding}
            onChange={(e) => {
              setFunding(e || 0);
              __PS_MV_REG = [];
              return null;
            }}
            prefix="$"
            step={10}
          ></InputNumber>
          <Button type="primary" htmlType="submit" disabled={nextDisabled}>
            {"Confirm and Commit $" + funding}
          </Button>
        </Space>
      </Form>
    </Card>
  );
}
export default FundForm;
export { action };
