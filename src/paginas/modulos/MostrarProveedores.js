import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import SidebarContainer from "../../Componentes/SidebarContainer";
import APIInvoke from "../../configuracion/APIInvoke";
import swal from "sweetalert";


const MostrarProveedores = () =>{
    const [proveedores, setProveedores] =useState([]);

    const getProveedores = async () =>{
        const response = await APIInvoke.invokeGET('/api/proveedores');
        setProveedores(response);
    }
    useEffect(()=>{
        getProveedores();
    },[])

    const eliminarProveedores = async (e, idProveedor) =>{
        e.preventDefault(); 
        const response = await APIInvoke.invokeDELETE(`/api/proveedores/${idProveedor}`);
        setProveedores(response, proveedores);
   
    if(response.msg === "El proveedor ha sido eliminado"){
        const msg = "El proveedor fue eliminado correctamente"
        swal({
            title: 'Informacion',
            text: msg,
            icon: 'success',
            buttons: {
              confirm: {
                text: 'ok',
                value: true,
                visible: true,
                className: 'btn btn-primary',
                closeModal: true,
              },
            },
          });
          getProveedores();

    }else{
        const msg = "El proveedor no pudo ser eliminado correctamente"
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
        }
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
                    <h3 className='card-title'><Link to={"/proveedores/agregar"} className='btn btn-block btn-primary btn-sm'>Crear Proveedores</Link></h3>
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
                    <table className="table table-bordered">
                    <thead>
                  <tr>
                    <th style={{ width:'15%'}}>Nombre Proveedor</th>
                    <th style={{ width:'20%'}}>Correo</th>
                    <th style={{ width:'15%'}}>Telefono</th>
                    <th style={{ width:'15%'}}>Nit</th>
                    <th style={{ width:'20%'}}>Direccion</th>
                    <th style={{ width:'15%'}}>Pais</th>
                  </tr>
                </thead>
                <tbody>
                    {proveedores.map((proveedor, index) => (
                      <tr key={index}>
                        <td>{proveedor.nombreProveedor}</td>
                        <td>{proveedor.correo}</td>
                        <td>{proveedor.numeroContacto}</td>
                        <td>{proveedor.nit}</td>
                        <td>{proveedor.direccion}</td>
                        <td>{proveedor.pais}</td>
                        <td>
                        <Link to = {`/proveedores/editar/${proveedor._id}`} className="btn btn-primary mt-2 mb-2"><i className="fa-solid fa-pen-to-square"></i></Link>
                        <button onClick={(e)=> eliminarProveedores(e, proveedor._id)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                        </td>
                     </tr>
                     ))}
                </tbody>

                    </table>
                </div>
            </div>            
        </section>
       </div>
       <Footer></Footer>
    </div>

  )
}

export default MostrarProveedores