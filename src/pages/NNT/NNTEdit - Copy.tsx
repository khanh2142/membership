import { ShowError } from "components/Dialogs/Dialogs";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Container, Header, Content, Stack, IconButton, Panel, Grid, Row, Col, Badge, Form, Input, ButtonToolbar, TagPicker, InputGroup, Modal, Button, Schema, SelectPicker, Loader, Placeholder, Toggle } from "rsuite";
import general_master_service from "services/general_master_service";
import nnt_service from "services/nnt_service";
import store from 'store/store';
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from 'react-router-dom';
import { useNetworkNavigate } from 'hooks/useNetworkNavigate';
import { toast } from 'react-toastify';
import { useLocalization } from "hooks/useLocalization";
import { useParams } from "react-router-dom";
import monthsToQuarters from "date-fns/monthsToQuarters";
import { requiredRule, emailRequiredRule } from "utils/validationRules";
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

export default function NNTEdit({ isNew }: { isNew: boolean }) {
    const _l = useLocalization('NNTList');
    //const navigate = useNavigate();
    const navigate = useNetworkNavigate();
    const { NetworkId, OrgId } = store.getState().orgInfo;
    const { mst } = useParams();
    const defaultFormValue: any = {
        "MST": "",
        "NetworkID": NetworkId,
        "OrgID": 0,
        "NNTFullName": "",
        "NNTShortName": "",
        "MSTParent": "",  
        "NNTAddress": "",
        "ContactName": "",
        "ContactPhone": "",
        "ContactEmail": "",
        "BizType": "",
        "FlagActive": "1",
        "IsActive": true
    };

    const [formValue, setFormValue] = React.useState(defaultFormValue);
    const defaultOrgData: any = {
        Name: '',
        ShortName: '',
        ContactName: '',
        Email: '',
        PhoneNo: '',
        BizField: '',
        BizType: 0,
    };
    const [orgData, setOrgData] = React.useState(defaultOrgData);
    //const [bizTypeVaulue, setBizTypeVaulue] = React.useState(0);
    const [orgList, setOrgList] = useState([]);
    const [bizTypeList, setBizTypeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const formRef: any = React.useRef();

    const loadNNTDetail = async () => {
        //edit
        if (!isNew && mst && mst != '') {
            let resp = await nnt_service.getByMST(mst);
            if (resp.Success) {
                let data = resp.Data;
                if (data != null) {
                    data.BizType = 4;
                    var ob = {
                        "MST": data.MST,
                        "NetworkID": data.NetworkID,
                        "OrgID": data.OrgID,
                        "NNTFullName": data.NNTFullName,
                        "NNTShortName": data.NNTShortName,
                        "MSTParent": data.MSTParent,
                        "NNTAddress": data.NNTAddress,
                        "ContactName": data.ContactName,
                        "ContactPhone": data.ContactPhone,
                        "ContactEmail": data.ContactEmail,
                        "BizType": data.BizType,
                        "CreateDTime": data.CreateDTime,
                        "CreateBy": data.CreateBy,
                        "LogLUDTimeUTC": data.LogLUDTimeUTC,
                        "LogLUBy": data.LogLUBy,
                        "FlagActive": data.FlagActive,
                        "IsActive": data.FlagActive == "1" ? true : false,
                    };
                    setFormValue(ob);
                    console.log('setFormValue: 20220704', ob);
                    setOrgData({
                        Name: data.NNTFullName || '',
                        ShortName: data.NNTShortName || '',
                        ContactName: data.ContactName || '',
                        Email: data.ContactEmail || '',
                        PhoneNo: data.ContactPhone || '',
                        BizType:data.BizType || 0
                    });
                    //setBizTypeVaulue(data.BizType || 0);
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
            setOrgData(defaultOrgData);
            //setBizTypeVaulue(0);
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

        }
        else{

        }
    };

    const handleOnChangeOrg = (currentValue : any)=>{
        if(currentValue && currentValue != null){
            let objOrgCur = orgList.find((org: any, index) => {
                if (org.Id.toString() === currentValue.toString()) {
                    setOrgData({
                        Name: org.Name || '',
                        ShortName: org.ShortName || '',
                        ContactName: org.ContactName || '',
                        Email: org.Email || '',
                        PhoneNo: org.PhoneNo || '',
                        BizType: org.BizField  || 0
                    });
                    //setBizTypeVaulue(org.BizField  || 0);
                    return org;
                } 
            });
        }
        else{
            setOrgData(defaultOrgData);
            //setBizTypeVaulue(0);
        }
    };


    // const handleOnChangeOrg = (currentValue : any)=>{
    //     if(currentValue && currentValue != null){
    //         let objOrgCur = orgList.find((org: any, index) => {
    //             if (org.Id.toString() === currentValue.toString()) {
    //                 setOrgData({
    //                     Name: org.Name || '',
    //                     ShortName: org.ShortName || '',
    //                     ContactName: org.ContactName || '',
    //                     Email: org.Email || '',
    //                     PhoneNo: org.PhoneNo || '',
    //                     BizType: org.BizField  || 0
    //                 });
    //                 //setBizTypeVaulue(org.BizField  || 0);
    //                 return org;
    //             } 
    //         });
    //     }
    //     else{
    //         setOrgData(defaultOrgData);
    //         //setBizTypeVaulue(0);
    //     }
    // };

    const handleSubmit = () => {
        if (!formRef.current || !formRef.current.check) return;
        if (!formRef.current.check()) {
            console.error('Form Error');
            return;
        }

        let data: any = JSON.parse(JSON.stringify(formValue));
        let dataOrg: any = JSON.parse(JSON.stringify(orgData));

        data.NNTFullName = dataOrg.Name;
        data.NNTShortName = dataOrg.ShortName;
        data.ContactName = dataOrg.ContactName;
        data.ContactEmail = dataOrg.Email;
        data.ContactPhone = dataOrg.PhoneNo;
        //data.BizType = bizTypeVaulue || 0;
        data.BizType = dataOrg.BizType || 0;
        data.FlagActive = data.IsActive ? "1" : "0";
        data.IsActive = undefined;
        nnt_service.update({isNew, data}).then(resp => {
            if (resp.Success) {
                toast.success(_l('NNT data updated'));
                setTimeout(() => {
                    //data.MST = '0106767888';
                    let urlRedirect = `/nnt/edit/${data.MST}`;
                    navigate(urlRedirect);
                  }, 10);
                
            }
            else {
                ShowError(resp.ErrorData);
            }
        });

    };

    const handleSubmitCancel = () => {

    };

    const FlagActiveItem = ({accepter, formValue, isNew }: {accepter: any, formValue: any, isNew: boolean }) => {
        if (!isNew && formValue.MST && formValue.MST !== ""){
            return(
                <>
                    <Grid fluid style={{marginTop: '5px'}}>
                        <Row>
                            <Col xs={24} sm={9} md={9} lg={7}>
                                <Form.ControlLabel className="" style={{marginTop: '7px'}}>{_l('Active')}</Form.ControlLabel>
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

    return (
        <>
            <Container>
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
                <Content>
                    <Row>
                        <Col style={{width: '100%'}}>
                            <Form layout="horizontal" fluid onChange={setFormValue} formValue={formValue} ref={formRef}>
                                <Row>
                                    <Col xs={24} sm={12} md={12} lg={12}>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={8} lg={7}>
                                                <Form.ControlLabel className="" style={{marginTop: '7px'}}>
                                                    {_l('OrgID')} 
                                                    <span className="field-required"> * </span>
                                                </Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <OrgIDItem 
                                                        formValue={formValue}
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={9} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>
                                                        {_l('NNTFullName')} 
                                                        <span className="field-required"> * </span> 
                                                    </Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    {/* <Input 
                                                        style={{ width: '100%' }} 
                                                        name="NNTFullName" 
                                                        className="NNTFullName" 
                                                        value={orgData.Name} 
                                                        onChange={(currentValue: any) => {
                                                            let deepClone = JSON.parse(JSON.stringify(orgData));
                                                            deepClone.Name = currentValue || '';
                                                            setOrgData(deepClone);
                                                        }}
                                                    /> */}
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        rule={requiredRule}
                                                        name="NNTFullName" 
                                                        className="NNTFullName" 
                                                        value={orgData.Name} 
                                                        onChange={(currentValue: any) => {
                                                            let deepClone = JSON.parse(JSON.stringify(orgData));
                                                            deepClone.Name = currentValue || '';
                                                            setOrgData(deepClone);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={9} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>
                                                        {_l('NNTShortName')}
                                                        <span className="field-required"> * </span>
                                                    </Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    {/* <Input 
                                                        style={{ width: '100%' }} 
                                                        name="NNTShortName" 
                                                        className="NNTShortName" 
                                                        value={orgData.ShortName} 
                                                        onChange={(currentValue: any) => {
                                                            let deepClone = JSON.parse(JSON.stringify(orgData));
                                                            deepClone.ShortName = currentValue || '';
                                                            setOrgData(deepClone);
                                                        }}
                                                    /> */}
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        rule={requiredRule}
                                                        name="NNTShortName" 
                                                        className="NNTShortName" 
                                                        value={orgData.ShortName} 
                                                        onChange={(currentValue: any) => {
                                                            let deepClone = JSON.parse(JSON.stringify(orgData));
                                                            deepClone.ShortName = currentValue || '';
                                                            setOrgData(deepClone);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={9} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>
                                                        {_l('MST')}
                                                        <span className="field-required"> * </span>
                                                    </Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Form.Control style={{ width: '100%' }} name="MST" className="MST" rule={requiredRule} />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={8} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>{_l('BizType')}</Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    {/* <SelectPicker
                                                        name="BizType"
                                                        style={{ width: '100%' }}
                                                        labelKey='Name'
                                                        valueKey='Id'
                                                        data={bizTypeList} 
                                                        value={orgData.BizType}
                                                        onChange={(currentValue: any) => {
                                                            //setBizTypeVaulue(currentValue || 0);
                                                            let deepClone = JSON.parse(JSON.stringify(orgData));
                                                            deepClone.BizType = currentValue || 0;
                                                            setOrgData(deepClone);
                                                        }}
                                                    /> */}

                                                    <Form.Control 
                                                        name="BizType"
                                                        style={{ width: '100%' }}
                                                        labelKey='Name'
                                                        valueKey='Id'
                                                        accepter={SelectPicker} 
                                                        data={bizTypeList} 
                                                        value={orgData.BizType}
                                                        onChange={(currentValue: any) => {
                                                            //setBizTypeVaulue(currentValue || 0);
                                                            let deepClone = JSON.parse(JSON.stringify(orgData));
                                                            deepClone.BizType = currentValue || 0;
                                                            setOrgData(deepClone);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={9} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>{_l('NNTAddress')}</Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Form.Control style={{ width: '100%' }} name="NNTAddress" className="NNTAddress" accepter={Textarea} />
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12}>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={9} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>
                                                        {_l('ContactName')}
                                                        <span className="field-required"> * </span>
                                                    </Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Input 
                                                        style={{ width: '100%' }} 
                                                        name="ContactName" 
                                                        className="ContactName" 
                                                        value={orgData.ContactName} 
                                                        onChange={(currentValue: any) => {
                                                            let deepClone = JSON.parse(JSON.stringify(orgData));
                                                            deepClone.ContactName = currentValue || '';
                                                            setOrgData(deepClone);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={9} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>
                                                        {_l('ContactEmail')}
                                                        <span className="field-required"> * </span>
                                                    </Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Input 
                                                        style={{ width: '100%' }} 
                                                        name="ContactEmail" 
                                                        className="ContactEmail" 
                                                        value={orgData.Email} 
                                                        onChange={(currentValue: any) => {
                                                            let deepClone = JSON.parse(JSON.stringify(orgData));
                                                            deepClone.Email = currentValue || '';
                                                            setOrgData(deepClone);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={9} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>
                                                        {_l('ContactEmailTest')}
                                                        <span className="field-required"> * </span>
                                                    </Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        rule={emailRequiredRule}
                                                        name="ContactEmailTest" 
                                                        className="ContactEmailTest" 
                                                        value={orgData.Email} 
                                                        onChange={(currentValue: any) => {
                                                            let deepClone = JSON.parse(JSON.stringify(orgData));
                                                            deepClone.Email = currentValue || '';
                                                            setOrgData(deepClone);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={9} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>
                                                        {_l('ContactPhone')}
                                                        <span className="field-required"> * </span>
                                                    </Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Input 
                                                        style={{ width: '100%' }} 
                                                        name="ContactPhone" 
                                                        className="ContactPhone" 
                                                        value={orgData.PhoneNo} 
                                                        onChange={(currentValue: any) => {
                                                            let deepClone = JSON.parse(JSON.stringify(orgData));
                                                            deepClone.PhoneNo = currentValue || '';
                                                            setOrgData(deepClone);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={8} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>{_l('CreateDTime')}</Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        disabled={true}
                                                        name="CreateDTime" 
                                                        className="CreateDTime" 
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={8} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>{_l('CreateBy')}</Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        disabled={true}
                                                        name="CreateBy" 
                                                        className="CreateBy" 
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={8} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>{_l('LogLUDTimeUTC')}</Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        disabled={true}
                                                        name="LogLUDTimeUTC" 
                                                        className="LogLUDTimeUTC" 
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={8} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>{_l('LogLUBy')}</Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        disabled={true}
                                                        name="LogLUBy" 
                                                        className="LogLUBy" 
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <FlagActiveItem 
                                            accepter={Toggle} 
                                            formValue={formValue}
                                            isNew={isNew}
                                        />
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
