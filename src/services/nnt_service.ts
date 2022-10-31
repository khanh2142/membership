import * as api from './helper'


const getAllBizType = async (code: string) => {
    return await api.post('api/GetAllBizType', {});
};

const search = async (params: {
    Ft_PageIndex: any,
    Ft_PageSize: any,
    OrgId?: any,
    Keyword?: any
    FlagActive?: any,

}) => {
    return await api.post('Mst_NNT/search', params);
};

const getByMST = async (code: string) => {
    return await api.post('Mst_NNT/GetByMST', { MST: code });
};

const update = async ({isNew, data} : {isNew?: boolean, data: any}) => {
    //create
    if (isNew) {
        let str = JSON.stringify(data);
        return await api.post('Mst_NNT/create', { strJson: str });
    }
    else {
        //update
        let str = JSON.stringify(data);
        return await api.post('Mst_NNT/update', { strJson: str });
    }
};

const remove = async (data: any) => {
    return await api.post('Mst_NNT/delete', data);
    // let str = JSON.stringify(data);
    // return await api.post('Mst_NNT/DeleteMultiple', { strJson: str });
};


export default { getAllBizType, search, getByMST, update, remove }