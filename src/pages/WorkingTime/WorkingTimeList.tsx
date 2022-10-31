import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from 'react-router-dom'
import Link from "components/NetworkLink";
import { Container, Header, Content, Stack, IconButton, Panel, Grid, Row, Col, Badge, Form, Button, ButtonToolbar, TagPicker, InputGroup, Input, Modal, Toggle } from "rsuite";
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
import { FiClock } from "react-icons/fi";
import general_master_service from 'services/general_master_service';
import { useNetworkNavigate } from "hooks/useNetworkNavigate";
import { v4 as uuid } from "uuid";
import PermissionContainer from 'components/PermissionContainer';
import { usePermission } from "hooks/usePermission"
import { ShowError, ShowPopup, Confirm } from 'components/Dialogs/Dialogs';
import workingtime_service from "services/workingtime_service";
import { toast } from 'react-toastify';
import WorkingTimeEdit from './WorkingTimeEdit';

const WorkingTimeList = () => {
    const _l = useLocalization('WorkingTimeList');

    const { OrgId, NetworkId } = store.getState().orgInfo;
    const windowSize = useWindowSize();
    const [loadDataKey, setLoadDataKey] = useState("0");
    const [keyword, setKeyword] = useState("");
    const defautCheckedItems: string[] = [];
    const [checkedItems, setCheckedItems] = useState(defautCheckedItems);
    const [currentDetailCode, setCurrentDetailCode] = useState((<></>));
    const navigate = useNetworkNavigate();

    const fetchData = async ({ page, limit, sortBy, sortDir }: { page: number, limit: number, sortBy?: string, sortDir?: string }) => {

        const resp = await workingtime_service.search({
            Ft_PageIndex: page - 1,
            Ft_PageSize: limit,
            //OrgId: OrgId.toString(),
            OrgId: '',
            Keyword: keyword,
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

    const StatusCell = ({ status }: { status: any }) => {
        if (status == "0")
            return (
                <span style={{ background: "#aaa", color: '#333', padding: "3px 10px 3px 10px" }} className="text-sm">
                    {_l('Inactive')}
                </span>
            );
    
        return (
            <span style={{ background: '#4caf50', color: '#fff', padding: "3px 10px 3px 10px" }} className="text-sm">
                {_l('Active')}
            </span>
        );
    };

    const FlagDefaultCell = ({accepter, rowData }: {accepter: any, rowData: any }) => {
        if (rowData.FlagDefault && rowData.FlagDefault !== ''){
            return(
                <>
                    <Toggle checked={rowData.FlagDefault == '1' ? true : false} checkedChildren={'  '} unCheckedChildren={'   '} />
                </>
            );
        }
        return (<></>);
    };

    const NameCell = ({ rowData }: { rowData: any }) => {
        return (
          <Link to={`/workingtime/edit/${rowData.WorkingTimeCode}`} title={rowData.WorkingTimeName}>
            <Stack>
              <span className="text-gray">{rowData.WorkingTimeName}</span>
            </Stack>
          </Link>
        )
      };

    const columnList: ColumDataProps[] = [
        {
            key: '__idx',
            label: _l('Idx'),
            width: 60,
        },
        {
            key: 'WorkingTimeCode',
            label: _l('WorkingTimeCode'),
            cansort: true,
            width: 150,
            resizable: true,
            fixed: false,
            //cell: (rowData: any) => (<NameCell rowData={rowData} />)
        },
        {
            key: 'WorkingTimeName',
            label: _l('WorkingTimeName'),
            cansort: true,
            width: 200,
            resizable: true,
            fixed: false,
            //cell: (rowData: any) => (<NameCell rowData={rowData} />)
        },
        {
            key: 'WorkingType',
            label: _l('WorkingType'),
            width: 150,
            cansort: true,
            //fixed: true,
        },
        {
            key: 'FlagActive',
            label: _l('FlagActive'),
            width: 100,
            cell: (rowData: any) => (<StatusCell status={rowData.FlagActive} />)
        },
        {
            key: 'FlagDefault',
            label: _l('FlagDefault'),
            width: 100,
            flexGrow: 1,
            cell: (rowData: any) => (<FlagDefaultCell accepter={Toggle}  rowData={rowData} />)
        },
    ];

    const handleEdit = (checkedItems: any[]) => {
        let code = checkedItems[0].WorkingTimeCode;
        let urlRedirect = `/workingtime/edit/${code}`;
        navigate(urlRedirect);

    };
    const handleDelete = (checkedItems: any[]) => {
        Confirm({
            title: _l('Delete workingtime'),
            message: _l('Are you sure to delete workingtime(s): ') + checkedItems.map(c=>c.WorkingTimeName).toString(),
            yes: () => {
                let listWorkingTime = checkedItems.reduce((lstWorkingTime: any[], currentValue : any) => {
                    lstWorkingTime.push({
                        NetworkId: NetworkId,
                        OrgId: OrgId,
                        WorkingTimeCode: currentValue.WorkingTimeCode,
                    });
                    return lstWorkingTime;
                }, []);
                workingtime_service.remove(listWorkingTime).then(resp => {
                    if (resp.Success) {
                        toast.success('WorkingTime data deleted');
                        reloadList();
                    }
                    else {
                        ShowError(resp.ErrorData);
                    }
                });
            }
        })
    };

    const genButtonsWhenChecked = (checkedKeys: string[]) => {
        if (checkedKeys.length == 1) {
            return (
                <Stack spacing={6}>
                    <IconButton size="xs" appearance="primary" onClick={()=> handleEdit(checkedKeys)}>
                        <Icon as={FiEdit2}></Icon>
                        {_l('Edit')}
                    </IconButton>
                    <IconButton size="xs" appearance="primary" color="orange" onClick={()=> handleDelete(checkedKeys)} >
                        <Icon as={FiTrash}></Icon>
                        {_l('Delete')}
                    </IconButton>
                </Stack>
            );
        }
        if (checkedKeys.length > 1) {
            return (
                <Stack spacing={6}>
                    <IconButton size="xs" appearance="primary" color="orange" onClick={()=> handleDelete(checkedKeys)}  >
                        <Icon as={FiTrash}></Icon>
                        {_l('Delete')}
                    </IconButton>
                </Stack>
            );
        }
    };

    //thay doi reload key de table load lai data
    const reloadList = () => {
        setLoadDataKey(uuid());
    };

    return (
        <>
            <Container>
                <Header className="page-header border-bottom">
                    <Grid fluid>
                        <Row>
                            <Col md={8}>
                                <span className="page-title">{_l("WorkingTime List")}</span>
                            </Col>
                            <Col md={8}>
                                <Stack spacing={5} className="p-2">
                                    <InputGroup inside style={{ width: "300px" }} size="sm">

                                        <InputGroup.Button>
                                            <Icon as={BsSearch}></Icon>
                                        </InputGroup.Button>
                                        <Input placeholder={_l('Search')} 
                                            value={keyword} 
                                            onChange={(value) => {
                                                    setKeyword(value);
                                                    reloadList();
                                                }
                                            } 
                                        />
                                    </InputGroup>
                                    <Link to={`/workingtime/create`} title={_l("Add new")}>
                                        <Button size="sm" appearance="primary">
                                            <Icon as={BsPlusCircle} className="mr-1" /> 
                                            <span>{_l('Add new')}</span>
                                        </Button>
                                    </Link>
                                </Stack>
                            </Col>
                            <Col md={8}></Col>
                        </Row>
                    </Grid>
                </Header>
                <Content>
                    <TableStandard columns={columnList}
                        reloadKey={loadDataKey}
                        dataKey="WorkingTimeCode"
                        fetchData={fetchData}
                        rowHeight={50}
                        genButtonsWhenChecked={genButtonsWhenChecked}
                        defaultLayout="TableView"
                        height={windowSize.height - 170} />
                </Content>
            </Container>
        </>
    );
};

export default WorkingTimeList;