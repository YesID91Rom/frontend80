import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import SidebarContainer from "../../Componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";
import swal from "sweetalert";

const AgregarProveedores = () => {

    const navigate = useNavigate();

    const [proveedores, setProveedores] = useState({
        nombreProveedor: '', 
        correo:'', 
        numeroContacto:'', 
        nit:'', 
        direccion:'', 
        pais:''
    });

    const {nombreProveedor, correo, numeroContacto, nit, direccion, pais} = proveedores

    const Onchange = (e) => {
        setProveedores({
          ...proveedores,
          [e.target.name]: e.target.value,
        });
      };
    
      useEffect(() => {
        document.getElementById("nombreProveedor").focus();
      }, [])
    
      const CrearProveedores = async () =>{
        const data = {
            nombreProveedor: proveedores.nombreProveedor,
            correo: proveedores.correo,
            numeroContacto: proveedores.numeroContacto,
            nit: proveedores.nit,
            direccion: proveedores.direccion,
            pais: proveedores.pais
        }
        const response = await APIInvoke.invokePOST('/api/proveedores', data);
        const idProveedores = response._id;

        if (idProveedores === '') {
            const msg = 'Hubo un error al agregar un proveedor';
            swal({
              title: 'error',
              text: msg,
              icon: 'error',
              buttons: {
                confirm: {
                  text: 'ok',
                  value: true,
                  visible: true,
                  className: 'btn btn-danger',
                  closeModal: true
                },
              },
            });        
    }else{
        navigate("/proveedores");
   
    const msg ="El proveedor fue creado con exito";
    swal({
      title: "informacion",
      text: msg,
      icon: "success",
      buttons: {
        confirm: {
          text: "ok",
          value: true,
          visible: true,
          className: "btn btn-primary",
          closeModal: true,
        },
        },
      });
      setProveedores({nombreProveedor:'', correo:'', numeroContacto:'', nit:'', direccion:'', pais:''});
}
}
const Onsubmit =(e) =>{
    e.preventDefault();
CrearProveedores();
}
return (
    <div className="wrapper">
    <Navbar></Navbar>
    <SidebarContainer></SidebarContainer>
    <div className="content-wrapper">

      <ContentHeader
        titulo={"Proyecto Final"}
        breadCrumb1={"Inicio"}
        breadCrumb2={"Dashboard"}
        ruta1={"/home"}
      />
      <section className='content'>
          <div className='card'>
              <div className='card-header'>
                  <div className='card-tools'>
                      <button type="button" className='btn btn-tool' data-card-widget="collapse" title="collapse">
                          <i className='fas fa-minus'></i>
                      </button>
                      <button type="button" className='btn btn-tool' data-card-widget="remove" title="remove">
                          <i className='fas fa-times'></i>
                      </button>
                  </div>
              </div>
              <div className='card-body'>

              <form onSubmit={Onsubmit}>

              <div className='card-body'>
              <div className='form-group'>
                <label htmlFor='nombre'>Nombre Proveedor</label>
                <input type="text"
                  className="form-control"
                  placeholder="Ingrese el nombre del Proveedor"
                  id="nombreProveedor"
                  name="nombreProveedor"
                  value={nombreProveedor}
                  onChange={Onchange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              </div>

              <div className='card-body'>
              <div className='form-group'>
                <label htmlFor='correo'>Correo</label>
                <input type="email"
                  className="form-control"
                  placeholder="Ingrese su correo"
                  id="correo"
                  name="correo"
                  value={correo}
                  onChange={Onchange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              </div>

              <div className='card-body'>
              <div className='form-group'>
                <label htmlFor='telefono'>Telefono</label>
                <input type="text"
                  className="form-control"
                  placeholder="Ingrese su numero de Telefono"
                  id="numeroContacto"
                  name="numeroContacto"
                  value={numeroContacto}
                  onChange={Onchange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              </div>

              <div className='card-body'>
              <div className='form-group'>
                <label htmlFor='nit'>NIT</label>
                <input type="text"
                  className="form-control"
                  placeholder="Ingrese el Nit"
                  id="nit"
                  name="nit"
                  value={nit}
                  onChange={Onchange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              </div>

              <div className='card-body'>
              <div className='form-group'>
                <label htmlFor='direccion'>Direccion</label>
                <input type="text"
                  className="form-control"
                  placeholder="Ingrese su Direccion"
                  id="direccion"
                  name="direccion"
                  value={direccion}
                  onChange={Onchange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              </div>

              <div className='card-body'>
              <div className='form-group'>
                <label htmlFor='pais'>Pais</label>
                <input type="text"
                  className="form-control"
                  placeholder="Ingrese el pais del Proveedor"
                  id="pais"
                  name="pais"
                  value={pais}
                  onChange={Onchange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              </div>

              <div className='card footer'>
                <button type="submit" className="btn btn-block btn-primary">Agregar Proveedor</button>
              </div>
            </form>

              </div>
            </div>            
        </section>
       </div>
       <Footer></Footer>
    </div>

  )
}


export default AgregarProveedores