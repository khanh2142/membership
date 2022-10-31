import { ShowError } from "components/Dialogs/Dialogs";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Form, Input, Modal, Button, Schema, SelectPicker, Loader, Placeholder, Toggle } from "rsuite";
import general_master_service from "services/general_master_service";
import worklocation_service from "services/worklocation_service";
import store from 'store/store';
import { toast } from 'react-toastify';
import { useLocalization } from "hooks/useLocalization";
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const nameRule = Schema.Types.StringType().isRequired('This field is required.');

export default function WorkLocationEdit({ code, onSuccess, uuid }: { code: string, onSuccess: any, uuid: any }) {

    const _l = useLocalization('WorkLocationList');
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const { NetworkId, OrgId } = store.getState().orgInfo;

    const defaultFormValue: any = {
        "LocationCode": "",
        "NetworkID": NetworkId,
        "OrgID": OrgId,
        "LocationName": "",
        "GPSLat": "",
        "GPSLong": "",
        "GPSLat_Long": "",
        "Remark": "",
        "FlagActive": "1",
        "IsActive": true
    };

    const [formValue, setFormValue] = React.useState(defaultFormValue);
    const [nntList, setNNTList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const formRef: any = React.useRef();

    const loadWorkLocationDetail = async () => {
        //edit
        if (code && code != '') {
            let resp = await worklocation_service.getByCode(code);
            if (resp.Success) {
                let data = resp.Data;
                if (data != null) {
                    setFormValue({
                        "LocationCode": data.LocationCode,
                        "NetworkID": data.NetworkID,
                        "OrgID": data.OrgID,
                        "LocationName": data.LocationName,
                        "GPSLat": data.GPSLat,
                        "GPSLong": data.GPSLong,
                        "GPSLat_Long": data.GPSLat + ', ' + data.GPSLong,
                        "Remark": data.Remark,
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
            if (resp.Data != null){
                setNNTList(resp.Data);
            }
        }
        else {
            ShowError(resp.ErrorData);
        }
    };

    const loadData = async () => {
        setLoading(true);
        await loadWorkLocationDetail();
        await loadNNTList();
        setLoading(false);
    };

    useEffect(() => {
        setOpen(true);
        loadData();

    }, [code, uuid]);

    const validateLatLng = (lat: any, lng: any) => {
        let ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
        let ck_lng = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

        var validLat = ck_lat.test(lat);
        var validLng = ck_lng.test(lng);
        if (validLat && validLng) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = () => {
        if (!formRef.current || !formRef.current.check) return;
        if (!formRef.current.check()) {
            console.error('Form Error');
            return;
        }
        var GPSLat_LongArr = formValue.GPSLat_Long.trim().split(',');
        if(GPSLat_LongArr != null && GPSLat_LongArr.length > 0 && GPSLat_LongArr.length == 2){
            var gPSLat = GPSLat_LongArr[0].trim();
            var gPSLong = GPSLat_LongArr[1].trim();
            var validateGPSLat_Long = validateLatLng(gPSLat, gPSLong);
            if(!validateGPSLat_Long){
                console.error('GPSLat - GPSLong Error');
                return;
            }
            else{
                formValue.GPSLat = gPSLat;
                formValue.GPSLong = gPSLong;
            }
        }
        else{
            console.error('Form Error');
            return;
        }

        let data: any = JSON.parse(JSON.stringify(formValue));
        data.FlagActive = data.IsActive ? "1" : "0";
        data.IsActive = undefined;

        worklocation_service.update(data).then(resp => {
            if (resp.Success) {
                handleClose();
                onSuccess();
                toast.success(_l('WorkLocation data updated'));
            }
            else {
                ShowError(resp.ErrorData);
            }
        });
    };

    const FlagActiveView = ({accepter, formValue }: {accepter: any, formValue: any }) => {
        if (formValue.LocationCode && formValue.LocationCode !== ""){
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
                        <Form.ControlLabel>{_l('OrgID')}</Form.ControlLabel>
                        <Form.Control 
                            name="OrgID"
                            style={{ width: '100%' }}
                            labelKey='NNTFullName'
                            valueKey='OrgID'
                            accepter={SelectPicker} data={nntList} 
                        />
                    </Form.Group >
                    <Form.Group controlId="name-9" >
                        <Form.ControlLabel>{_l('LocationName')}</Form.ControlLabel>
                        <Form.Control name="LocationName" rule={nameRule} />
                    </Form.Group >
                    <Form.Group controlId="name-9" >
                        <Form.ControlLabel>{_l('GPSLat_Long')}</Form.ControlLabel>
                        <Form.Control name="GPSLat_Long" rule={nameRule} />
                    </Form.Group >
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
                            ? <Modal.Title>{_l('Edit WorkLocation')}</Modal.Title> 
                            : <Modal.Title>{_l('Create WorkLocation')}</Modal.Title>
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