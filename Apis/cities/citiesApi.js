const URL_API = "http://localhost:3000"; 
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getCities = async() => { 
    try {
        const respuesta = await fetch(`${URL_API}/cities`);
        // Si la respuesta es correcta
        if(respuesta.status === 200){
            // Devolver la respuesta completa para que el componente la procese
            return respuesta;
        } else if(respuesta.status === 401){
            console.log('La url no es correcta');
            // Manejo de error
            return null;
        } else if(respuesta.status === 404){
            console.log('La ciudad no existe'); 
            // Manejo de error
            return null;
        } else {
            console.log('Se presento un error en la peticion consulte al Administrador');
            // Manejo de error
            return null;
        } 
    } catch(error){
        console.log(error);
        // Manejo de error en catch
        return null;
    }
}

const postCity = async (datos) => {
    try {
        return await fetch(`${URL_API}/cities`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}

const patchCity = async (datos, id) => {
    try {
        return await fetch(`${URL_API}/cities/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message); 
    }
}

const deleteCity = async (id) => {
    try {
        return await fetch(`${URL_API}/cities/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message); 
    }
}

export {
    getCities, 
    postCity,
    patchCity,
    deleteCity
};
