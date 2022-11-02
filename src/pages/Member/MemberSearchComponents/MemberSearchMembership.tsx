import TitleTag from "components/tags/TitleTag";
import React from "react";
import { Row, Col, Button, Form, DatePicker } from "rsuite";

const MemberSearchMembership = () => {
  return (
    <>
      <Row>
        <Col md={24} lg={24} className="col-end">
          <Button appearance="primary">Truy vấn</Button>
        </Col>
      </Row>

      <Row>
        <Col md={24} lg={24}>
          <Form layout="horizontal">
            <TitleTag
              content=""
              children={
                <Row className="row-default">
                  <Col md={11} lg={11} className="vertical">
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Mã thẻ hội viên
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="HV001"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Hạng sử dụng
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="G"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Mã kỳ xét hạng
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="THE00"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Ngày hết hạn kỳ xét hạng
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value={new Date(2022, 3, 20)}
                        className="form-input"
                        accepter={DatePicker}
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Doanh thu xét hạng trong kỳ
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="15,000,000"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Doanh thu còn thiếu tăng hạng
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="600,000"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                  </Col>
                  <Col md={11} lg={11} className="vertical">
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Điểm tiêu dùng còn lại (lũy kế)
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="400,000"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Điểm tiêu dùng hết hạn (lũy kế)
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="100,000"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Điểm tiêu dùng T.kỳ hiện tại
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="500,000"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Điểm xét hạng T.kỳ hiện tại
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="300,000"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Lượt DV trong kỳ hiện tại
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="1"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Lượt dịch vụ còn thiếu tăng hạng
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="1"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                  </Col>
                </Row>
              }
            ></TitleTag>

            <TitleTag
              content="Thông tin khách hàng"
              children={
                <Row className="row-default">
                  <Col md={11} lg={11} className="vertical">
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Họ và tên
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="Nguyễn Phương Linh"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Điện thoại
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="0987654321"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Giới tính
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="Nữ"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Ngày sinh
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value={new Date(1990, 3, 20)}
                        className="form-input"
                        accepter={DatePicker}
                        plaintext
                      />
                    </Form.Group>
                  </Col>
                  <Col md={11} lg={11} className="vertical">
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Tỉnh/TP
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="Hà Nội"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Quận/Huyện
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="Đống Đa"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Địa chỉ
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="20 Huỳnh Thúc Kháng"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        CMND/CCCD
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="160300666"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                  </Col>
                </Row>
              }
            ></TitleTag>

            <TitleTag
              content="Thông tin khách hàng"
              children={
                <Row className="row-default">
                  <Col md={11} lg={11} className="vertical">
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Biển số xe
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="30F-68868"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Số khung
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="MALA741CAHM246689"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                  </Col>
                  <Col md={11} lg={11} className="vertical">
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Hiệu xe
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="Hyundai"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                    <Form.Group controlId="name-6" className="form-plaintext">
                      <Form.ControlLabel className="text-label">
                        Mã model
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        value="SAN"
                        className="form-input"
                        plaintext
                      />
                    </Form.Group>
                  </Col>
                </Row>
              }
            ></TitleTag>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default MemberSearchMembership;
