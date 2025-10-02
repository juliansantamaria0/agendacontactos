const URL_API = "https://68dc4be97cd1948060a9f36c.mockapi.io/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getcity = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/cities`);
		// Si la respuesta es correcta
		if(respuesta.status === 200){
			// Removido: const datos = await respuesta.json(); (no se usaba)
			// Agregado: Devolver la respuesta completa para que el componente la procese
			return respuesta;
		} else if(respuesta.status === 401){
            console.log('La url no es correcta');
			// Agregado: Manejo de error
            return null;
		} else if(respuesta.status === 404){
            console.log('El el cityo  no existe');
			// Agregado: Manejo de error
            return null;
		} else {
            console.log('Se presento un error en la peticion consulte al Administrador');
			// Agregado: Manejo de error
            return null;
		} 
	} catch(error){
        console.log(error);
		// Agregado: Manejo de error en catch
        return null;
	}
    
}

const postcity = async (datos) => {
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

const patchcity = async (datos,id) =>{

    try {
        return await fetch(`${URL_API}/cities/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}

const deletecity = async (id) =>{

    try {
        return await fetch(`${URL_API}/cities/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}

export {
    getcity as getcites,
    postcity as postcites,
    patchcity as patchcites,
    deletecity as deletecites
};
