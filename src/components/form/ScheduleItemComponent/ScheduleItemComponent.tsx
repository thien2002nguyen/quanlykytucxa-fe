import { dayOfWeekOptions } from "@/utils/contants";
import { Button, Col, DatePicker, Flex, Form, Row, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

const ScheduleItemComponent = () => {
  return (
    <Form.List name="schedule">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name }) => (
            <Row gutter={16} key={key}>
              <Col span={11}>
                <Form.Item
                  name={[name, "dayOfWeek"]}
                  label="Ngày trong tuần"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngày trong tuần!",
                    },
                  ]}
                >
                  <Select placeholder="Chọn ngày" options={dayOfWeekOptions} />
                </Form.Item>
              </Col>

              <Col span={11}>
                <Form.Item
                  name={[name, "time"]}
                  label="Giờ"
                  rules={[{ required: true, message: "Vui lòng chọn giờ!" }]}
                >
                  <DatePicker
                    format="HH:mm"
                    showTime={{ format: "HH:mm" }}
                    picker="time"
                    style={{ width: "100%" }}
                  />
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
              onClick={() => add({ dayOfWeek: "", time: "" })}
              icon={<PlusOutlined />}
            >
              Thêm lịch trình
            </Button>
          </Row>
        </>
      )}
    </Form.List>
  );
};

export default ScheduleItemComponent;
