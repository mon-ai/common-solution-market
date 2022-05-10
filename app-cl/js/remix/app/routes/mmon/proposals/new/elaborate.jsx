import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoaderData, useOutletContext, Form, Link } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import { Button, Card, Divider, Layout, PageHeader, Space, Steps } from "antd";
import { Remark } from "react-remark";
import CodeMirror from "~/components/codemirror.client";
import { json, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { stripe, redis } from "~/services/clients.server";
async function action(req) {
  var __PS_MV_REG;
  const request = req.request;
  const body = await request.formData();
  const { userId } = await getAuth(request);
  const reply = await redis.set(
    "autosave-proposal:description:" + userId,
    body.get("description")
  );
  __PS_MV_REG = [];
  return reply === "OK" ? redirect("/mmon/proposals/new/fund") : null;
}
function ElaborateForm(props) {
  var __PS_MV_REG;
  const { description, setDescription, nextDisabled } = useOutletContext();
  __PS_MV_REG = [];
  return (
    <Card className="w-full h-auto min-h-[50vh] break-words shadow-ant-light">
      <Card.Grid className="w-1/2 min-h-[50vh]">
        <ClientOnly>
          {() => {
            return (
              <CodeMirror
                value={description}
                options={{
                  mode: "markdown",
                  lineWrapping: true,
                  viewportMargin: Infinity,
                }}
                onBeforeChange={(editor, data, value) => {
                  setDescription(value);
                  __PS_MV_REG = [];
                  return null;
                }}
              ></CodeMirror>
            );
          }}
        </ClientOnly>
      </Card.Grid>
      <Card.Grid className="w-1/2">
        <Remark>{description}</Remark>
      </Card.Grid>
      <Form method="post">
        <input type="hidden" name="description" value={description} />
        <Button
          className="m-3"
          type="primary"
          htmlType="submit"
          disabled={nextDisabled}
        >
          Confirm and Fund
        </Button>
      </Form>
    </Card>
  );
}
export default ElaborateForm;
export { action };
