import { ShowError } from "components/Dialogs/Dialogs";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Form, Input, Modal, Button, Schema, SelectPicker, Loader, Placeholder, Toggle } from "rsuite";
import general_master_service from "services/general_master_service";
import contracttype_service from "services/contracttype_service";
import store from 'store/store';
import { toast } from 'react-toastify';
import { useLocalization } from "hooks/useLocalization";
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const nameRule = Schema.Types.StringType().isRequired('This field is required.');

export default function ContractTypeEdit({ code, onSuccess, uuid }: { code: string, onSuccess: any, uuid: any }) {

    const _l = useLocalization('ContractTypeList');
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const { NetworkId, OrgId } = store.getState().orgInfo;

    const defaultFormValue: any = {
        "ContractTypeCode": "",
        "NetworkID": NetworkId,
        "OrgID": OrgId,
        "ContractTypeName": "",
        "ContractTypeDesc": "",
        "Remark": "",
        "FlagActive": "1",
        "IsActive": true
    };

    const [formValue, setFormValue] = React.useState(defaultFormValue);
    const [nntList, setNNTList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const formRef: any = React.useRef();

    const loadContractTypeDetail = async () => {
        //edit
        if (code && code != '') {
            let resp = await contracttype_service.getByCode(code);
            if (resp.Success) {
                let data = resp.Data;
                if (data != null) {
                    setFormValue({
                        "ContractTypeCode": data.ContractTypeCode,
                        "NetworkID": data.NetworkID,
                        "OrgID": data.OrgID,
                        "ContractTypeName": data.ContractTypeName,
                        "ContractTypeDesc": data.ContractTypeDesc,
                        "Remark": data.Remark,
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
        await loadContractTypeDetail();
        await loadNNTList();
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

        let data: any = JSON.parse(JSON.stringify(formValue));
        data.FlagActive = data.IsActive ? "1" : "0";
        data.IsActive = undefined;

        contracttype_service.update(data).then(resp => {

            if (resp.Success) {
                handleClose();
                onSuccess();
                toast.success(_l('Contract type data updated'));

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
        return (
            <>
                <Form fluid onChange={setFormValue} formValue={formValue} ref={formRef}>
                <Form.Group controlId="name-9" >
                    <Form.ControlLabel>{_l('OrgID')}</Form.ControlLabel>
                    <Form.Control name="OrgID"
                        style={{ width: '100%' }}
                        labelKey='NNTFullName'
                        valueKey='OrgID'
                        accepter={SelectPicker} data={nntList} />
                </Form.Group >
                    <Form.Group controlId="name-9" >
                        <Form.ControlLabel>{_l('ContractTypeName')}</Form.ControlLabel>
                        <Form.Control name="ContractTypeName" rule={nameRule} />
                    </Form.Group >
                    <Form.Group controlId="textarea-9">
                        <Form.ControlLabel>{_l('ContractTypeDesc')}</Form.ControlLabel>
                        <Form.Control rows={2} name="ContractTypeDesc" accepter={Textarea} />
                    </Form.Group>
                    <FlagActiveItem 
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
                        ? <Modal.Title>{_l('Edit Contract type')}</Modal.Title> 
                        : <Modal.Title>{_l('Create Contract type')}</Modal.Title>
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