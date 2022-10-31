import { ShowError } from "components/Dialogs/Dialogs";
import { DatePicker, InputNumber } from 'rsuite';
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Form, Input, Modal, Button, Schema, SelectPicker, Loader, Placeholder, Toggle } from "rsuite";
import general_master_service from "services/general_master_service";
import stafftype_service from "services/stafftype_service";
import store from 'store/store';
import { toast } from 'react-toastify';
import { useLocalization } from "hooks/useLocalization";
import { requiredRule, numberRequiredRule, dateRequiredRule, orgRequiredRule, emailRule, emailRequiredRule } from "utils/validationRules";
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

export default function StaffTypeEdit({ code, onSuccess, uuid }: { code: string, onSuccess: any, uuid: any }) {

    const _l = useLocalization('StaffTypeList');
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const { NetworkId, OrgId } = store.getState().orgInfo;

    const addTimeToDate = (date : Date, hours: number, minutes: number)=>{
        return new Date(new Date(new Date(date).setHours(date.getHours() + hours)).setMinutes(date.getMinutes() + minutes));
    };

    const checkDate = function (date : any ) {
        if (date == undefined || date == null) {
            return false;
        }
        
        var check = (date instanceof Date);
        return check;
    };

    const getCurrentDateTime = (dateInput : Date)=>{

        let date = dateInput.getDate();
        let month = dateInput.getMonth() + 1;
        let year = dateInput.getFullYear();
        let hour = dateInput.getHours();
        let minute = dateInput.getMinutes();
        let second = dateInput.getSeconds();

        let _date = `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`;
        let _time = `${hour<10?`0${hour}`:`${hour}`}:${minute<10?`0${minute}`:`${minute}`}:${second<10?`0${second}`:`${second}`}`;
        return `${_date} ${_time}`;

    };

    const getCurrentDate = (dateInput : Date)=>{

        let date = dateInput.getDate();
        let month = dateInput.getMonth() + 1;
        let year = dateInput.getFullYear();

        let _date = `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`;
        return _date;

    };

    const getCurrentTime = (dateInput : Date)=>{

        let hour = dateInput.getHours();
        let minute = dateInput.getMinutes();
        let second = dateInput.getSeconds();

        let _time = `${hour<10?`0${hour}`:`${hour}`}:${minute<10?`0${minute}`:`${minute}`}:${second<10?`0${second}`:`${second}`}`;
        return _time;

    };

    const getTotalMinutes = (dateInput : Date) =>{
        let total = 0;
        let hours = dateInput.getHours();
        let minutes = dateInput.getMinutes();
        //let second = dateInput.getSeconds();

        total = hours * 60 + minutes;
        return total;
    };

    const convertTotalMinutesToTime = (totalMinutes : number) =>{
        let time = undefined;
        //let hours1 = Math.floor(totalMinutes / 60);
        let hours = (totalMinutes - totalMinutes % 60) / 60;
        let minutes = (totalMinutes % 60);
        //let second = dateInput.getSeconds();

        time = `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}:00`;
        return time;
    };

    const dateDefault = getCurrentDate(new Date());

    const defaultFormValue: any = {
        "StaffType": "",
        "NetworkID": NetworkId,
        "OrgID": OrgId,
        "GroupName": "",
        "WorkingTime": 1,
        "TimeStart": `${dateDefault} 08:00:00`,
        //"TimeEnd": getCurrentDateTime(addTimeToDate(new Date(), 9, 30)),
        "TimeEnd": `${dateDefault} 17:30:00`,
        "FlagActive": "1",
        "IsActive": true
    };

    const [formValue, setFormValue] = React.useState(defaultFormValue);
    const [nntList, setNNTList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const formRef: any = React.useRef();

    const loadStaffTypeDetail = async () => {
        //edit
        if (code && code != '') {
            let resp = await stafftype_service.getByCode(code);
            if (resp.Success) {
                let data = resp.Data;
                if (data != null) {
                    let date = getCurrentDate(new Date());
                    let timeStart = `${date} ${convertTotalMinutesToTime(data.TimeStart)}`;
                    let timeEnd = `${date} ${convertTotalMinutesToTime(data.TimeEnd)}`;
                    setFormValue({
                        "StaffType": data.StaffType,
                        "NetworkID": data.NetworkID,
                        "OrgID": data.OrgID,
                        "GroupName": data.GroupName,
                        "WorkingTime": data.WorkingTime,
                        "TimeStart": timeStart,
                        "TimeEnd": timeEnd,
                        "FlagActive": data.FlagActive,
                        "IsActive": data.FlagActive == "1" ? true : false,
                    });
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

    const loadNNTList = async () => {
        let resp = await general_master_service.nnt_GetAllActive();
        if (resp.Success) {
            if (resp.Data != null) {
                setNNTList(resp.Data);
            }
        }
        else {
            ShowError(resp.ErrorData);
        }
    };

    const loadData = async () => {
        setLoading(true);
        await loadStaffTypeDetail();
        await loadNNTList();
        setLoading(false);
    };

    useEffect(() => {
        setOpen(true);
        loadData();
    }, [code, uuid]);

    const handleSubmit = () => {
        if (!formRef.current || !formRef.current.check) return;
        if (!formRef.current.check()) {
            console.error('Form Error');
            return;
        }

        let data: any = JSON.parse(JSON.stringify(formValue));

        data.TimeStart = getTotalMinutes(new Date(data.TimeStart));
        data.TimeEnd = getTotalMinutes(new Date(data.TimeEnd));

        data.FlagActive = data.IsActive ? "1" : "0";
        data.IsActive = undefined;

        stafftype_service.update(data).then(resp => {
            if (resp.Success) {
                handleClose();
                onSuccess();
                toast.success(_l('StaffType data updated'));
            }
            else {
                ShowError(resp.ErrorData);
            }
        });
    };

    const FlagActiveView = ({accepter, formValue }: {accepter: any, formValue: any }) => {
        if (formValue.StaffType && formValue.StaffType !== ""){
            return(
                <>
                    <Form.Group controlId="textarea-9">
                        <Form.ControlLabel>{_l('Active')}</Form.ControlLabel>
                        <Form.Control name="IsActive" accepter={accepter} checked={formValue.IsActive ? true : false} checkedChildren={_l('Active')} unCheckedChildren={_l('Inactive')} />
                    </Form.Group>
                </>
            );
        }
        return (<></>);
    };

    const body = () => {
        if (loading) return <Placeholder.Paragraph rows={5} style={{ marginTop: 30 }} />;
        if (notFound) {
            return (<><strong>{_l('No data')}</strong></>);
        }
        return (
            <>
                <Form fluid onChange={setFormValue} formValue={formValue} ref={formRef}>
                    <Form.Group controlId="name-9" >
                        <Form.ControlLabel>
                            {_l('GroupName')}
                            <span className="field-required"> * </span>
                        </Form.ControlLabel>
                        <Form.Control 
                            style={{ width: '100%' }} 
                            rule={requiredRule}
                            name="GroupName" 
                            className="GroupName"
                        />
                    </Form.Group>
                    <Form.Group controlId="name-9" >
                        <Form.ControlLabel>
                            {_l('ss_QtyStaff')}
                            <span className="field-required"> * </span>
                        </Form.ControlLabel>
                        <Form.Control 
                            style={{ width: '100%' }} 
                            disabled={true}
                            name="ss_QtyStaff" 
                            className="ss_QtyStaff"
                        />
                    </Form.Group>
                    <Form.Group controlId="name-9" >
                        <Form.ControlLabel>
                            {_l('WorkingTime')}
                            <span className="field-required"> * </span>
                        </Form.ControlLabel>
                        <Form.Control 
                            style={{ width: '100%' }} 
                            rule={numberRequiredRule}
                            name="WorkingTime" 
                            className="WorkingTime"
                            accepter={InputNumber}
                            defaultValue={1}
                            min={1}
                            max={24}
                            step={1}
                        />
                    </Form.Group>
                    <Form.Group controlId="name-9" >
                        <Form.ControlLabel>
                            {_l('TimeStart')}
                            <span className="field-required"> * </span>
                        </Form.ControlLabel>
                        <Form.Control 
                            style={{ width: '100%' }} 
                            name="TimeStart" 
                            className="TimeStart"
                            placement="autoVerticalStart"
                            format="HH:mm"
                            ranges={[]}
                            value={new Date(formValue.TimeStart)}
                            accepter={DatePicker}
                            // hideHours={(hour : any) => hour < 8 || hour > 18}
                            // hideMinutes={(minute : any) => minute % 15 !== 0}
                            // hideSeconds={(second : any) => second % 30 !== 0}
                            onChange={(currentValue: any) => {
                                let value = null;
                                if(currentValue == undefined || currentValue == null){
                                    value = getCurrentDateTime(new Date());
                                }
                                else{
                                    value = getCurrentDateTime(currentValue);
                                }
                                let timeStart = formValue.TimeStart;
                                if(value!=timeStart)
                                {
                                    let deepClone = JSON.parse(JSON.stringify(formValue));
                                    deepClone.TimeStart = value;
                                    setFormValue(deepClone);
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="name-9" >
                        <Form.ControlLabel>
                            {_l('TimeEnd')}
                            <span className="field-required"> * </span>
                        </Form.ControlLabel>
                        <Form.Control 
                            style={{ width: '100%' }} 
                            name="TimeEnd" 
                            className="TimeEnd"
                            placement="autoVerticalStart"
                            format="HH:mm"
                            ranges={[]}
                            value={new Date(formValue.TimeEnd)}
                            accepter={DatePicker}
                            // hideHours={(hour : any) => hour < 8 || hour > 18}
                            // hideMinutes={(minute : any) => minute % 15 !== 0}
                            // hideSeconds={(second : any) => second % 30 !== 0}
                            onChange={(currentValue: any) => {
                                let value = null;
                                if(currentValue == undefined || currentValue == null){
                                    value = getCurrentDateTime(new Date());
                                }
                                else{
                                    value = getCurrentDateTime(currentValue);
                                }
                                let timeEnd = formValue.TimeEnd;
                                if(value!=timeEnd)
                                {
                                    let deepClone = JSON.parse(JSON.stringify(formValue));
                                    deepClone.TimeEnd = value;
                                    setFormValue(deepClone);
                                }
                            }}
                        />
                        
                    </Form.Group>
                    <FlagActiveView 
                        accepter={Toggle} 
                        formValue={formValue}
                    />
                </Form >
            </>
        );
    };

    return (
        <>
            <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
                <Modal.Header>
                    {
                        (code && code != "") 
                            ? <Modal.Title>{_l('Edit StaffType')}</Modal.Title> 
                            : <Modal.Title>{_l('Create StaffType')}</Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>
                    {
                        body()
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        (!loading && !notFound) 
                            ? <Button appearance="primary" type="submit" onClick={handleSubmit}>{_l('Submit')}</Button> 
                            : <></>
                    }
                    <Button onClick={handleClose}>{_l('Cancel')}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

};