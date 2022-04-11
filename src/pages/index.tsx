import 'antd/dist/antd.variable.min.css';

import styles from './index.less';
import { presetPalettes } from '@ant-design/colors';
import { ConfigProvider, Space, Layout, Menu, Input, Button } from 'antd';
import { ThemeHeader } from '../components/theme_header';
import { Proposal, IProposal } from '../components/proposal';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useScroll } from 'ahooks';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

export default function IndexPage() {
  function getColor() {
    const keys = Object.keys(presetPalettes);
    const palette = presetPalettes[keys[(keys.length * Math.random()) << 0]];

    return palette[4];
  }

  const [proposals, setProposals] = useState<IProposal[]>([]);
  const [color] = useState(getColor());

  const default_px = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );

  const c1 = { color };
  const c1_bg = { backgroundColor: color };

  ConfigProvider.config({
    theme: {
      primaryColor: color,
    },
  });

  useEffect(() => {
    const fetchProposals = async () => {
      const { data } = await axios.get('/api/proposals');
      console.log(data);
      setProposals(data.proposals);
      console.log(proposals);
    };
    fetchProposals().catch(console.error);
  }, []);

  const scroll = useScroll(document);

  return (
    <>
      <Layout>
        <ThemeHeader c1={c1} c1_bg={c1_bg} />
        <Header
          className={styles.ant_header}
          style={{
            position:
              scroll && scroll.top > 5.25 * default_px ? 'fixed' : 'relative',
          }}
        >
          <div style={{ width: '100%' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ width: 'calc(50vw - 3em)' }}
              defaultSelectedKeys={['1']}
            >
              <Menu.Item key="1">All</Menu.Item>
              <Menu.Item key="2">My Proposals</Menu.Item>
            </Menu>
          </div>
          <Search
            placeholder="search proposals"
            size="middle"
            style={{ maxWidth: '100%', padding: '1em' }}
          />
          <Button type="primary" size="middle">
            New Proposal
          </Button>
        </Header>
        <Content>
          <Space
            direction="vertical"
            size={16}
            style={{ padding: scroll && scroll.top > 5.25 * default_px ? '6.5em 2em 2em 2em': '2em 2em 2em 2em' }}
          >
            {proposals.length > 0 ? (
              proposals.map((proposal) => {
                return (
                  <Proposal
                    id={proposal.id}
                    title={proposal.title}
                    description={proposal.description}
                    funding={proposal.funding}
                    funders={proposal.funders}
                  />
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </Space>
        </Content>
      </Layout>
    </>
  );
}
