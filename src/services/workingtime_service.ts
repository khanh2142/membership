import * as api from './helper'

const search = async (params: {
    Ft_PageIndex: any,
    Ft_PageSize: any,
    OrgId?: any,
    Keyword?: any
    FlagActive?: any,

}) => {
    return await api.post('Mst_WorkingTime/search', params);
};

const getByCode = async (code: string) => {
    return await api.post('Mst_WorkingTime/GetByWorkingTimeCode', { WorkingTimeCode: code });
};

const update = async ({isNew, data} : {isNew?: boolean, data: any}) => {
    //create
    if (isNew) {
        let str = JSON.stringify(data);
        return await api.post('Mst_WorkingTime/create', { strJson: str });
    }
    else {
        //update
        let str = JSON.stringify(data);
        return await api.post('Mst_WorkingTime/update', { strJson: str });
    }
};

const remove = async (data: any) => {
    //return await api.post('Mst_WorkingTime/delete', data);
    let str = JSON.stringify(data);
    return await api.post('Mst_WorkingTime/DeleteMultiple', { strJson: str });
};


export default { search, getByCode, update, remove }