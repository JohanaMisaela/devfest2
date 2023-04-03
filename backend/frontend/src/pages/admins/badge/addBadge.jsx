import React,{ useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useEffect } from "react";
// import "./complaint.css";
import { AirlineSeatIndividualSuiteRounded } from "@material-ui/icons";
import { useRef } from "react";


const AddBadge = () => {
    const reboisement = useRef(null);
    const recyclage = useRef(null);
    const trieDechet = useRef(null);
    const nettoyage = useRef(null);
    const [dataBadge, setDataBadge] = useState([]);
    
    const [user, setUser] = useState();
    const navigate = useNavigate()
  const {id} = useParams();
  const geBadge = () => {
    axios.get(`http://localhost:5000/api/badge/${id}`)
     .then(res => setDataBadge(res.data))
    .catch(err => console.log(err));
  } 
  
  useEffect(() => {
    geBadge()
  },[])
    const handlesubmit = async(e) => {
        e.preventDefault();
        const badge = {
            reboisement: reboisement.current.value,
            recyclage: recyclage.current.value,
            trieDechet: trieDechet.current.value,
            nettoyage: nettoyage.current.value,
        };
        console.log(badge)
        const res = await axios.put(`http://localhost:5000/api/badge/${id}`, badge)
        .then((res)=>{
          Swal.fire(
            'Added successfully',
            'Nice!!',
            'success'
          )
        //   navigate('/badge')
        })
        .catch((err)=>{
          Swal.fire({
            icon: 'error',
            title: 'aaaaaaaaaaaaaah',
            recyclage: 'Une erreur est survenue',
          })
        })
    }
  return (
    <><div className="mx-auto" style={{width: "700px"}}>
          <form className="shadow p-3 mx-auto post-form rounded" style={{ marginTop: '100px' }} onSubmit={handlesubmit}>
              {/* <h2>Creation d'une badge({user.firstname})</h2> */}
              <label>Reboisement:</label>
              <input
                  style={{ width: "30px"}}
                  type="number"
                  name="reboisement"
                  className="post-form"
                  defaultValue={dataBadge.reboisement}
                  ref={reboisement} />
              <label>Recyclage:</label>
              <input
                  type="number"
                  name="recyclage"
                  // className="form-control"
                  defaultValue={dataBadge.recyclage}
                  ref={recyclage}
                 />
              <label>Trie dechet:</label>
              <input
                  type="number"
                  name="trieDechet"
                  className="form-control"
                  defaultValue={dataBadge.trieDechet}
                  ref={trieDechet} />
              <label>Nettoyage:</label>
              <input
                  type="number"
                  name="nettoyage"
                  className="form-control"
                  defaultValue={dataBadge.nettoyage}
                  ref={nettoyage}/>
              <div className="text-center mt-2">
              <button className="btn btn-outline-dark">Ajouter</button>
              <button onClick={() => { navigate('/users'); } } className="mx-2 btn"><AiOutlineArrowLeft />Retour</button>
              </div>
          </form>
      </div></>
  )
}

export default AddBadge;