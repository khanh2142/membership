import SideMenu from "components/SideMenu/SideMenuGeneral";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container, Header, Grid, Row, Col, Stack } from "rsuite";

export default function StaffEdit() {
    let [searchParams, setSearchParams] = useSearchParams({code:""}); //nếu param ko đc truyền thì nó sẽ lấy giá trị mặc định ở đây

    const code = searchParams.get('code');
    
    return (
        <>

            <Container>
                <Header className="page-header border-bottom">
                    <Grid fluid>
                        <Row>
                            <Col md={8}>
                                <span className="page-title">{code}</span>
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