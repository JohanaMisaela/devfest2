import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./complaint.css";

const Complaint = () => {
  const posterId = "6382213e58e9b3fb1c608228";
  const [type, setType] = useState("Pollution terrestre");
  const [text, setText] = useState("Tena tokony akaty aminay nareo");
  const [quartier, setQuartier] = useState("Ambohibao");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const complaints = {
      posterId,
      type,
      text,
      quartier,
    };
    console.log(complaints);
    await axios
      .post("http://localhost:5000/api/plainte", complaints)
      .then((res) => {
        Swal.fire("Added successfully", "Nice!!", "success");
        //   navigate('/complaints')
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "aaaaaaaaaaaaaah",
          text: "Une erreur est survenue",
        });
      });
  };
  return (
    <>
      <div className="mx-auto" style={{ width: "700px" }}>
        <form
          className="shadow p-3 mx-auto rounded"
          style={{ marginTop: "100px" }}
          onSubmit={handlesubmit}
        >
          <h2>Deposer une plainte</h2>
          <label>Type(pollution):</label>
          <select
            name="type"
            className="form-control"
            // multiple
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Pollution aerienne</option>
            <option>Pollution terrestre</option>
            <option>Pollution maritime</option>
          </select>
          <label>Description:</label>
          <input
            type="text"
            required
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label>Quartier:</label>
          <select
            name="quartier"
            // multiple
            id="quartier"
            className="form-control"
            value={quartier}
            onChange={(e) => setQuartier(e.target.value)}
          >
            <option>Ambohimanarina</option>
            <option>Andranomena</option>
            <option>Ambohibao</option>
          </select>
          <div className="text-center mt-2">
            <button className="btn btn-outline-dark">Ajouter</button>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="mx-2 btn"
            >
              <AiOutlineArrowLeft />
              Retour
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Complaint;
