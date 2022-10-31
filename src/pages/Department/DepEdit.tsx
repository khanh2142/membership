import { ShowError } from "components/Dialogs/Dialogs";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Form, Input, Modal, Button, Schema, SelectPicker, Loader, Placeholder, Toggle } from "rsuite";
import department_service from "services/department_service";
import store from 'store/store';
import { toast } from 'react-toastify';
import { useLocalization } from "hooks/useLocalization";
//import { nameRule } from "utils/ValidationRules";
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const nameRule = Schema.Types.StringType().isRequired('This field is required.');



export default function DepEdit({ code, onSuccess, uuid }: { code: string, onSuccess: any, uuid:any }) {

    const _l = useLocalization('DeparmentList');
    const [open, setOpen] = useState(false);
    const { NetworkId, OrgId } = store.getState().orgInfo;
    const handleClose = () => setOpen(false);

    const defaultFormValue: any = {
        "DepartmentCode": "",
        "NetworkID": NetworkId,
        "DepartmentCodeParent": "",
        "OrgID": OrgId,
        "MST": "All",
        "DepartmentName": "",
        "DepartmentDesc": "",
        "FlagActive": "1",
        "IsActive": true
    };

    const [formValue, setFormValue] = React.useState(defaultFormValue);
    const [depList, setDepList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const formRef: any = React.useRef();

    const loadDepDetail = async () => {
        //edit
        if (code && code != '') {
            let resp = await department_service.getByCode(code);
            if (resp.Success) {
                let data = resp.Data;
                if (data != null) {
                    setFormValue({
                        "DepartmentCode": data.DepartmentCode,
                        "NetworkID": data.NetworkID,
                        "DepartmentCodeParent": data.DepartmentCodeParent,
                        "OrgID": data.OrgID,
                        "MST": data.MST,
                        "DepartmentName": data.DepartmentName,
                        "DepartmentDesc": data.DepartmentDesc,
                        "FlagActive": data.FlagActive,
                        "IsActive": data.FlagActive == "1" ? true : false,
                    })
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

    const loadDepParents = async () => {
        let resp = await department_service.getAllActive();
        if (resp.Success) {
            if (resp.Data != null) {
                setDepList(resp.Data);
            }
        }
        else {
            ShowError(resp.ErrorData);
        }
    };

    const loadData = async () => {
        setLoading(true);
        await loadDepDetail();
        await loadDepParents();
        setLoading(false);
    }

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
        //console.log(formValue, 'Form Value');
        let data: any = JSON.parse(JSON.stringify(formValue));
        data.FlagActive = data.IsActive ? "1" : "0";
        data.IsActive = undefined;

        department_service.update(data).then(resp => {
            if (resp.Success) {
                handleClose();
                onSuccess();
                toast.success('Department data updated');
            }
            else {
                ShowError(resp.ErrorData);
            }
        });
    };

    const FlagActiveItem = ({accepter, formValue }: {accepter: any, formValue: any }) => {
        if (formValue.ContractTypeCode && formValue.ContractTypeCode !== ""){
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
        return <>
            <Form fluid onChange={setFormValue} formValue={formValue} ref={formRef}>
                <Form.Group controlId="name-9" >
                    <Form.ControlLabel>{_l('DepartmentName')}</Form.ControlLabel>
                    <Form.Control name="DepartmentName" rule={nameRule} />
                </Form.Group >

                <Form.Group controlId="name-9" >
                    <Form.ControlLabel>{_l('DepartmentCodeParent')}</Form.ControlLabel>
                    <Form.Control name="DepartmentCodeParent"
                        style={{ width: '100%' }}
                        labelKey='DepartmentName'
                        valueKey='DepartmentCode'
                        accepter={SelectPicker} data={depList} />
                </Form.Group >
                <Form.Group controlId="textarea-9">
                    <Form.ControlLabel>{_l('DepartmentDesc')}</Form.ControlLabel>
                    <Form.Control rows={2} name="DepartmentDesc" accepter={Textarea} />
                </Form.Group>
                <FlagActiveItem 
                        accepter={Toggle} 
                        formValue={formValue}
                    />
            </Form >
        </>
    };

    return (
        <>
        <Modal backdrop="static" role="alertdialog" open={open} onClose={ handleClose} size="xs">
            <Modal.Header>
                {
                    (code && code != "") 
                        ? <Modal.Title>{_l('Edit Department')}</Modal.Title> 
                        : <Modal.Title>{_l('Create Department')}</Modal.Title>
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
    </>);


}