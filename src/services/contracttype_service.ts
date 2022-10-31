import * as api from './helper'

const search = async (params: {
    Ft_PageIndex: any,
    Ft_PageSize: any,
    OrgId?: any,
    Keyword?: any
    FlagActive?: any,

}) => {
    return await api.post('Mst_ContractType/search', params);
};

const getByCode = async (code: string) => {
    return await api.post('Mst_ContractType/GetByContractTypeCode', { ContractTypeCode: code });
};

const update = async (data: any) => {
    //create
    if (!data.ContractTypeCode || data.ContractTypeCode == "") {
        data.isNew = true;
        let str = JSON.stringify(data);
        return await api.post('Mst_ContractType/create', { strJson: str });
    }
    else {
        //update
        let str = JSON.stringify(data);
        return await api.post('Mst_ContractType/update', { strJson: str });
    }
};

const remove = async (data: any) => {
    //return await api.post('Mst_ContractType/delete', data);
    let str = JSON.stringify(data);
    return await api.post('Mst_ContractType/DeleteMultiple', { strJson: str });
};


export default { search, getByCode, update, remove }