import { useRequest } from "ahooks";
import { Alert, Result, Space, Spin } from "antd";
import axios from "axios";
import { IProposal } from "../../common/types/proposals";
import { Proposal } from "./proposal";

const fetchProposals = async () => {
  const res = axios.get("http://127.0.0.1:8000/api/mock/proposals", { timeout: 5000 });
  return (await res).data.proposals;
};

export default function Proposals() {
  const { data, error, loading } = useRequest<IProposal[], any>(fetchProposals);

  if (error) {
    return (
      <Result status="500" title="500" subTitle="Proposals failed to load" />
    );
  }
  if (loading) {
    return <Spin size="large" />;
  }
  return (
    <Space size={32} direction="vertical">
      {data && data.length > 0 ? (
        data.map((data, i) => {
          return (
            <Proposal
              key={"proposal_" + i}
              id={data.id}
              title={data.title}
              description={data.description}
              funding={data.funding}
              funders={data.funders}
              issues={data.issues}
              simulations={data.simulations}
            />
          );
        })
      ) : (
        <Alert message="No proposals found" type="error" />
      )}
      {data && (
        <Alert className="mt-4" message="No more proposals" type="error" />
      )}
    </Space>
  );
}
