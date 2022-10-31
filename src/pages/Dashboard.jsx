
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from 'react-router-dom'
import { Container, Header, Content, Navbar, Nav, Sidenav, Sidebar } from "rsuite";

const Dashboard = () => {

  const [expand, setExpand] = React.useState(true);

  return (
    <>
      <Container>
        <Content><p className="p-2 text-lg-center">Dashboard</p></Content>
      </Container>
    </>
  );
};

export default Dashboard;
