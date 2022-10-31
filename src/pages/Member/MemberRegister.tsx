import ButtonSearch from "components/button/ButtonSearch";
import TitleTag from "components/tags/TitleTag";
import React from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  DatePicker,
  Divider,
  Form,
  Grid,
  Input,
  InputPicker,
  Row,
  Stack,
} from "rsuite";

const Textarea = () => {
  return <Input as="textarea" rows={3} placeholder="Textarea" />;
};

const MemberRegister = () => {
  return (
    <>
      <Container>
        <Grid fluid>
          <Row className="row-main">
            <Col md={12} lg={12}>
              <p className="text-title">Đăng ký hội viên</p>
            </Col>

            <Col md={12} lg={12} className="col-end">
              <ButtonGroup>
                <Button appearance="primary">Lưu</Button>
                <Button appearance="primary">Lưu và duyệt</Button>
                <Button>Hủy bỏ</Button>
              </ButtonGroup>
            </Col>
          </Row>

          <Divider />

          <Row>
            <Col md={24} lg={24}>
              <Form layout="horizontal">
                <div className="member__register">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect width="32" height="32" fill="url(#pattern0)" />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_218_372"
                          transform="scale(0.00195312)"
                        />
                      </pattern>
                      <image
                        id="image0_218_372"
                        width="512"
                        height="512"
                        xlinkHref="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>

                  <span className="member__register-content">
                    <p className="text-input">Đại lý đăng ký hội viên:</p>

                    <p className="member__register-code">
                      VN054 - Hyundai Hà Đông
                    </p>
                  </span>
                </div>

                <TitleTag
                  content="Thông tin đăng ký"
                  children={
                    <Row className="row-default">
                      <Col md={11} lg={11} className="vertical">
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Hạng sử dụng <strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control
                            name="name"
                            value="G"
                            className="form-input"
                            // classPrefix="input"
                          />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Hạng thực
                          </Form.ControlLabel>
                          <Form.Control
                            name="name"
                            value="S"
                            disabled
                            className="text-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={11} lg={11} className="vertical">
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Ngày đăng ký
                          </Form.ControlLabel>
                          <Form.Control
                            name="name"
                            value="2022-04-20"
                            disabled
                            className="text-input"
                          />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Đơn vị yêu cầu
                          </Form.ControlLabel>
                          <Form.Control
                            name="name"
                            value="HTV"
                            className="text-input"
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
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Họ và tên <strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control name="name" placeholder="Nhập" />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Số điện thoại
                            <strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control name="name" placeholder="Nhập để tìm" />
                          <ButtonSearch size="normal" />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Giới tính
                            <strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control
                            name="name"
                            placeholder="Chọn"
                            accepter={InputPicker}
                          />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Ngày sinh
                            <strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control
                            name="name"
                            placeholder="Chọn"
                            accepter={DatePicker}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={11} lg={11} className="vertical">
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Tỉnh/TP
                            <strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control
                            name="name"
                            accepter={InputPicker}
                            placeholder="Chọn"
                          />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Quận/Huyện
                            <strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control
                            name="name"
                            accepter={InputPicker}
                            placeholder="Chọn"
                          />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Địa chỉ
                            <strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control name="name" placeholder="Nhập" />
                        </Form.Group>

                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            CMND/CCCD
                            <strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control name="name" placeholder="Nhập" />
                        </Form.Group>
                      </Col>
                    </Row>
                  }
                ></TitleTag>

                <TitleTag
                  content="Thông tin xe"
                  children={
                    <Row className="row-default">
                      <Col md={11} lg={11} className="vertical">
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Biển số xe<strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control name="name" placeholder="Nhập để tìm" />
                          <ButtonSearch size="normal" />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Số khung<strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control name="name" disabled />
                        </Form.Group>
                      </Col>
                      <Col md={11} lg={11} className="vertical">
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Hiệu xe<strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control name="name" disabled />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Mã model <strong className="required">*</strong>
                          </Form.ControlLabel>
                          <Form.Control name="name" disabled />
                        </Form.Group>
                      </Col>
                    </Row>
                  }
                ></TitleTag>

                <TitleTag
                  content="Thông tin tặng điểm tiêu dùng"
                  children={
                    <Row className="row-default">
                      <Col md={11} lg={11} className="vertical">
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Mã thẻ hội viên giới thiệu
                          </Form.ControlLabel>
                          <Form.Control name="name" placeholder="Nhập để tìm" />
                          <ButtonSearch size="normal" />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Biển số xe
                          </Form.ControlLabel>
                          <Form.Control name="name" disabled />
                        </Form.Group>
                      </Col>
                      <Col md={11} lg={11} className="vertical">
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Tặng điểm xe mới
                          </Form.ControlLabel>
                          <Form.Control name="name" disabled />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Tặng điểm giới thiệu mua xe
                          </Form.ControlLabel>
                          <Form.Control name="name" disabled />
                        </Form.Group>
                      </Col>
                    </Row>
                  }
                ></TitleTag>

                <TitleTag
                  content="Thông tin xe bán đang đăng ký (hội viên)"
                  children={
                    <Row className="row-default">
                      <Col md={11} lg={11} className="vertical">
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Số giao dịch bán lẻ
                          </Form.ControlLabel>
                          <Form.Control name="name" placeholder="Nhập để tìm" />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Tên TVBH
                          </Form.ControlLabel>
                          <Form.Control name="name" disabled />
                        </Form.Group>
                      </Col>
                      <Col md={11} lg={11} className="vertical">
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Số khung
                          </Form.ControlLabel>
                          <Form.Control name="name" disabled />
                        </Form.Group>
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Mã Model
                          </Form.ControlLabel>
                          <Form.Control name="name" disabled />
                        </Form.Group>
                      </Col>
                    </Row>
                  }
                ></TitleTag>

                <Divider />

                <TitleTag
                  content=""
                  children={
                    <Row className="row-default">
                      <Col md={11} lg={11} className="vertical">
                        <Form.Group controlId="name-6">
                          <Form.ControlLabel className="text-label">
                            Ghi chú
                          </Form.ControlLabel>
                          <Form.Control
                            name="name"
                            placeholder="Nhập"
                            accepter={Textarea}
                            className="textarea"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  }
                ></TitleTag>
              </Form>
            </Col>
          </Row>
        </Grid>
      </Container>
    </>
  );
};

export default MemberRegister;
