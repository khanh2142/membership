import * as api from './helper'

const search = async (params: {
    Ft_PageIndex: any,
    Ft_PageSize: any,
    OrgId?: any,
    Keyword?: any
    FlagActive?: any,

}) => {
    return await api.post('Mst_StaffType/search', params);
};

const getByCode = async (code: string) => {
    return await api.post('Mst_StaffType/GetByStaffType', { StaffType: code });
};

const update = async (data: any) => {
    //create
    if (!data.StaffType || data.StaffType == "") {
        data.isNew = true;
        let str = JSON.stringify(data);
        return await api.post('Mst_StaffType/create', { strJson: str });
    }
    else {
        //update
        let str = JSON.stringify(data);
        return await api.post('Mst_StaffType/update', { strJson: str });
    }
};

const remove = async (data: any) => {
    //return await api.post('Mst_StaffType/delete', data);
    let str = JSON.stringify(data);
    return await api.post('Mst_StaffType/DeleteMultiple', { strJson: str });
};


export default { search, getByCode, update, remove }