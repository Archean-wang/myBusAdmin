import {
  Button,
  Select,
  Card,
  Grid,
  Table,
  Modal,
} from "@arco-design/web-react";
const Row = Grid.Row;
const Col = Grid.Col;
import { useState } from "react";
import AddLine from "./addLine";

const Option = Select.Option;

function Path() {
  const [line, setLine] = useState(undefined);
  const [addDialog, setAddDialog] = useState(false);

  const foods = [];

  const columns = [
    {
      title: "路线",
      dataIndex: "name",
    },
    {
      title: "起始站",
      dataIndex: "start",
    },
    {
      title: "终点站",
      dataIndex: "end",
    },
    {
      title: "途径站点",
      dataIndex: "stations",
    },
  ];

  function handleline(value) {
    setLine(value);
  }

  function handleAddLine() {
    setAddDialog(true);
  }

  return (
    <>
      <Card>
        <Row style={{ marginBottom: "1rem" }}>
          <Col span={4}>
            <Select
              placeholder="请选择路线"
              allowClear
              showSearch
              value={line}
              onChange={handleline}
            >
              {foods.map((food) => (
                <Option key={food.label} value={food.value}>
                  {food.label}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row>
          <Col span={1}>
            <Button type="primary" onClick={handleAddLine}>
              添加路线
            </Button>
          </Col>
        </Row>
      </Card>
      <Table columns={columns}></Table>

      <Modal
        style={{ width: "50vw" }}
        title="添加路线"
        visible={addDialog}
        onOk={() => setAddDialog(false)}
        onCancel={() => setAddDialog(false)}
        autoFocus={false}
        unmountOnExit={true}
      >
        <AddLine />
      </Modal>
    </>
  );
}

export default Path;
