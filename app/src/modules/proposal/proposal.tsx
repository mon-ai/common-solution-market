import { Button, Card } from "antd";
import { useState } from "react";
import { IProposal } from "../../common/types/proposals";
import Issues from "./governance/issues";
import Simulations from "./simulation/simulations";

const tabList = [
  { key: "general", tab: "General" },
  { key: "governance", tab: "Governance" },
  { key: "simulation", tab: "Simulation" },
];

function Content(props: any) {
  if (props.tab === "governance") {
    return (
      <Issues mergers={props.issues.mergers} changes={props.issues.changes} />
    );
  } else if (props.tab === "simulation") {
    return <Simulations simulations={props.simulations} />;
  }
  return (
    <div>
      <h2>Description</h2>
      <p>{props.description}</p>
      <Button type="primary" className="shadow-ant-dark">Fund This Proposal</Button>
    </div>
  );
}

export function Proposal(props: IProposal) {
  const [activeTab, setActiveTab] = useState("general");
  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="shadow-ant-light">
      <Card
        title={props.title}
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={(key) => onTabChange(key)}
        extra={
          <p>
            <strong>{props.funding} ETH</strong> from&nbsp;
            <a>
              <strong>{props.funders} funders</strong>
            </a>
          </p>
        }
      >
        <Content
          tab={activeTab}
          description={props.description}
          issues={props.issues}
          simulations={props.simulations}
        />
      </Card>
    </div>
  );
}
