import * as api from './helper'

const search = async (params: {
    Ft_PageIndex: any,
    Ft_PageSize: any,
    OrgId?: any,
    Keyword?: any
    FlagActive?: any,

}) => {
    return await api.post('Mst_ResignReason/search', params);
};

const getByCode = async (code: string) => {
    return await api.post('Mst_ResignReason/GetByReasonID', { ReasonID: code });
};

const update = async (data: any) => {
    //create
    if (!data.ReasonID || data.ReasonID == "") {
        data.isNew = true;
        let str = JSON.stringify(data);
        return await api.post('Mst_ResignReason/create', { strJson: str });
    }
    else {
        //update
        let str = JSON.stringify(data);
        return await api.post('Mst_ResignReason/update', { strJson: str });
    }
};

const remove = async (data: any) => {
    //return await api.post('Mst_ResignReason/delete', data);
    let str = JSON.stringify(data);
    return await api.post('Mst_ResignReason/DeleteMultiple', { strJson: str });
};


export default { search, getByCode, update, remove }