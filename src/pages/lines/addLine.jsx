import { useState, useRef } from "react";
import { Table, Card, Button, Grid } from "@arco-design/web-react";
import { Map, MouseTool } from "react-amap";

const Row = Grid.Row;
const Col = Grid.Col;

function AddLine({ _path, _stations }) {
  const [stations, setStations] = useState(_stations || []);
  const [painter, setPainter] = useState(null);
  const [path, setPath] = useState(_path || []);
  const num = useRef(0);

  const handleMouseTool = {
    created: (tool) => {
      setPainter(tool);
    },
    draw: ({ _, obj }) => {
      if (obj.w.path) {
        setPath(obj.w.path);
        painter.close();
      } else {
        setStations([
          ...stations,
          {
            id: num.current++,
            name: "new",
            longitude: obj.w.position.lng,
            latitude: obj.w.position.lat,
          },
        ]);
      }
    },
  };

  console.log(path);

  const columns = [
    {
      title: "序号",
      dataIndex: "id",
    },
    {
      title: "站点名",
      dataIndex: "name",
    },
    {
      title: "经度",
      dataIndex: "longitude",
    },
    {
      title: "纬度",
      dataIndex: "latitude",
    },
  ];

  function drawLine() {
    painter.polyline();
  }

  function addStations() {
    painter.marker();
  }

  function clear() {
    painter.close(true);
    num.current = 0;
    setPath([]);
    setStations([]);
  }

  return (
    <>
      <Row>
        <Col span={12}>
          <Card style={{ height: "30rem", with: "100%", marginBottom: "2rem" }}>
            <div style={{ height: "28rem", width: "100%" }} id="map">
              <Map key={"decc60b925f95e595a4176ecdcdf3c6e"}>
                <MouseTool events={handleMouseTool} />
              </Map>
            </div>
          </Card>

          <Card>
            <Button onClick={drawLine}>绘制路线</Button>
            <Button onClick={addStations}>添加站点</Button>
            <Button onClick={clear}>全部清除</Button>
          </Card>
        </Col>

        <Col span={12}>
          <Table columns={columns} data={stations} rowKey="id"></Table>
        </Col>
      </Row>
    </>
  );
}

export default AddLine;
