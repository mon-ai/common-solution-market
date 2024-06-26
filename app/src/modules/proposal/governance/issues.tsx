import { Alert, Button, Divider, Space } from "antd";
import { IChange, IIssues, IMerger } from "../../../common/types/proposals";
import Change from "./change";
import Merger from "./merger";

export default function Issues(props: IIssues) {
  return (
    <div>
      <h2>Mergers</h2>
      <Space size={16} direction="vertical">
        <Space size={8} align="start" wrap={true}>
          {props.mergers.length > 0 ? (
            props.mergers.map((merger: IMerger) => (
              <Merger
                key={`merger_${merger.id}`}
                id={merger.id}
                title={merger.title}
                description={merger.description}
              />
            ))
          ) : (
            <Alert message="No change suggestions" type="error" />
          )}
        </Space>
        <Button type="primary" className="shadow-ant-dark">Suggest New Merger</Button>
      </Space>
      <Divider />
      <h2>Criterion Changes</h2>
      <Space size={16} direction="vertical">
        <Space size={8} align="start" wrap={true}>
          {props.changes.length > 0 ? (
            props.changes.map((change: IChange) => (
              <Change
                key={`change_${change.id}`}
                id={change.id}
                title={change.title}
                description={change.description}
              />
            ))
          ) : (
            <Alert message="No change suggestions" type="error" />
          )}
        </Space>
        <Button type="primary" className="shadow-ant-dark">Suggest New Change</Button>
      </Space>
    </div>
  );
}
