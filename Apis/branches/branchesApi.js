const URL_API = "http://localhost:3000"; 
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getBranches = async() => { 
    try {
        const respuesta = await fetch(`${URL_API}/branches`);
        if(respuesta.status === 200){
            return respuesta;
        } else if(respuesta.status === 401){
            console.log('La url no es correcta');
            return null;
        } else if(respuesta.status === 404){
            console.log('La sucursal no existe');
            return null;
        } else {
            console.log('Se presento un error en la peticion consulte al Administrador');
            return null;
        } 
    } catch(error){
        console.log(error);
        return null;
    }
}

const postBranches = async (datos) => {
    try {
        return await fetch(`${URL_API}/branches`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}

const patchBranches = async (datos, id) => {
    try {
        return await fetch(`${URL_API}/branches/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message); 
    }
}

const deleteBranches = async (id) => {
    try {
        return await fetch(`${URL_API}/branches/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message); 
    }
}

export {
    getBranches, 
    postBranches,
    patchBranches,
    deleteBranches
};
