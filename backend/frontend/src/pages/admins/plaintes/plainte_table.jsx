import React, { useState } from "react";
import MaterialTable from "material-table";
import "@material-ui/icons";
import { useEffect } from "react";
import axios from "axios";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { useDispatch, useSelector } from "react-redux";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function Plainte_table() {
  const link = "http://localhost:5000/api/plainte/";
  const userLink = "http://localhost:5000/api/user/getUsers";
  const [loadingPlaintes, setLoadingPlaintes] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [plaintes, setPlaintes] = useState([]);
  const getPlainte = async () => {
    axios.get(link).then((res) => {
      setPlaintes(res.data.plaintes);
      console.log(res.data.plaintes);
    });
  };
  const getUsers = async () => {
    axios.get(userLink).then((res) => {
      setUsers(res.data.users);
      console.log(res.data.users);
    });
  };

  useEffect(() => {
    setLoadingUsers(true)    
    setLoadingPlaintes(true)

    setTimeout(() => {
      getUsers();
    }, 2000);
        
    setTimeout(() => {
      getPlainte();
    }, 2000);
  }, []);

  const colums = [
    { title: "Nom", render:(rowData)=> 
    <div>{users.filter(user => user._id === rowData.posterId)[0].name}</div> , 
    customFilterAndSearch: (value, rowData) => 
    {
      return true; // customize here according your search algorithm.
    }},
    { title: "Quartier", field: "quartier" },
    { title: "Informations", field: "text" },
    // { title: "Type", field: "type" },
    { title: "Vote", render:(rowData)=><div>{rowData.voters.length}</div>,
     customFilterAndSearch: (value, rowData) => {
      return true; // customize here according your search algorithm.
   } },
    { title: "Date", field: "createdAt" },
  ];

  // const data = [
  //   {
  //     nom: "Gatera",
  //     date: "2022-11-11",
  //     quartier: "Ambohimanarina",
  //     text: "Ny aty aminay dia maloto be fona isanandro",
  //     // type: "Polution de la terre",
  //   },
  //   {
  //     nom: "Mario",
  //     date: "2022-07-07",
  //     quartier: "Antrano",
  //     text: "Tokony anary po ny olona fa maloto be",
  //     // type: "Polution de l'air",
  //   },
  // ];
  return (
    <div className="container p-3">
      <br/>
      
      <div style={{ margin: "35px"}} className="p-3">
      {
          (plaintes.length>0 && users.length>0 ) &&
        <MaterialTable
          columns={colums}
          data={plaintes}
          icons={tableIcons}
          grouping={true}
          title="Liste des plaintes"
          options={{
            paging: true,
            pageSize: 10,
            grouping: true,
            pageSizeOptions: 10,
            filtering: true,
            exportButton: true,
            headerStyle: {
              backgroundColor: "#094b65",
              color: "#FFF",
              fontSize: "17px",
              textAlign: "center",
              fontWeight: "bold",
            },
            cellStyle: { textAlign: "center" },
            filterCellStyle: {
              textAlign: "center",
            },
          }}
        />
        
        }
        {
          plaintes.length === 0  && 'Loading...'
        }
      </div>
      <a  href="complaints/add">Ajouter</a>
    </div>
  );
}

export default Plainte_table;
