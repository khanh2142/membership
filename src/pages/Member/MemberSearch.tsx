import ButtonSearch from "components/button/ButtonSearch";
import TitleTag from "components/tags/TitleTag";
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  DatePicker,
  Divider,
  Form,
  Grid,
  Nav,
  Navbar,
  Row,
} from "rsuite";
import MemberSearchMembership from "./MemberSearchComponents/MemberSearchMembership";
import MemberSearchPoint from "./MemberSearchComponents/MemberSearchPoint";

const CustomNavbar = ({
  onSelect,
  activeKey,
  className,
  appearance,
}: {
  onSelect: any;
  activeKey: any;
  className?: any;
  appearance?: any;
}) => {
  return (
    <Navbar className={className} appearance={appearance}>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="1" as={"div"}>
          Hội viên
        </Nav.Item>
        <Nav.Item eventKey="2" as={"div"}>
          Điểm
        </Nav.Item>
        <Nav.Item eventKey="3" as={"div"}>
          Xét hạng
        </Nav.Item>
        <Nav.Item eventKey="4" as={"div"}>
          Ưu đãi
        </Nav.Item>
        <Nav.Item eventKey="5" as={"div"}>
          Lượt dịch vụ
        </Nav.Item>
        <Nav.Item eventKey="6" as={"div"}>
          Đại lý truy vấn
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const MemberSearch = () => {
  const [activeKey, setActiveKey] = React.useState(1);
  const [childComponent, setChildComponent] = useState(<></>);

  const components = [
    { activeKey: 1, component: <MemberSearchMembership /> },
    { activeKey: 2, component: <MemberSearchPoint /> },
  ];

  useEffect(() => {
    components.map((item: any) => {
      if (item.activeKey === Number(activeKey)) {
        setChildComponent(item.component);
      }
    });
  }, [activeKey]);

  return (
    <>
      <Container>
        <Grid fluid>
          <Row className="row-main">
            <Col md={24} lg={24}>
              <p className="text-title">Tra cứu thông tin thẻ hội viên</p>
            </Col>
          </Row>

          <Row>
            <Col md={24} lg={24}>
              <Form>
                <Row className="row-search">
                  <Col md={5} lg={5}>
                    <Form.Group controlId="name-6">
                      <Form.ControlLabel className="text-label">
                        Hạn sử dụng <strong className="required">*</strong>
                      </Form.ControlLabel>
                      <Form.Group>
                        <div className="form-control-datetime">
                          <Form.Control
                            name="name"
                            className="form-input"
                            accepter={DatePicker}
                            placeholder="Chọn"
                            oneTap={true}
                          />
                          <span style={{ margin: "0 7px" }}>-</span>
                          <Form.Control
                            name="name"
                            className="form-input"
                            accepter={DatePicker}
                            placeholder="Chọn"
                            oneTap={true}
                          />
                        </div>
                      </Form.Group>
                    </Form.Group>
                  </Col>
                  <Col md={4} lg={4}>
                    <Form.Group controlId="name-6">
                      <Form.ControlLabel className="text-label">
                        Số khung
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        className="form-input"
                        placeholder="Nhập"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} lg={4}>
                    <Form.Group controlId="name-6">
                      <Form.ControlLabel className="text-label">
                        Mã thẻ hội viên
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        className="form-input"
                        placeholder="Nhập"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} lg={4}>
                    <Form.Group controlId="name-6">
                      <Form.ControlLabel className="text-label">
                        Số điện thoại
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        className="form-input"
                        placeholder="Nhập"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} lg={3}>
                    <ButtonSearch size="large"></ButtonSearch>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <Divider />

          <CustomNavbar
            appearance="subtle"
            activeKey={activeKey}
            onSelect={setActiveKey}
            className="member__navbar"
          />

          {childComponent}
        </Grid>
      </Container>
    </>
  );
};

export default MemberSearch;
