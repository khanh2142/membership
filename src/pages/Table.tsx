import React, { useState, useEffect, useMemo, useRef } from "react";
import Table from 'components/table/TableDynamic'
import { v4 as uuidv4 } from 'uuid';
import Popup from "pages/Popup";
import * as testservice from 'services/testdata_service';
import { useLocalization } from "hooks/useLocalization";
import Confirm from "components/Dialogs/Confirm";
import { useNavigate } from "react-router-dom";
import { Container } from "rsuite";
import Sidemenu from "components/SideMenu/SideMenuGeneral";
const Page = () => {

  const navigate = useNavigate();
  const _t = useLocalization("Table");

  const refTableReload: { current: any } = useRef(null);

  const [currentDetailCode, setCurrentDetailCode] = useState((<></>));



  const openTutorial = (rowIdx: number) => {
    setCurrentDetailCode(<Popup itemIndex={rowIdx} uuid={uuidv4()}></Popup>);

  };
  const retrieveTutorials = async (params: any) => {
    return await testservice.getTable(params);

  };


  const columns = useMemo(
    () => [
      {
        Header: "Col1",
        accessor: "col1",
        Cell: (props: any) => {

          const row = props.row.original;

          return (<span onClick={() => {
            navigate(`/${row.idx}`)

          }}>
            {row.col1}
          </span>);
        }
      },
      {
        Header: "Col2",
        accessor: "col2",
      },
      {
        Header: "Col3",
        accessor: "col3",

      },
      {
        Header: "Col4",
        accessor: "col4",
      },
      {
        Header: "Col5",
        accessor: "col5",
        disableSortBy: true
      },
      {
        Header: "Col7",
        accessor: "col7",
        disableSortBy: true

      },
      {
        Header: "Col8",
        accessor: "col8",
        disableSortBy: false,
      },
      {
        Header: "Col9",
        accessor: "col9",
        canSort: false,
      },
      {
        Header: _t("Col10"),
        accessor: "col10",
        canSort: false,

      },
      {
        Header: _t("Actions"),
        accessor: "actions",
        Cell: (props: any) => {
          //const rowIdx = props.row.id;
          const rowIdx = props.row.original.idx;
          return (
            <div>
              <span onClick={() => openTutorial(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => {

                Confirm({
                  "title": "Delete Row",
                  "message": _t("Are you sure?"),
                  yes: function () {
                    if (refTableReload.current)
                      refTableReload.current();

                  }

                });



              }}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
  


  useEffect(() => {

    console.log('table useEffect');
  }, []);

  return (
    <>

      <Container>
        <Table funcReloadRef={refTableReload} columnData={columns} funcFetchData={async (params: any) => {
          return await retrieveTutorials(params);
        }} />
      </Container>
      <div>
        {currentDetailCode}
      </div>
    </>
  );
};

export default Page;
