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
                id={merger.id}
                title={merger.title}
                description={merger.description}
              />
            ))
          ) : (
            <Alert message="No change suggestions" type="error" />
          )}
        </Space>
        <Button type="primary">Suggest New Merger</Button>
      </Space>
      <Divider />
      <h2>Criterion Changes</h2>
      <Space size={16} direction="vertical">
        <Space size={8} align="start" wrap={true}>
          {props.changes.length > 0 ? (
            props.changes.map((change: IChange) => (
              <Change
                id={change.id}
                title={change.title}
                description={change.description}
              />
            ))
          ) : (
            <Alert message="No change suggestions" type="error" />
          )}
        </Space>
        <Button type="primary">Suggest New Change</Button>
      </Space>
    </div>
  );
}
