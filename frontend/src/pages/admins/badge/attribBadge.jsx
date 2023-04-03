import React,{ useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useEffect } from "react";
// import "./complaint.css";
import { AirlineSeatIndividualSuiteRounded } from "@material-ui/icons";


const AttribBadge = () => {
    const [reboisement, setReboisement] = useState(null);
    const [recyclage, setRecyclage] = useState(null);
    const [trieDechet, setTrieDechet] = useState(null);
    const [nettoyage, setNettoyage] = useState(null);
    const [user, setUser] = useState();
    const navigate = useNavigate()
  const {id} = useParams();
  const getUser = () => {
    axios.get(`http://localhost:5000/api/user/getUser/${id}`)   
     .then(res => console.log(res.data))
    .catch(err => console.log(err));
  } 
  
  useEffect(() => {
    getUser()
  },[])
    const handlesubmit = async(e) => {
        e.preventDefault();
        const badge = {
            idUser:id,
            reboisement,
            recyclage,
            trieDechet,
            nettoyage,
        };
        console.log(badge)
        const res = await axios.post('http://localhost:5000/api/badge', badge)
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
          <form className="shadow p-3 mx-auto rounded" style={{ marginTop: '100px' }} onSubmit={handlesubmit}>
              {/* <h2>Creation d'une badge({user.firstname})</h2> */}
              <label>Reboisement:</label>
              <input
                  type="number"
                  name="reboisement"
                  className="form-control"
                  value={reboisement}
                  onChange={(e) => setReboisement(e.target.value)} />
              <label>Recyclage:</label>
              <input
                  type="number"
                  name="recyclage"
                  className="form-control"
                  value={recyclage}
                  onChange={(e) => setRecyclage(e.target.value)} />
              <label>Trie dechet:</label>
              <input
                  type="number"
                  name="trieDechet"
                  className="form-control"
                  value={trieDechet}
                  onChange={(e) => setTrieDechet(e.target.value)} />
              <label>Nettoyage:</label>
              <input
                  type="number"
                  name="nettoyage"
                  className="form-control"
                  value={nettoyage}
                  onChange={(e) => setNettoyage(e.target.value)} />
              <div className="text-center mt-2">
              <button className="btn btn-outline-dark">Ajouter</button>
              <button onClick={() => { navigate('/users'); } } className="mx-2 btn"><AiOutlineArrowLeft />Retour</button>
              </div>
          </form>
      </div></>
  )
}

export default AttribBadge;