import * as api from './helper'
const ccsDomain: string = `${process.env.REACT_APP_CCS_BASE_URL}`;
const getTable = async (params: any) => {


    let resp = await api.post(`${ccsDomain}/api/test/table`, params);

    if (resp.Success) {

        return resp.Data;

    }

    throw Error(resp.ErrorMessage);
};

export {getTable}