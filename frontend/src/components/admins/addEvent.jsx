import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AddEvent = ()=> {

    const [event, setEvent] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { event, description };
          console.log(data.event);
          console.log(data.description);
          const res = await axios({
              method: 'POST',
              url: `http://localhost:5000/api/posts`,
              data: data,
            })
          console.log('data', res.data);
          console.log('status', res.status);
          if (res.status === 201 ){
            localStorage.setItem('id', JSON.stringify(res.data.data_id))
            Swal.fire({
              icon: 'success',
              title: 'Logged successfully',
              showConfirmButton: true,
            })
            navigate('/post');
          }
          if (res.status === 200 ) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              // text: 'Bad credentials!',
              text:res.data.message
            })
          }
        }
    return (
    <div>
        <div className="row">
            <div className="col-md-6">
                <h3>Pleinte</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="event">evenement</label>
                        <input type="text" value={event} onChange={(e) => setEvent(e.target.value)}/><br/>
                        <label htmlFor="descriptions" value={description} onChange={(e) => setDescription(e.target.value)}>Déscriptions evenement</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit event</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}

export default AddEvent;