import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData, Outlet } from '@remix-run/react';
import { ConfigProvider } from 'antd';
import { json } from '@remix-run/node';
import { presetPalettes } from '@ant-design/colors';
function Banner() {
    return <div className="flex flex-row flex-no-wrap w-screen h-20"><div className="bg-white w-1/2 flex flex-row flex-wrap justify-between px-4"><a href="https://mmonai.co/" target="_blank" rel="noreferrer"><h1 className="font-title text-3xl"><span className="text-ant">.co</span><br/>&nbsp;&nbsp;&nbsp;mmonAI</h1></a><h1 className="font-title text-3xl">.common</h1></div><div className="bg-ant w-1/2 px-4"><h1 className="font-title text-3xl">solution market<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em className="text-white">proposals</em></h1></div></div>;
};
async function loader() {
    function getColor() {
        const keys = Object.keys(presetPalettes);
        const palette = presetPalettes[keys[keys.length * Math.random() << 0]];
        return palette[4];
    };
    __PS_MV_REG = [];
    return json({ color : getColor() });
};
function Index() {
    var __PS_MV_REG;
    const { color } = useLoaderData();
    const navigate = useNavigate();
    useEffect(function () {
        ConfigProvider.config({ 'theme' : { 'primaryColor' : color } });
        navigate('./proposals');
        __PS_MV_REG = [];
        return undefined;
    }, []);
    __PS_MV_REG = [];
    return <div><Banner></Banner><Outlet></Outlet></div>;
};
export default Index;
export { loader };