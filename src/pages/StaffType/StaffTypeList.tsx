import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from 'react-router-dom'
import Link from "components/NetworkLink";
import { Container, Header, Content, Stack, IconButton, Panel, Grid, Row, Col, Badge, Form, Button, ButtonToolbar, TagPicker, SelectPicker, InputGroup, Input, Modal } from "rsuite";
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
import stafftype_service from "services/stafftype_service";
import { toast } from 'react-toastify';
import StaffTypeEdit from './StaffTypeEdit';

const StaffTypeList = () => {
    const _l = useLocalization('StaffTypeList');

    const { OrgId, NetworkId } = store.getState().orgInfo;
    const windowSize = useWindowSize();
    const [loadDataKey, setLoadDataKey] = useState("0");
    const [keyword, setKeyword] = useState("");
    const [orgList, setOrgList] = useState([]);
    //const [ftOrg, setFtOrg] = useState([`${OrgId}`]);
    const [ftOrg, setFtOrg] = useState(OrgId);
    const [statusList, setStatusList] = useState([{ key: '1', label: _l('Active') }, { key: '0', label: _l('Inactive') }]);
    const [ftStatus, setFtStatus] = useState(['1', '0']);
    const defautCheckedItems: string[] = [];
    const [checkedItems, setCheckedItems] = useState(defautCheckedItems);
    const [currentDetailCode, setCurrentDetailCode] = useState((<></>));
    const navigate = useNetworkNavigate();

    const fetchData = async ({ page, limit, sortBy, sortDir }: { page: number, limit: number, sortBy?: string, sortDir?: string }) => {
        var orgId = ftOrg ?? OrgId.toString();
        var flagActive = '';
        if(ftStatus !== undefined && ftStatus !== null && ftStatus.length > 0){
            flagActive = ftStatus.join(',');
        }

        const resp = await stafftype_service.search({
            Ft_PageIndex: page - 1,
            Ft_PageSize: limit,
            OrgId: orgId,
            Keyword: keyword,
            FlagActive: flagActive,
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

    const loadOrgList = async () => {
        let resp = await general_master_service.nnt_GetAllActive();
        if (resp.Success) {
            if (resp.Data != null) {
                setOrgList(resp.Data);
            }
        }
        else {
            ShowError(resp.ErrorData);
        }
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

    const columnList: ColumDataProps[] = [
        {
            key: '__idx',
            label: _l('Idx'),
            width: 60,
        },
        {
            key: 'GroupName',
            label: _l('GroupName'),
            width: 200,
            cansort: true,
            resizable: true,
            //fixed: true,
        },
        {
            key: 'ss_QtyStaff',
            label: _l('ss_QtyStaff'),
            cansort: false,
            width: 120,
            resizable: true,
        },
        {
            key: 'WorkingTime',
            label: _l('WorkingTime'),
            width: 150,
            resizable: true,
        },
        {
            key: 'TimeStart',
            label: _l('TimeStart'),
            width: 150,
            resizable: true,
        },
        {
            key: 'TimeEnd',
            label: _l('TimeEnd'),
            width: 150,
            resizable: true,
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
        let code = checkedItems[0].StaffType;
        setCurrentDetailCode(<StaffTypeEdit code={code}  uuid={uuid()} onSuccess={reloadList} />);
    };

    const handleAdd = () => {
        setCurrentDetailCode(<StaffTypeEdit code="" uuid={uuid()}  onSuccess={reloadList} />);
    };

    const handleDelete = (checkedItems: any[]) => {
        Confirm({
            title: _l('Delete stafftype'),
            message: _l('Are you sure to delete stafftype(s): ') + checkedItems.map(c=>c.GroupName).toString(),
            yes: () => {
                let listStaffType = checkedItems.reduce((lstStaffType: any[], currentValue : any) => {
                    lstStaffType.push({
                        NetworkId: NetworkId,
                        OrgId: OrgId,
                        StaffType: currentValue.StaffType,
                    });
                    return lstStaffType;
                }, []);
                stafftype_service.remove(listStaffType).then(resp => {
                    if (resp.Success) {
                        toast.success(_l('StaffType data deleted'));
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
        if (checkedKeys.length == 1){
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
        if (checkedKeys.length > 1){
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


    useEffect(() => {
        loadOrgList();
    }, []);

    //thay doi reload key de table load lai data
    const reloadList = () => {
        setLoadDataKey(uuid());
    };

    const handlFilter = () => {
        console.log(ftOrg)
        console.log(ftStatus)
        reloadList();
    };

    const genFilterBlock = (funcClose: any) => {
        return (
          <div style={{ width: "300px", maxHeight: "400px", overflowY: "auto" }} className="p-3" >
    
            <p className="text-gray text-normal mb-1">{_l("Organization")}</p>
            {/* <TagPicker
                size="sm"
                data={orgList}
                value={ftOrg}
                style={{ width: '100%' }}
                key={uuid()}
                labelKey="NNTShortName"
                valueKey="OrgID"
                placeholder={_l("All organizations")}
                onChange={setFtOrg}
            /> */}
            <SelectPicker 
                name="OrgID"
                size="sm"
                style={{ width: '100%' }}
                labelKey='NNTFullName'
                valueKey='OrgID'
                data={orgList} 
                onChange={setFtOrg}
                value={ftOrg}
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

    return (
        <>
            <Container>
                <Header className="page-header border-bottom">
                    <Grid fluid>
                        <Row>
                            <Col md={8}>
                                <span className="page-title">{_l('StaffType List')}</span>
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
                                    <Button size="sm" appearance="primary" onClick={handleAdd}>
                                        <Icon as={BsPlusCircle} className="mr-1" /> 
                                        <span>{_l('Add new')}</span>
                                    </Button>
                                </Stack>
                            </Col>
                            <Col md={8}></Col>
                        </Row>
                    </Grid>
                </Header>
                <Content>
                    <TableStandard columns={columnList}
                        reloadKey={loadDataKey}
                        dataKey="StaffType"
                        fetchData={fetchData}
                        rowHeight={50}
                        genButtonsWhenChecked={genButtonsWhenChecked}
                        genFilterBlock={genFilterBlock}
                        height={windowSize.height - 170} />
                </Content>
            </Container>

            {currentDetailCode}

        </>
    );
};

export default StaffTypeList;