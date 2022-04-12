import 'antd/dist/antd.variable.min.css';
import '@rainbow-me/rainbowkit/dist/index.css';

import styles from './index.less';
import { presetPalettes } from '@ant-design/colors';
import { ConfigProvider, Space, Layout, Menu, Input, Button, Spin } from 'antd';

import { ThemeHeader } from '../components/theme-header';
import { CustomButton } from '../components/connect-button';
import { Proposals } from '../components/proposals';

import {
  RainbowKitProvider,
  Chain,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, chain } from 'wagmi';
import { providers } from 'ethers';

import { useEffect, useState } from 'react';
import { useScroll, useRequest } from 'ahooks';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const infuraId = process.env.INFURA_ID;

const provider = ({ chainId }: { chainId?: number }) =>
  new providers.InfuraProvider(chainId, infuraId);

const chains: Chain[] = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygonMainnet, name: 'Polygon' },
  { ...chain.optimism, name: 'Optimism' },
  { ...chain.arbitrumOne, name: 'Arbitrum' },
];

const wallets = getDefaultWallets({
  chains,
  infuraId,
  appName: 'My RainbowKit App',
  jsonRpcUrl: ({ chainId }) =>
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0],
});

const connectors = connectorsForWallets(wallets);

function getColor() {
  const keys = Object.keys(presetPalettes);
  const palette = presetPalettes[keys[(keys.length * Math.random()) << 0]];

  return palette[4];
}

export default function IndexPage() {
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

  const scroll = useScroll(document);

  return (
    <RainbowKitProvider chains={chains}>
      <WagmiProvider autoConnect connectors={connectors} provider={provider}>
        <Layout>
          <ThemeHeader />
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
              style={{
                padding:
                  scroll && scroll.top > 5.25 * default_px
                    ? '6.5em 2em 2em 2em'
                    : '2em 2em 2em 2em',
              }}
            >
              <CustomButton />
              <Proposals />
            </Space>
          </Content>
        </Layout>
      </WagmiProvider>
    </RainbowKitProvider>
  );
}
