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
import { requiredRule, orgRequiredRule, emailRule, emailRequiredRule } from "utils/validationRules";
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

export default function NNTEdit({ isNew }: { isNew: boolean }) {
    const _l = useLocalization('NNTList');
    //const navigate = useNavigate();
    const navigate = useNetworkNavigate();
    const { NetworkId, OrgId } = store.getState().orgInfo;
    const { mst } = useParams();
    const defaultFormValue: any = {
        "MST": '',
        "NetworkID": NetworkId,
        "OrgID": -1,
        "NNTFullName": '',
        "NNTShortName": '',
        "MSTParent": '',  
        "NNTAddress": '',
        "ContactName": '',
        "ContactPhone": '',
        "ContactEmail": '',
        "BizType": -1,
        "CreateDTime": '',
        "CreateBy": '',
        "LogLUDTimeUTC": '',
        "LogLUBy": '',
        "FlagActive": '1',
        "IsActive": true
    };

    const [formValue, setFormValue] = React.useState(defaultFormValue);

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

    const handleSubmit = () => {
        if (!formRef.current || !formRef.current.check) return;
        if (!formRef.current.check()) {
            console.error('Form Error');
            return;
        }

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
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        rule={requiredRule}
                                                        name="NNTFullName" 
                                                        className="NNTFullName" 
                                                        onChange={(currentValue: any) => {
                                                            let value = currentValue ?? '';
                                                            let nNTFullName = formValue.NNTFullName;
                                                            if(value!=nNTFullName)
                                                            {
                                                                let deepClone = JSON.parse(JSON.stringify(formValue));
                                                                deepClone.NNTFullName = value;
                                                                setFormValue(deepClone);
                                                            }
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
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        rule={requiredRule}
                                                        name="NNTShortName" 
                                                        className="NNTShortName" 
                                                        onChange={(currentValue: any) => {
                                                            let value = currentValue ?? '';
                                                            let nNTShortName = formValue.NNTShortName;
                                                            if(value!=nNTShortName)
                                                            {
                                                                let deepClone = JSON.parse(JSON.stringify(formValue));
                                                                deepClone.NNTShortName = value;
                                                                setFormValue(deepClone);
                                                            }
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
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        name="MST" 
                                                        className="MST" 
                                                        rule={requiredRule} 
                                                    />
                                                </Col>
                                            </Row>
                                        </Grid>
                                        <Grid fluid style={{marginTop: '5px'}}>
                                            <Row>
                                                <Col xs={24} sm={9} md={8} lg={7}>
                                                    <Form.ControlLabel className="" style={{marginTop: '7px'}}>{_l('BizType')}</Form.ControlLabel>
                                                </Col>
                                                <Col xs={24} sm={15} md={15} lg={15}>
                                                    <Form.Control 
                                                        name="BizType"
                                                        style={{ width: '100%' }}
                                                        labelKey='Name'
                                                        valueKey='Id'
                                                        accepter={SelectPicker} 
                                                        data={bizTypeList} 
                                                        onChange={(currentValue: any) => {
                                                            let value = currentValue ?? -1;
                                                            let bizType = formValue.BizType;
                                                            if(value!=bizType)
                                                            {
                                                                let deepClone = JSON.parse(JSON.stringify(formValue));
                                                                deepClone.BizType = value;
                                                                setFormValue(deepClone);
                                                            }
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
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        rule={requiredRule}
                                                        name="ContactName" 
                                                        className="ContactName" 
                                                        onChange={(currentValue: any) => {
                                                            let value = currentValue ?? '';
                                                            let contactName = formValue.ContactName;
                                                            if(value!=contactName)
                                                            {
                                                                let deepClone = JSON.parse(JSON.stringify(formValue));
                                                                deepClone.ContactName = value;
                                                                setFormValue(deepClone);
                                                            }
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
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        rule={emailRequiredRule}
                                                        name="ContactEmail" 
                                                        className="ContactEmail" 
                                                        onChange={(currentValue: any) => {
                                                            let value = currentValue ?? '';
                                                            let contactEmail = formValue.ContactEmail;
                                                            if(value!=contactEmail)
                                                            {
                                                                let deepClone = JSON.parse(JSON.stringify(formValue));
                                                                deepClone.ContactEmail = value;
                                                                setFormValue(deepClone);
                                                            }
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
                                                    <Form.Control 
                                                        style={{ width: '100%' }} 
                                                        rule={requiredRule}
                                                        name="ContactPhone" 
                                                        className="ContactPhone" 
                                                        onChange={(currentValue: any) => {
                                                            let value = currentValue ?? '';
                                                            let contactPhone = formValue.ContactPhone;
                                                            if(value!=contactPhone)
                                                            {
                                                                let deepClone = JSON.parse(JSON.stringify(formValue));
                                                                deepClone.ContactPhone = value;
                                                                setFormValue(deepClone);
                                                            }
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
