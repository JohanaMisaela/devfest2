import React, { useState } from 'react'
import MaterialTable from 'material-table'
import '@material-ui/icons';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import reboisement from '../../../assets/reboisement-removebg-preview.png'
import nettoyage from '../../../assets/nettoyage-removebg-preview.png';
import triDechet from '../../../assets/triDechet-removebg-preview.png';
import recyclage from '../../../assets/recyclage-removebg-preview.png';
import './user.css';
import { NavLink } from 'react-router-dom';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
function Plainte_table() {
    const link = "http://localhost:5000/api/user/getUsers/"
    const [users, setUsers] = useState([])
    const [badge, setBadge] = useState()
    const getUsers = async () => {
        axios.get(link).then(
            res => {
                setUsers(res.data.users)
                console.log(res.data.users)
            }
        )

    }
    const openBadgePopup = async (idBadge) => {
        await axios.get(`http://localhost:5000/api/badge/${idBadge}`).then(
            res => {
                setBadge(res.data)
                console.log(res.data)
            }
        )
        Swal.fire({
            title: 'Badges 🤩',
            text: 'Voici la listes des badges de cet utilisateur',
            showCancelButton: true,
            showLoader: true,
            html:`<div className='badges shadow rounded'>
            <div className="text-center">
            <div className="row">
            <div className="col-lg-6">
            Reboisement
            <div className="row">
                <div className="col">
                <img className='img-icon' src=${reboisement} alt="reboisement" />
                </div>
                <div className="col nbr">${badge.reboisement}</div>
            </div>
            </div>
            <div className="col-lg-6">
            Trie Dechets
            <div className="row">
                <div className="col">
                <img className='img-icon' src=${triDechet} alt="triDechet" />
                </div>
                <div className="col nbr">${badge.trieDechet}</div>
            </div>
            </div>
            </div>
            <div className="row">
            <div className="col-lg-6">
            Nettoyage
            <div className="row">
                <div className="col">
                <img className='img-icon' src=${nettoyage} alt="nettoyage" />
                </div>
                <div className="col nbr">${badge.nettoyage}</div>
            </div>
            </div>
            <div className="col-lg-6">
            Recyclage
            <div className="row">
                <div className="col">
                <img className='img-icon' src=${recyclage} alt="recyclage" />
                </div>
                <div className="col nbr">${badge.recyclage}</div>
            </div>
            </div>
            </div>
            </div>
        </div>`
        })
    }
    // reboisement,
    // recyclage,
    // trieDechet,
    // nettoyage,
    useEffect(()=>{
        getUsers()
    },[])

    // "idBadge": [],
    //   "votes": [],
    //   "_id": "6382c4012648aae337a167b8",
    //   "name": "Ea error aut unde su",
    //   "firstname": "Culpa consequatur i",
    //   "age": 0,
    //   "email": "xyva@mailinator.com",
    //   "picture": "../../../frontend/public/images/profiles/noImage.png",
    //   "quartier": "Illum soluta ipsa ",
    //   "sexe": false,
    //   "status": false,
    //   "likes": [],
    //   "followed": [],
    //   "createdAt": "2022-11-27T01:57:21.497Z",
    //   "updatedAt": "2022-11-27T01:57:21.497Z",
    //   "__v": 0
    const colums = [
        { title: 'Nom', field: 'name' },
        { title: 'Prenom', field: 'firstname' },
        { title: 'Quartier', field: 'quartier' },
        { title: 'Genre', render:(rowData)=><div>{rowData.sexe ? "Homme" : "Femme"}</div> },
        { title: 'Age', field: 'age' },
        { title: 'Email', field: 'email' },
        { title: 'Votes', render:(rowData)=><div>{rowData.votes.length}</div> },
        // { title: 'Date', field: 'createdAt' },
      ]
    
      const data = [
        { nom: 'Gatera', date:'2022-11-11', quartier: 'Ambohimanarina', text: "Ny aty aminay dia maloto be fona isanandro", type: "Polution de la terre" },
        { nom: 'Mario', date:'2022-07-07', quartier: 'Antrano', text: "Tokony anary po ny olona fa maloto be", type: "Polution de l'air" }
      ]
        return (
            // reboisement,
            // recyclage,
            // trieDechet,
            // nettoyage,
            <>
            <div className="container" style={{ margin: "35px"}}>
                <div style={{ maxWidth: '100%' }}>
                    <MaterialTable
                    icons={tableIcons}
                        columns={colums}
                        data={users}
                        grouping={true}
                        title="Liste des users"
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
                                fontWeight: "bold"
                            },
                            cellStyle: { textAlign: 'center' },
                            filterCellStyle: {
                                textAlign: "center"
                            },
                        }}
                        detailPanel={[
                            {
                                tooltip: "Show Name",
                                render: (rowData) => {
                                    return (
                                        <div id='details'
                                            style={{
                                                fontSize: 25,
                                                color: "white",
                                                backgroundColor: "tranparent",
                                            }}
                                        >
                                            {
                                                rowData.idBadge && rowData.idBadge.length > 0 &&  <div><button id='button' onClick={()=>openBadgePopup(rowData.idBadge)} style={{ textDecoration: 'none', border: "none" }}><span className="btn btn-warning btn-sm"><i class="fa-regular fa-badge-sheriff"></i>Badge</span></button>{' '}<button><NavLink id='button' to={`/addBadge/${rowData.idBadge}`} style={{ textDecoration: 'none', border: "none" }}><span className="btn btn-warning btn-sm"><i class="fa-regular fa-badge-sheriff"></i>Attrib Badge</span></NavLink></button>{' '}</div>
                                            }
                                            {
                                                (!rowData.idBadge || rowData.idBadge.length === 0) &&  <div><button><NavLink id='button' to={`/attribBadge/${rowData._id}`} style={{ textDecoration: 'none', border: "none" }}><span className="btn btn-warning btn-sm"><i class="fa-regular fa-badge-sheriff"></i>Premier Badge</span></NavLink></button>{' '}</div>
                                            }
                                        </div>
                                    );
                                }
                            }
                        ]} />
                        </div>
            </div></>
          )
}

export default Plainte_table