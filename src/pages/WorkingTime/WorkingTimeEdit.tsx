import { ShowError } from "components/Dialogs/Dialogs";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Container, Header, Content, Stack, IconButton, Panel, Grid, Row, Col, Badge, Form, Input, ButtonToolbar, TagPicker, InputGroup, Modal, Button, Schema, SelectPicker, Loader, Placeholder, Toggle, Nav } from "rsuite";
import general_master_service from "services/general_master_service";
import nnt_service from "services/nnt_service";
import store from 'store/store';
import { v4 as uuid } from "uuid";
import HolidaysTable from 'components/table/TableHolidays'
import { Link, useNavigate } from 'react-router-dom';
import { useNetworkNavigate } from 'hooks/useNetworkNavigate';
import { toast } from 'react-toastify';
import { useLocalization } from "hooks/useLocalization";
import { useParams } from "react-router-dom";
import monthsToQuarters from "date-fns/monthsToQuarters";
import { requiredRule, orgRequiredRule, emailRule, emailRequiredRule } from "utils/validationRules";
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

export default function WorkingTimeEdit({ isNew }: { isNew: boolean }) {
    const _l = useLocalization('WorkingTimeList');
    const navigate = useNetworkNavigate();
    const { NetworkId, OrgId } = store.getState().orgInfo;
    const { mst } = useParams();

    const defaultFormValue: any = {
        Mst_WorkingTime: {
            'WorkingTimeCode' : '',
            'NetworkID': NetworkId,
            'OrgID': OrgId,
            'WorkingTimeName': '',
            'WorkingType': '',
            'ShiftID': '',
            'Remark': '',
            'FlagDefault': '0',
            'Flag247': '0',
            'FlagActive': '1',
            'IsActive': true,
        },

    };

    const [formValue, setFormValue] = React.useState(defaultFormValue);
    //const [rowsData, setRowsData] = React.useState(ab);
    const [orgList, setOrgList] = useState([]);
    const [bizTypeList, setBizTypeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [loadDataKey, setLoadDataKey] = useState("0");
    const formRef: any = React.useRef();

    const loadNNTDetail = async () => {
        //edit
        if (!isNew && mst && mst != '') {
            let resp = await nnt_service.getByMST(mst);
            if (resp.Success) {
                let data = resp.Data;
                if (data != null) {
                    var formValueCur = {
                        "MST": data.MST ?? '',
                        "NetworkID": data.NetworkID ?? -1,
                        "OrgID": data.OrgID ?? -1,
                        "NNTFullName": data.NNTFullName ?? '',
                        "NNTShortName": data.NNTShortName ?? '',
                        "MSTParent": data.MSTParent ?? '',
                        "NNTAddress": data.NNTAddress ?? '',
                        "ContactName": data.ContactName ?? '',
                        "ContactPhone": data.ContactPhone ?? '',
                        "ContactEmail": data.ContactEmail ?? '',
                        "BizType": data.BizType ?? -1,
                        "CreateDTime": data.CreateDTime ?? '',
                        "CreateBy": data.CreateBy ?? '',
                        "LogLUDTimeUTC": data.LogLUDTimeUTC ?? '',
                        "LogLUBy": data.LogLUBy ?? '',
                        "FlagActive": data.FlagActive ?? '1',
                        "IsActive": data.FlagActive == '1' ? true : false,
                    };
                    setFormValue(formValueCur);
                }
            }
            else {
                ShowError(resp.ErrorData);
                setNotFound(true);
            }
        }
        //create
        else {
            setFormValue(defaultFormValue);
        }
    };

    const loadBizTypeList = async () => {
        let resp = await general_master_service.bizType_GetAllActive();
        if (resp.Success) {
            if (resp.Data != null) {
                setBizTypeList(resp.Data);
            }
        }
        else {
            ShowError(resp.ErrorData);
        }
    };
    const loadOrgList = async () => {
        let resp = await general_master_service.org_GetAllActive();
        if (resp.Success) {
            if (resp.Data != null) {
                setOrgList(resp.Data);
            }
        }
        else {
            ShowError(resp.ErrorData);
        }
    };

    const loadData = async () => {
        setLoading(true);
        await loadOrgList();
        await loadBizTypeList();
        await loadNNTDetail();
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [mst]);

    const mapOrgInfo = (data : any) => {
        if(data !== undefined && data !== null){
            let newValues= {...formValue, 
                OrgID: data.Id,
                NNTFullName:  data.Name ?? '',
                NNTShortName:  data.ShortName ?? '',
                ContactName:  data.ContactName ?? '',
                ContactEmail:  data.Email ?? '',
                ContactPhone:  data.PhoneNo ?? '',
                BizType:  data.BizType  ?? -1,
            };
            setFormValue(newValues);
        }
        else{
            let newValues= {...formValue, 
                OrgID: -1, 
                NNTFullName: '',
                NNTShortName: '',
                ContactName: '',
                ContactEmail: '',
                ContactPhone: '',
                BizType: -1 
            };
            setFormValue(newValues);
        }
    };

    const handleOnChangeOrg = (currentValue : any)=>{
        if(currentValue && currentValue != null){
            var orgID= formValue.OrgID;
            if(orgID != currentValue){
                let objOrgCur = orgList.find((org: any, index) => {
                    return org.Id.toString() === currentValue.toString();
                });
                mapOrgInfo(objOrgCur);
            }
        }
        else{
            mapOrgInfo(null);
        }
    };

    const handleSubmit = (rowsData : any) => {
        if (!formRef.current || !formRef.current.check) return;
        if (!formRef.current.check()) {
            console.error('Form Error');
            return;
        }

        console.log('rowsData', rowsData);
        console.log('holidayList', holidayList);
var abc = holidayList;

        let data: any = JSON.parse(JSON.stringify(formValue));

        data.OrgID = (data.OrgID != null && data.OrgID != -1) ? data.OrgID : null;
        data.BizType = (data.BizType != null && data.BizType != -1) ? data.BizType : null;
        data.CreateDTime = (data.CreateDTime && data.CreateDTime != '') ? data.CreateDTime : null;
        data.LogLUDTimeUTC = (data.LogLUDTimeUTC && data.LogLUDTimeUTC != '') ? data.LogLUDTimeUTC : null;
        data.FlagActive = data.IsActive ? "1" : "0";
        data.IsActive = undefined;
        nnt_service.update({isNew, data}).then(resp => {
            if (resp.Success) {
                toast.success(_l('NNT data updated'));
                setTimeout(() => {
                    let urlRedirect = `/nnt/edit/${data.MST}`;
                    navigate(urlRedirect);
                }, 10);
            }
            else {
                ShowError(resp.ErrorData);
            }
        });
    };

    const FlagActiveItem = ({accepter, formValue}: {accepter: any, formValue: any}) => {
        if (true){
            return(
                <>
                    <Grid fluid style={{marginTop: '5px'}}>
                        <Row>
                            <Col xs={24} sm={9} md={9} lg={7}>
                                <Form.ControlLabel className="" style={{marginTop: '0px'}}>{_l('Active')}</Form.ControlLabel>
                            </Col>
                            <Col xs={24} sm={15} md={15} lg={15}>
                                <Form.Control name="IsActive" accepter={accepter} checked={formValue.IsActive ? true : false} checkedChildren={_l('Active')} unCheckedChildren={_l('Inactive')} />
                            </Col>
                        </Row>
                    </Grid>
                </>
            );
        }
        return (<></>);
    };

    const OrgIDItem = ({formValue} : {formValue: any }) =>{
        if(isNew){
            return (
                <>
                    <Form.Control name="OrgID"
                        style={{ width: '100%' }}
                        rule={orgRequiredRule}
                        labelKey='Name'
                        valueKey='Id'
                        accepter={SelectPicker} 
                        data={orgList} 
                        onChange={handleOnChangeOrg}
                    />
                </>
            );
        }
        else{
            return (
                <>
                    <Form.Control 
                        style={{ width: '100%' }} 
                        name="OrgID" 
                        className="OrgID" 
                        disabled={true}
                        rule={requiredRule} 
                    />
                </>
            );
        }
    };
    const styles = {
        marginBottom: 15,
        lineHeight: '30px',
    };
    const CustomNav = ({active, onSelect, ...props } : {active: any, onSelect: any}) => {
        return (
          <Nav {...props} appearance="subtle" activeKey={active} onSelect={onSelect} style={styles}>
            <Nav.Item eventKey="workingtime">
              {_l('WorkingTime')}
            </Nav.Item>
            <Nav.Item eventKey="holidays">{_l('Holidays')}</Nav.Item>
          </Nav>
        );
      };
    const [active, setActive] = React.useState('workingtime');
    const handleOnSelectTab = (eventKey: string, event : any) =>{
        setActive(eventKey);
        // const elementInactive = document.querySelector(`div.${active}`);
        // if(elementInactive !== undefined && elementInactive !== null){
        //     (elementInactive as HTMLInputElement).classList.add('idn-display-none');
        // }
        // const elementActive = document.querySelector(`div.${eventKey}`);
        // if(elementActive !== undefined && elementActive !== null){
        //     (elementActive as HTMLInputElement).classList.remove('idn-display-none');
        // }
    };

    let lst:any[] = [
        {
            'DayValue': '12',
            'MonthValue': '03',
            'HolidayName': 'abc'
        },
        {
            'DayValue': '12',
            'MonthValue': '05',
            'HolidayName': 'abcd'
        },
    ];

    const [holidayList, setHolidayList] = useState(lst);
//thay doi reload key de table load lai data
const reloadList = (rowsData: any[]) => {
    debugger;
    setHolidayList(rowsData)
    setLoadDataKey(uuid());
};
    return (
        <>
            <Container className="">
                <Header className="page-header border-bottom">
                    <Grid fluid>
                        <Row>
                            <Col xs={20} sm={20} md={22} lg={22}>
                                <span className="page-title">{
                                    !isNew ? _l('org info') + `: ${mst}` : _l('org info')
                                }</span>
                            </Col>
                            <Col xs={4} sm={4} md={2} lg={2}>
                                <Stack spacing={6} className="stack-page-button">
                                    <Button appearance="primary" type="submit" onClick={handleSubmit}>{_l('Submit')}</Button> 
                                </Stack>
                            </Col>
                        </Row>
                    </Grid>
                </Header>
                <Content className="idn-background-main-content">
                    <Row className="page-header border-bottom">
                        <Col style={{width: '100%'}}>
                            <Form layout="horizontal" fluid onChange={setFormValue} formValue={formValue} ref={formRef}>
                                <Row className="idn-background-content" style={{paddingTop: '7px', paddingBottom: '7px', height: '80px'}}>
                                    
                                    <Col xs={24} sm={12} md={12} lg={12}  className="idn-background-main-content">
                                        <Grid fluid style={{height: '65px'}}>
                                            <Row style={{marginTop: '15px'}}>
                                                <Col xs={24} sm={9} md={8} lg={7}>
                                                <Form.ControlLabel className="" style={{marginTop: '7px'}}>
                                                    {_l('OrgID')} 
                                                    <span className="field-required"> * </span>
                                                </Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        rule={requiredRule}
                                                        name="WorkingTimeName" 
                                                        className="WorkingTimeName"
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12}  className="idn-background-main-content">
                                        <Grid fluid style={{height: '65px'}}>
                                            <Row style={{marginTop: '15px'}}>
                                                <Col xs={12}>
                                                    <FlagActiveItem 
                                                        accepter={Toggle} 
                                                        formValue={formValue}
                                                    />
                                                </Col>
                                                <Col xs={12}>
                                                    <FlagActiveItem 
                                                        accepter={Toggle} 
                                                        formValue={formValue}
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24}>
                                        <CustomNav active={active} onSelect={handleOnSelectTab}/>
                                        <div className="tabs-content">
                                            {
                                                active === 'workingtime' ? <div className="workingtime {}" >Hello cao to</div> : <HolidaysTable data={holidayList} reloadList={reloadList}/>
                                            }
                                            
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Content>
            </Container>
        </>
    );
}
