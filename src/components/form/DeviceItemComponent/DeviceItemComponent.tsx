import { Button, Col, Flex, Form, Input, InputNumber, Radio, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

const DeviceItemComponent = () => {
  return (
    <Form.List name="device">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name }) => (
            <Row gutter={16} key={key}>
              <Col span={12}>
                <Form.Item
                  name={[name, "deviceName"]}
                  label="Tên thiết bị"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên thiết bị!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item
                  name={[name, "quantity"]}
                  label="Số lượng"
                  rules={[
                    { required: true, message: "Vui lòng nhập số lượng!" },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item name={[name, "status"]} label="Tình trạng">
                  <Radio.Group defaultValue={true}>
                    <Flex gap={8}>
                      <Radio value={true} title="Bình thường">
                        Bình thường
                      </Radio>
                      <Radio value={false} title="Không hoạt động">
                        Không hoạt động
                      </Radio>
                    </Flex>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Flex justify="center" align="center">
                <Col span={2}>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Col>
              </Flex>
            </Row>
          ))}
          <Row justify="start">
            <Button
              type="dashed"
              onClick={() => add({ deviceName: "", quantity: 1, status: true })}
              icon={<PlusOutlined />}
            >
              Thêm thiết bị
            </Button>
          </Row>
        </>
      )}
    </Form.List>
  );
};

export default DeviceItemComponent;
