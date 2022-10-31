import * as api from './helper'

const search = async (params: {
    Ft_PageIndex: any,
    Ft_PageSize: any,
    OrgId?: any,
    Keyword?: any
    FlagActive?: any,

}) => {
    return await api.post('Mst_WorkLocation/search', params);
};

const getByCode = async (code: string) => {
    return await api.post('Mst_WorkLocation/GetByLocationCode', { LocationCode: code });
};

const update = async (data: any) => {
    //create
    if (!data.LocationCode || data.LocationCode == "") {
        data.isNew = true;
        let str = JSON.stringify(data);
        return await api.post('Mst_WorkLocation/create', { strJson: str });
    }
    else {
        //update
        let str = JSON.stringify(data);
        return await api.post('Mst_WorkLocation/update', { strJson: str });
    }
};

const remove = async (data: any) => {
    //return await api.post('Mst_WorkLocation/delete', data);
    let str = JSON.stringify(data);
    return await api.post('Mst_WorkLocation/DeleteMultiple', { strJson: str });
};


export default { search, getByCode, update, remove }