import * as api from './helper'

const search_staff = async (params: {

    Ft_PageIndex: any,
    Ft_PageSize: any,
    OrgId?: any,
    DepartmentCode?: any,
    StaffType?: any,
    StaffStatus?: any,
    Keyword?: any

}) => {


    return await api.post('Staff_Staff/Search', params);


    
};

export default { search_staff }