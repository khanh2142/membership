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
import { FiClock } from "react-icons/fi";
import general_master_service from 'services/general_master_service';
import { useNetworkNavigate } from "hooks/useNetworkNavigate";
import { v4 as uuid } from "uuid";
import PermissionContainer from 'components/PermissionContainer';
import { usePermission } from "hooks/usePermission"
import { ShowError, ShowPopup, Confirm } from 'components/Dialogs/Dialogs';
import nnt_service from "services/nnt_service";
import { toast } from 'react-toastify';
import NNTEdit from './NNTEdit';

const NNTList = () => {
    const _l = useLocalization('NNTList');

    const { OrgId, NetworkId } = store.getState().orgInfo;
    const windowSize = useWindowSize();
    const [loadDataKey, setLoadDataKey] = useState("0");
    const [keyword, setKeyword] = useState("");
    const defautCheckedItems: string[] = [];
    const [checkedItems, setCheckedItems] = useState(defautCheckedItems);
    const [currentDetailCode, setCurrentDetailCode] = useState((<></>));
    const navigate = useNetworkNavigate();

    const fetchData = async ({ page, limit, sortBy, sortDir }: { page: number, limit: number, sortBy?: string, sortDir?: string }) => {

        const resp = await nnt_service.search({
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

    const NameCell = ({ rowData }: { rowData: any }) => {
        return (
          <Link to={`/nnt/edit/${rowData.MST}`} title={rowData.NNTFullName}>
            <Stack>
              <span className="text-gray">{rowData.NNTFullName}</span>
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
            key: 'NNTFullName',
            label: _l('NNTFullName'),
            cansort: true,
            width: 250,
            resizable: true,
            fixed: true,
            cell: (rowData: any) => (<NameCell rowData={rowData} />)
        },
        {
            key: 'MST',
            label: _l('MST'),
            width: 150,
            cansort: true,
            //fixed: true,
        },
        {
            key: 'NNTMobile',
            label: _l('NNTMobile'),
            width: 150,
        },
        {
            key: 'QtyLicense',
            label: _l('QtyLicense'),
            width: 150,
        },
        {
            key: 'FlagActive',
            label: _l('FlagActive'),
            width: 100,
            flexGrow: 1,
            cell: (rowData: any) => (<StatusCell status={rowData.FlagActive} />)
        },
    ];

    const handleEdit = (checkedItems: any[]) => {
        


    };

    const handleAdd = () => {

        <Link to={`/nnt/create`} title={_l("create")}>
            
        </Link>


        

    };

    const handleDelete = (checkedItems: any[]) => {
        Confirm({
            title: _l('Delete NNT'),
            message: _l('Are you sure to delete nnt(s): ') + checkedItems.map(c=>c.NNTFullName).toString(),
            yes: () => {
                let listNNT = checkedItems.reduce((lstNNT: any[], currentValue : any) => {
                    lstNNT.push({
                        NetworkId: NetworkId,
                        OrgId: OrgId,
                        MST: currentValue.MST,
                    });
                    return lstNNT;
                }, []);
                nnt_service.remove(listNNT).then(resp => {
                    if (resp.Success) {
                        toast.success(_l('NNT data deleted'));
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

    const genCardViewItem = (item: any) => {

        return (
            <Grid fluid className="p-0">
                    <Row className="p-0">
                        <Col md={18} className="p-0">
                            <Stack spacing={5}>
                            
                                <Panel>
                                    <div className="text-gray text-bold">
                                        <Link to={`/nnt/edit/${item.MST}`} title={item.NNTFullName}>
                                            <Stack>
                                            <span className="text-gray">{item.NNTFullName}</span>
                                            </Stack>
                                        </Link>
                                        
                                    </div>
                                    <div className="text-gray text-small">
                                        <Stack spacing={10}>
                                            {item.OrgID} <BsDot />
                                            {_l('MST')} : {item.MST}
                                        </Stack>
                                    </div>
                                </Panel>
                
                            </Stack>
                        </Col>
                        <Col md={6} className="p-0">
                            <Panel className="float-right text-lg-right">
                            <p>
                                {
                                    <StatusCell status={item.FlagActive} />
                                }
                            </p>
                            <div style={{lineHeight: '30px'}}>
                                <Stack spacing={5}>
                                    <FiClock />{item.CreateDTime}
                                </Stack>
                            </div>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
        );
    
      };


    return (
        <>
            <Container>
                <Header className="page-header border-bottom">
                    <Grid fluid>
                        <Row>
                            <Col md={8}>
                                <span className="page-title">{_l("NNT List")}</span>
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
                                    <Link to={`/nnt/create`} title={_l("Add new")}>
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
                        dataKey="LocationCode"
                        fetchData={fetchData}
                        rowHeight={50}
                        genCardViewItem={genCardViewItem}
                        genButtonsWhenChecked={genButtonsWhenChecked}
                        defaultLayout="CardView"
                        height={windowSize.height - 170} />
                </Content>
            </Container>
        </>
    );
};

export default NNTList;