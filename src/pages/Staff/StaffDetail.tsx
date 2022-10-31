import SideMenu from "components/SideMenu/SideMenuGeneral";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Grid, Row, Col, Stack } from "rsuite";

export default function StaffDetail() {
    const { staffCode } = useParams();
    return (
        <>

            <Container>
                <Header className="page-header border-bottom">
                    <Grid fluid>
                        <Row>
                            <Col md={8}>
                                <span className="page-title">{staffCode}</span>
                            </Col>
                            <Col md={8}>

                            </Col>
                            <Col md={8}></Col>
                        </Row>
                    </Grid>
                </Header>
            </Container>
        </>
    )
}