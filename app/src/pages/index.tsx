import {presetPalettes} from "@ant-design/colors";
import {Alert, Button, ConfigProvider, Input, Layout, Menu, Modal, Space} from "antd";
import "antd/dist/antd.variable.min.css";
import type {NextPage} from "next";
import Head from "next/head";
import {useEffect, useState} from "react";
import Banner from "../common/components/banner";
import Proposals from "../modules/proposal/proposals";
import NewProposal from "../modules/newProposal/newProposal";
import Link from "next/link";
import LoginButton from "../common/components/loginButton";
import axios from "axios";
import { useRouter } from "next/router";
import Session from "supertokens-auth-react/recipe/session";
Session.addAxiosInterceptors(axios);

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function getColor() {
  const keys = Object.keys(presetPalettes);
  const palette = presetPalettes[keys[(keys.length * Math.random()) << 0]];

  return palette[4];
}

const Home: NextPage = () => {
  const [color] = useState(getColor());
  const router = useRouter();

  const [doingNewProposal, setDoingNewProposal] = useState(false);

  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: color,
      },
    });
  }, [color]);

  return (
    <div>
      <Head>
        <title>Common Solution Market</title>
        <meta name="description" content="CommonAI common solution market"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Layout>
        <Banner/>
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
            <Button type="primary" size="middle" onClick={() => {setDoingNewProposal(true)}}>
              New Proposal
            </Button>
        </Header>
        <Content>
          <Space direction="vertical" className="p-8" size="middle">
            <NewProposal visible={doingNewProposal} close={() => setDoingNewProposal(false)}/>
            <LoginButton />
            <Proposals/>
          </Space>
        </Content>
      </Layout>
    </div>
  );
};

export default Home;
