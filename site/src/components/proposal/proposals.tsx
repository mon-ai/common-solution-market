import styles from './proposals.less';

import { Spin, Space, Result } from 'antd';
import { Proposal, IProposal } from './proposal';

import axios from 'axios';

import { useRequest } from 'ahooks';

const fetchProposals = async () => {
  const res = axios.get('/api/proposals', { timeout: 5000 });
  const proposals = (await res).data.proposals;
  return await proposals;
};

export function Proposals() {
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
              key={'proposal_' + i}
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
        <Spin size="large" />
      )}
    </Space>
  );
}
