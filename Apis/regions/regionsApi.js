const URL_API = "http://localhost:3000"; 
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getRegions = async () => { 
    try {
        const respuesta = await fetch(`${URL_API}/regions`); 
        if (respuesta.status === 200) {
            return respuesta;
        } else if (respuesta.status === 401) {
            console.log('La url no es correcta');
            return null;
        } else if (respuesta.status === 404) {
            console.log('La región no existe');
            return null;
        } else {
            console.log('Se presento un error en la peticion consulte al Administrador');
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const postRegion = async (datos) => {
    try {
        return await fetch(`${URL_API}/regions`, { 
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
};

const patchRegion = async (datos, id) => {
    try {
        return await fetch(`${URL_API}/regions/${id}`, { 
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }
};

const deleteRegion = async (id) => {
    try {
        return await fetch(`${URL_API}/regions/${id}`, { 
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message);
    }
};

export {
    getRegions, 
    postRegion,
    patchRegion,
    deleteRegion
};
