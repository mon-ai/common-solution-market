import { presetPalettes } from "@ant-design/colors";
import {
  Chain,
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useScroll } from "ahooks";
import {
  Alert,
  Button,
  ConfigProvider,
  Input,
  Layout,
  Menu,
  Space,
} from "antd";
import "antd/dist/antd.variable.min.css";
import { providers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { chain, WagmiProvider } from "wagmi";
import Banner from "../common/components/Banner";
import CustomButton from "../common/components/connectButton";
import Proposals from "../modules/proposal/proposals";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const infuraId = process.env.INFURA_ID;

const provider = ({ chainId }: { chainId?: number }) =>
  new providers.InfuraProvider(chainId, infuraId);

const chains: Chain[] = [
  { ...chain.mainnet, name: "Ethereum" },
  { ...chain.polygonMainnet, name: "Polygon" },
  { ...chain.optimism, name: "Optimism" },
  { ...chain.arbitrumOne, name: "Arbitrum" },
];

const wallets = getDefaultWallets({
  chains,
  infuraId,
  appName: "My RainbowKit App",
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

const Home: NextPage = () => {
  const [color] = useState(getColor());
  const [defaultPx, setDefaultPx] = useState(16);

  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: color,
      },
    });
    setDefaultPx(
      parseFloat(window.getComputedStyle(document.documentElement).fontSize)
    );
  }, []);

  return (
    <div>
      <Head>
        <title>Common Solution Market</title>
        <meta name="description" content="CommonAI common solution market" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RainbowKitProvider chains={chains}>
        <WagmiProvider autoConnect connectors={connectors} provider={provider}>
          <Layout>
            <Banner />
            <Header className="z-10 sticky top-0 w-screen flex items-center shadow-black">
              <div className="w-full">
                <Menu
                  className="w-full"
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                >
                  <Menu.Item key="1">All</Menu.Item>
                  <Menu.Item key="2">My Proposals</Menu.Item>
                </Menu>
              </div>
              <Search
                className="w-full p-1"
                placeholder="search proposals"
                size="middle"
              />
              <Button type="primary" size="middle">
                New Proposal
              </Button>
            </Header>
            <Content>
              <Space direction="vertical" className="p-8" size="middle">
                <CustomButton />
                <Proposals />
                <Alert
                  className="mt-4"
                  message="No more proposals"
                  type="error"
                />
              </Space>
            </Content>
          </Layout>
        </WagmiProvider>
      </RainbowKitProvider>
    </div>
  );
};

export default Home;
