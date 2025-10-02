const URL_API = "https://68dc4be97cd1948060a9f36c.mockapi.io/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getCountries = async () => {
    try {
        const respuesta = await fetch(`${URL_API}/countries`); 
        if (respuesta.status === 200) {
            return respuesta;
        } else if (respuesta.status === 401) {
            console.log('URL no correcta');
            return null;
        } else if (respuesta.status === 404) {
            console.log('El país no existe');
            return null;
        } else {
            console.log('Error en petición');
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const postCountry = async (datos) => {
    try {
        return await fetch(`${URL_API}/countries`, { 
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error POST:', error.message);
    }
};

const patchCountry = async (datos, id) => {
    try {
        return await fetch(`${URL_API}/countries/${id}`, { 
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error PATCH:', error.message);
    }
};

const deleteCountry = async (id) => {
    try {
        return await fetch(`${URL_API}/countries/${id}`, { 
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error DELETE:', error.message);
    }
};

export {
    getCountries,
    postCountry as postCountries,
    patchCountry as patchCountries,
    deleteCountry as deleteCountries
};
