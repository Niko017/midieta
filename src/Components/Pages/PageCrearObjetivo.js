import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import React from "react";
import Crear from "Components/Forms/Crear";

function PageCrearObjetivo(){
    return(
        <React.Fragment>
            <Header/>
            <Crear/>
            <Footer/>
        </React.Fragment>
    );
}

export default PageCrearObjetivo;