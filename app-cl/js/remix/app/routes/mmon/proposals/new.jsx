import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoaderData, useSubmit, Form, Link, Outlet } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import { Button, Card, Divider, Layout, PageHeader, Space, Steps } from "antd";
import Header from "~/components/header";
const { Content } = Layout;
const { Step } = Steps;
import { json, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { redis } from "~/services/clients.server";
function pageLink(step) {
  switch (step) {
    case 0:
      return "/mmon/proposals/new/propose";
    case 1:
      return "/mmon/proposals/new/elaborate";
    case 2:
      return "/mmon/proposals/new/fund";
    case 3:
      return "/mmon/proposals/new/commit";
    default:
      return "/mmon/proposals/list";
  }
}
function buttonText(step, funding) {
  switch (step) {
    case 0:
      return "Propose";
    case 1:
      return "Elaborate";
    case 2:
      return "Fund";
    case 3:
      return "Commit $" + funding;
    default:
      return "Back";
  }
}
const routeToStep = {
  "/mmon/proposals/new/propose": 0,
  "/mmon/proposals/new/elaborate": 1,
  "/mmon/proposals/new/fund": 2,
};
async function loader(req) {
  var __PS_MV_REG;
  const request = req.request;
  const { userId } = await getAuth(request);
  __PS_MV_REG = [];
  return Promise.all([
    redis.get("autosave-proposal:name:" + userId),
    redis.get("autosave-proposal:description:" + userId),
    redis.get("autosave-proposal:funding:" + userId),
  ]).then((values) => {
    __PS_MV_REG = [];
    return json({
      cachedName: values[0],
      cachedDescription: values[1],
      cachedFunding: values[2],
    });
  });
}
async function action(req) {
  var __PS_MV_REG;
  const request = req.request;
  const body = await request.formData();
  const { userId } = await getAuth(request);
  redis.del(
    "autosave-proposal:name:" + userId,
    "autosave-proposal:description:" + userId,
    "autosave-proposal:funding:" + userId
  );
  __PS_MV_REG = [];
  return redirect("/mmon/proposals/new/propose");
}
function NewProposal() {
  var __PS_MV_REG;
  const data = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState(
    "## Description\n\n\n\n## Context\n\n\n\n## Criteria\n\n"
  );
  const [funding, setFunding] = useState(100);
  const [nextDisabled, setNextDisabled] = useState(true);
  function restart() {
    setName("");
    setDescription("## Description\n\n\n\n## Context\n\n\n\n## Criteria\n\n");
    setFunding(100);
    __PS_MV_REG = [];
    return setNextDisabled(true);
  }
  function dataOf(step) {
    switch (step) {
      case 0:
        return [["name", name]];
      case 1:
        return [["description", description]];
      case 2:
        return [
          ["amount", funding],
          ["description", name],
        ];
    }
  }
  useEffect(() => {
    if (data.cachedFunding) {
      setFunding(data.cachedFunding);
    }
    if (data.cachedDescription) {
      setDescription(data.cachedDescription);
    }
    if (data.cachedName) {
      setName(data.cachedName);
    }
    __PS_MV_REG = [];
    return undefined;
  }, []);
  useEffect(() => {
    __PS_MV_REG = [];
    return setStep(routeToStep[location.pathname]);
  }, [location]);
  useEffect(() => {
    __PS_MV_REG = [];
    return setNextDisabled(
      (function () {
        switch (step) {
          case 0:
            return name.length === 0;
          case 1:
            return description.length === 0;
          case 2:
            return funding === 0;
        }
      })()
    );
  }, [step, name, description, funding]);
  __PS_MV_REG = [];
  return (
    <Layout>
      <Header
        variant="proposals/new"
        buttonText={buttonText(step + 1, funding)}
        buttonDisabled={nextDisabled}
        formValues={dataOf(step)}
        buttonMethod="post"
        buttonLink={pageLink(step)}
      ></Header>
      <Content className="p-6">
        <Space className="w-full" direction="vertical">
          <PageHeader
            className="shadow-ant-light"
            ghost={false}
            onBack={() => {
              navigate(-1);
              __PS_MV_REG = [];
              return null;
            }}
            title="New Proposal"
            extra={[
              <Form method="post" action="/mmon/proposals/new" key="3">
                <Button key="3" type="link" htmlType="submit" onClick={restart}>
                  Restart
                </Button>
              </Form>,
              <Link to={pageLink(step - 1)} key="2">
                <Button key="2" type="default" disabled={step === 0}>
                  {buttonText(step - 1, funding)}
                </Button>
              </Link>,
              <Form method="post" action={pageLink(step)} key="1">
                {dataOf(step).map((value) => {
                  return (
                    <textarea
                      hidden="hidden"
                      name={value[0]}
                      value={value[1]}
                    ></textarea>
                  );
                })}
                <Button
                  key="1"
                  type="primary"
                  htmlType="submit"
                  disabled={nextDisabled}
                >
                  {buttonText(step + 1, funding)}
                </Button>
              </Form>,
            ]}
          >
            <Steps current={step}>
              <Step title="Propose" description="problem to solve"></Step>
              <Step title="Elaborate" description="context and criteria"></Step>
              <Step title="Fund" description="your new proposal"></Step>
            </Steps>
          </PageHeader>
          <Outlet
            context={{
              name,
              setName,
              description,
              setDescription,
              funding,
              setFunding,
              nextDisabled,
            }}
          ></Outlet>
        </Space>
      </Content>
    </Layout>
  );
}
export default NewProposal;
export { loader, action };
