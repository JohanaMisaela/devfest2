import React, {useState, useEffect} from 'react'
import './post.css';
// import imgUser from '../../assets/user1.svg';
function PostItem() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/post`).then((res)=>{
          return res.json()
      }).then((data)=>{
        console.log(data)
        setData(data)
      })
    }, []);
  return (
    <div className="card my-4 mycard mx-auto" data-aos="fade-up">
    <div className="card-header">
        <div className="row">
            <div className="col-md-1 col-xs-5 mx-2">
                <a><img src="" alt="photo"/></a>
            </div>
            <div className="col-sm-10">
                <div className="name">
                    <a className="text-dark">RANDRIAMANANTENA Lovamanitra Mario</a>
                    <br/>
                    <a href="mailto: lovamanitramario@gmail.com" className="text-secondary text-decoration-none">lovamanitramario@gmail.com</a>
                </div>
            </div>
        </div>
    </div>
    <div className="card-body p-4">
        <h5 className="card-title">Reboisement(type de la publication)</h5>
        <p className="card-text">Ataovy ny reboisement fa tsara ny fiarovana ny ala sy izao tontolo izao raha te iaina fiainana milamina.</p>
        <img src="" alt="Raha misy sary de eto" />
    </div>
    <div className="text-center"><hr/></div>
    <div className="row comment px-4 text-center">
        <p className="btn btn-comment" > <i className="fa-thin fa-comments"></i> Show comments</p>
    </div>
</div>
  )
}

export default PostItem