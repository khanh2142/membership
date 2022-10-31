import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from 'react-router-dom'
import Link from "components/NetworkLink";
import { Container, Header, Content, Stack, IconButton, Panel, Grid, Row, Col, Badge, Form, Button, ButtonToolbar, TagPicker, InputGroup, Input, Modal } from "rsuite";
import store from 'store/store';
import staff_service from 'services/staff_service';
import { FiEdit2, FiTrash } from "react-icons/fi";
import { AiFillEye } from 'react-icons/ai';
import TableStandard, { ColumDataProps } from 'components/table/TableStandard'
import { Icon } from "@rsuite/icons";
import { useWindowSize } from "hooks/useWindowSize";
import Avatar from "components/Avatar";
import { useLocalization } from "hooks/useLocalization";
import { BsDot, BsPlus, BsPlusCircle, BsSearch } from "react-icons/bs";
import general_master_service from 'services/general_master_service';
import { useNetworkNavigate } from "hooks/useNetworkNavigate";
import { v4 as uuid } from "uuid";
import PermissionContainer from 'components/PermissionContainer';
import { usePermission } from "hooks/usePermission"
import { ShowError, ShowPopup, Confirm } from 'components/Dialogs/Dialogs';
import department_service from "services/department_service";

const NameCell = ({ rowData }: { rowData: any }) => {
  return (
    <Link to={`/staff/detail/${rowData.StaffCode}`} title={rowData.StaffName}>
      <Stack spacing={10}>
        <Avatar circle size="sm" className="text-green text-bold" text={rowData.StaffName} src={rowData.AvatarUrl} />
        <span className="text-gray">{rowData.StaffName}</span>
      </Stack>
    </Link>
  )
};

const StaffList = () => {

  const _l = useLocalization("StaffList");

  const { OrgId } = store.getState().orgInfo;
  const windowSize = useWindowSize();

  const [depList, setDepList] = useState([]);
  const [staffTypeList, setStaffTypeList] = useState([]);
  const [statusList, setStatusList] = useState([{ key: "ACTIVE", label: _l("ACTIVE") }, { key: "PAUSED", label: _l("PAUSED") }]);
  const [orgList, setOrgList] = useState([]);

  const [loadDataKey, setLoadDataKey] = useState("0");
  const [keyword, setKeyword] = useState("");

  const [ftOrg, setFtOrg] = useState([OrgId]);
  const [ftDep, setFtDep] = useState([]);
  const [ftStaffType, setFtStaffType] = useState([]);
  const [ftStatus, setFtStatus] = useState(["ACTIVE"]);
  const defautCheckedItems: string[] = [];
  const [checkedItems, setCheckedItems] = useState(defautCheckedItems);

  const navigate = useNetworkNavigate();

  const fetchData = async ({ page, limit, sortBy, sortDir }: { page: number, limit: number, sortBy?: string, sortDir?: string }) => {

    console.log("fetch", page, limit, sortBy, sortDir);
    const resp = await staff_service.search_staff({
      Ft_PageIndex: page - 1,
      Ft_PageSize: limit,
      OrgId: ftOrg.toString(),
      Keyword: keyword,
      DepartmentCode: ftDep.toString(),
      StaffType: ftStaffType.toString(),
      StaffStatus: ftStatus.toString()
    });

    if (resp.Success) {
      let data = resp.Data;
      let idx = data.PageIndex * data.PageSize;
      for (var item of data.DataList) {
        item.__idx = ++idx;
      }
    }

    return resp;


  };


  const columnList: ColumDataProps[] = [
    {
      key: "__idx",
      label: _l("Idx"),
      width: 60,
    },
    {
      key: "StaffCode",
      label: _l("StaffCode"),
      width: 150,
      cansort: true,
      fixed:true,
      sortable:true

    },
    {
      key: "StaffName",
      label: _l("StaffName"),
      cansort: false,
      width: 250,
      resizable: true,
      
      cell: (rowData: any) => (<NameCell rowData={rowData} />)


    },
    {
      key: "StaffPhone",
      label: _l("StaffPhone"),
      width: 200,
      resizable: true,
    },
    {
      key: "StaffEmail",
      label: _l("StaffEmail"),
      width: 200,
      resizable: true,
      cansort: true,

    },

    {
      key: "StaffAddress",
      label: _l("StaffAddress"),
      width: 200,

      hide: true



    },



    {
      key: "DepartmentName",
      label: _l("DepartmentName"),
      width: 200,
      flexGrow: 1,
      

    }

  ];

  const handleView = () => {
    let code = checkedItems[0];
    navigate(`/staff/detail/${code}`);
  };

  const handleEdit = () => {
    let code = checkedItems[0];
    navigate(`/staff/edit?code=${code}`);
  };

  const handleDelete = () => {
    Confirm({
      title: "Delete staff",
      message: "Are you sure to delete staff(s): " + checkedItems.toString(),
      yes: () => { Confirm({ message: 'you say yes' }) }

    })
  };



  //demo show popup
  const handleAdd_bk = () => {

    ShowPopup({
      title: "Create new staff",
      body: (onClose: any) => {
        return <>
          <p>Modal body goes here</p>
        </>
      },

      footer: (onClose: any) => {
        return <>

          <Button onClick={onClose}>OK</Button> </>
      },
      size: "xs"

    });

  };
  //demo show popup full custom
  const handleAdd = () => {

    ShowPopup({
      custom: (onClose: any) => {
        return (
          <Modal backdrop="static" role="alertdialog" open={true} onClose={onClose}>
            <Modal.Header>
              <Modal.Title>Create Staff</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Modal body goes here kkk</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={onClose}>OK</Button>
            </Modal.Footer>
          </Modal>
        )
      }

    });

  };

  const genButtonsWhenChecked = (checkedKeys: string[]) => {

    setTimeout(() => {
      setCheckedItems(checkedKeys);
      
    }, 100);
    if (checkedKeys.length == 1)
      return (
        <Stack spacing={6}>
          <IconButton size="xs" appearance="primary" onClick={handleView}>
            <Icon as={AiFillEye}></Icon>
            {_l("View")}</IconButton>
          <IconButton size="xs" appearance="primary" onClick={handleEdit}>
            <Icon as={FiEdit2}></Icon>

            {_l("Edit")}</IconButton>
          <IconButton size="xs" appearance="primary" color="orange" onClick={handleDelete} >
            <Icon as={FiTrash}></Icon>
            {_l("Delete")}</IconButton>
        </Stack>
      );
    if (checkedKeys.length > 1)
      return (
        <Stack spacing={6}>

          <IconButton size="xs" appearance="primary" color="orange" onClick={handleDelete}  >
            <Icon as={FiTrash}></Icon>
            {_l("Delete")}</IconButton>
        </Stack>
      );
  }

  useEffect(() => {


    department_service.getAllActive().then(deps => {
      if (deps.Success) {
        setDepList(deps.Data);
      }
    });

    general_master_service.staffType_GetAllActive().then(resp => {
      if (resp.Success) {
        setStaffTypeList(resp.Data);
      }
    });

    general_master_service.nnt_GetAllActive().then(resp => {
      if (resp.Success) {
        setOrgList(resp.Data);
      }
    });

  }, []);


  //thay doi reload key de table load lai data
  const reloadList = () => {
    setLoadDataKey(uuid());
  }
  const handlFilter = () => {

    console.log(ftOrg)

    reloadList();

  }

  const genFilterBlock = (funcClose: any) => {
    return (
      <div style={{ width: "300px", maxHeight: "400px", overflowY: "auto" }} className="p-3" >

        <p className="text-gray text-normal mb-1">{_l("Organization")}</p>
        <TagPicker
          size="sm"
          data={orgList}
          value={ftOrg}
          style={{ width: '100%' }}
          key={uuid()}
          labelKey="NNTShortName"
          valueKey="OrgID"
          placeholder={_l("All organizations")}
          onChange={setFtOrg}

        />

        <p className="text-gray text-normal mb-1  mt-3">{_l("Department")}</p>
        <TagPicker
          size="sm"
          data={depList}
          value={ftDep}
          style={{ width: '100%' }}
          key={uuid()}
          labelKey="DepartmentName"
          valueKey="DepartmentCode"
          placeholder={_l("All departments")}
          onChange={setFtDep}
        />

        <p className="text-gray text-normal mb-1 mt-3">{_l("StaffType")}</p>
        <TagPicker
          size="sm"
          value={ftStaffType}
          data={staffTypeList}
          style={{ width: '100%' }}
          key={uuid()}
          labelKey="GroupName"
          valueKey="StaffType"
          placeholder={_l("All Staff Types")}
          onChange={setFtStaffType}
        />
        <p className="text-gray text-normal mb-1 mt-3">{_l("Status")}</p>
        <TagPicker
          size="sm"
          value={ftStatus}
          data={statusList}
          style={{ width: '100%' }}
          key={uuid()}
          labelKey="label"
          valueKey="key"
          placeholder={_l("All Staff Types")}
          onChange={setFtStatus}

        />

        <Button onClick={() => {
          handlFilter();
          funcClose();
        }} className="mt-3 full-width" appearance="primary" size="sm">Ok</Button>
      </div>
    )
  }



  const genCardViewItem = (item: any) => {

    return (
      <Grid fluid className="p-0">
        <Row className="p-0">
          <Col md={18} className="p-0">
            <Stack spacing={5}>
              <Avatar circle size="md" className="text-green" text={item.StaffName} src={item.AvatarUrl} />

              <Panel>
                <p>
                  <Link to="/" className="text-gray text-bold">{item.StaffName}</Link>

                </p>
                <p className="text-gray text-small">
                  <Stack spacing={10}>
                    {item.StaffEmail} <BsDot />
                    {item.StaffPhone} <BsDot />
                    {item.StaffAddress}
                  </Stack>
                </p>
              </Panel>

            </Stack>
          </Col>
          <Col md={6} className="p-0">
            <Panel className="float-right text-lg-right">
              <p >
                {item.StaffCode}
              </p>
              <p>

                <span style={{ background: '#4caf50', color: '#fff', padding: "3px 10px 3px 10px" }} className="text-sm">
                  {_l(item.StaffStatus)}
                </span>
              </p>
            </Panel>
          </Col>
        </Row>
      </Grid>

    );

  };

  const hasPermission = usePermission();

  return (
    <>
      <Container>
        <Header className="page-header border-bottom">
          <Grid fluid>
            <Row>
              <Col md={8}>
                <span className="page-title">{_l("Staff List")}</span>
              </Col>
              <Col md={8}>
                <Stack spacing={5} className="p-2">
                  <InputGroup inside style={{ width: "300px" }} size="sm">

                    <InputGroup.Button>
                      <Icon as={BsSearch}></Icon>
                    </InputGroup.Button>
                    <Input placeholder={_l('Search')} value={keyword} onChange={(value) => {
                      setKeyword(value);
                      reloadList();
                    }
                    } />

                  </InputGroup>
                  <Button size="sm" appearance="primary" onClick={handleAdd}><Icon as={BsPlusCircle} className="mr-1" /> <span>{_l('Add new')}</span></Button>
                </Stack>
              </Col>
              <Col md={8}></Col>
            </Row>
          </Grid>
        </Header>
        <Content>
          <TableStandard columns={columnList}
            reloadKey={loadDataKey}
            dataKey="StaffCode"
            fetchData={fetchData}
            rowHeight={50}
            genCardViewItem={genCardViewItem}
            genButtonsWhenChecked={genButtonsWhenChecked}
            genFilterBlock={genFilterBlock}
            height={windowSize.height - 170} />
        </Content>
      </Container>
    </>
  );
};

export default StaffList;
