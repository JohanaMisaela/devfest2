import React from 'react'
import MaterialTable from 'material-table'
import '@material-ui/icons';
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
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

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
function Events_table() {
  const link = "http://localhost:5000/api/post/"

  const [events, setEvents] = useState([])
    const getEvent = async () => {
        axios.get(link).then(
            res =>  {
                setEvents(res.data.post.filter(post => post.isEvent))
                console.log(res.data.post.filter(post => post.isEvent))
            }
        )

    }
    useEffect(()=>{
        getEvent()
    },[])
  const colums = [
    // { title: 'Date', field: 'date' },
    { title: 'Quartier', field: 'quartier' },
    { title: 'Informations', field: 'text'},
    { title: 'Type', field: 'type' }
  ]

  const data = [
    { date: '2022-11-11', quartier: 'Ambohimanarina', text: "Ny atao dia andeha akany andafy de iaina fiainanan milamina apres le reboisements", type: "Reboisement" },
    { date: '2022-11-12', quartier: 'Antrano', text: "Ario ny fako", type: "Fanarimpakp" }
  ]

  //Ajout
  const ajout = async (addedData) => {
    await axios({
      method: "post",
      url: link,
      data: addedData
    })
    .then(res=>{
      console.log(res.status)
      if(res.status === 201){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'added successfully'
        })
      }
      else if(!res.data.err === 1) {
        console.log(res.data.error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Veuillez bien remplir le formulaire!'
      })
      }
    })
    .catch(err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Une erreur s\'est produite. Verifier votre serveur!'
    })
    })
  }
//Udate
const update = async (rowData, id) => {
  const update = await axios.put(`${link}${id}`, rowData)
  if(update.data.error !== null){
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Mis à jour avec succès'
    })
  }  
  else if(update.data.error){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${update.data.error}` 
    })
  } 
}
  //Supprimer
  const supprimer = async(id) => {
    Swal.fire({
      title: "Attention",
      text: "Etes-vous sûr de vouloir supprimer cette evenement",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then( async function (isOkay) {
          if (isOkay) {
              const suppr = await axios.delete(`${link}${id}`,{id})
              if(suppr.status === 200){
                Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: 'L\'evenement a été supprimé avec succès'
              })
              const newRowData = events.filter(elm => elm._id !== id)
              setEvents(newRowData)
              }  else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Une erreur s\'est produite. Verifier votre serveur!'
                })
            } 
          }
      });
        return false;
  }
    return (
        <div style={{ maxWidth: '100%' }}>
<div className="" style={{ margin: "35px"}}>
          <MaterialTable
            columns={colums}
            data={events}
                    icons={tableIcons}
                    grouping={true}
            title="Liste des evenements"
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const data = {
                      nom: newData.nom,
                      prenom: newData.prenom,
                      genre: newData.genre,
                      mail: newData.mail,
                      contact: newData.contact,
                      dateDeNaissance: newData.dateDeNaissance,
                      adresse: newData.adresse,
                      photo:newData.photo,
                      default_pass:newData.default_pass
                  }
                    delete newData['tableData']
                    console.log(data)
                    setEvents([...events, data]);
                    ajout(data)
                    resolve();
                  }, 1000)
                }),
                
                onRowUpdate: (newData, oldData) => {
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataUpdate = [...events];
                      // In dataUpdate, find target
                      const target = dataUpdate.find(
                        (el) => el._id === oldData._id
                      );
                      const index = dataUpdate.indexOf(target);
                      dataUpdate[index] = newData;
                      setEvents([...dataUpdate]);
                      update(newData, oldData._id)
                      resolve();
                    }, 1000);
                  });
                }  
            }}
            options={{
              paging:true,
              pageSize:10,
              grouping:true,
              pageSizeOptions:10,
              filtering: true,
              exportButton: true,
              headerStyle: {
                backgroundColor: "#094b65",
                color: "#FFF",
                fontSize: "17px",
                textAlign: "center",
                fontWeight: "bold"
              },
              cellStyle: {textAlign:'center'},
              filterCellStyle: {
                textAlign: "center"},
              }}
              actions={[
                {
                  icon: tableIcons.Delete,  
                  tooltip: "Supprimer",
                  onClick: (event, rowData) => supprimer(rowData._id)
                }
              ]}
          />
        </div></div>
      )
}

export default Events_table;