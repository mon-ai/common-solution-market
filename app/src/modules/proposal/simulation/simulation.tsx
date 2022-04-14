import { Button, Card, Space } from "antd";
import { ISimulation } from "../../../common/types/proposals";

export default function Simulation(props: ISimulation) {
  return (
    <Card type="inner" title={props.title} extra={<a>View source details</a>}>
      <p>{props.description}</p>
      <Space size={8}>
        <Button type="primary">Playtest</Button>
        <Button>Accept</Button>
        <Button>Reject</Button>
      </Space>
    </Card>
  );
}
