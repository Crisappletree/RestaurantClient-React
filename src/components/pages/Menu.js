import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase'

import Plato from '../ui/Plato';

const Menu = () => {
    
    const [ platos, setPlatos ] = useState([])

    const { firebase } = useContext(FirebaseContext)

    //consultar base de datos
    useEffect(() => {
        const obtenerPlatos = () => {
            firebase.db.collection('productos').onSnapshot(handleSnapshot);
        }
        obtenerPlatos()
    }, []);

    // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
    function handleSnapshot(snapshot) {
        const platos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        // guardar platos en el state
        setPlatos(platos)
    }

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Menu</h1>
            <Link to="/nuevo-plato" className=" bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
                Agregar Plato
            </Link>

            {platos.map( plato => (
                <Plato 
                    key={plato.id}
                    plato={plato}
                />
            ))}
        </>
    );
}

export default Menu;