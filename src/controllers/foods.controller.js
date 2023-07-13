const AlimentoDeUsuario = require('../models/AlimentoDeUsuario');
const Alimento = require('../models/Alimento');
const Categoria = require('../models/Categoria');
const Unidad = require('../models/Unidad');
const Marca = require('../models/Marca');
const Tienda = require('../models/Tienda');
const Estacion = require('../models/Estacion');
const Duracion = require('../models/Duracion');

const foodsCtrl = {};

foodsCtrl.renderNewFood = async (req, res) => {
    try{
        const alimentos = await Alimento.find();
        const categorias = await Categoria.find();
        const unidades = await Unidad.find();
        const marcas = await Marca.find();
        const tiendas = await Tienda.find();
        //console.log(alimentos);
        res.render('foods/newfood', {alimentos, categorias, unidades, marcas, tiendas});
    }catch(e){
        console.log(e.message);
    }
};

foodsCtrl.newFood = async (req, res) => {
    
    
    try{
        console.log(req.body);
        
        const {alimento, categoria, fechaIngreso, fechaCaducidad, cantidad, unidad, marca, tienda} = req.body;

        const alimentoEncontrado = await Alimento.findOne({A_nombre: alimento});
        const A_id = alimentoEncontrado._id;
        const categoriaEncontrado = await Categoria.findOne({C_nombre: categoria});
        const C_id = categoriaEncontrado._id;
        const U_id = req.user._id;
        const AU_cantidad = parseInt(cantidad);
        const unidadEncontrado = await Unidad.findOne({UN_unidad: unidad});
        const UN_id = unidadEncontrado._id;
        const marcaEncontrado = await Marca.findOne({M_nombre: marca});
        const M_id = marcaEncontrado._id;
        const tiendaEncontrado = await Tienda.findOne({T_nombre: tienda});
        const T_id = tiendaEncontrado._id;
        

        console.log("Fecha ingreso: ",fechaIngreso," ---- Fecha caducidad: ",fechaCaducidad);
        
        ////
        /*
        const fechaActual = new Date();
        console.log(fechaActual);
        const estaciones = await Estacion.find();
        
        let E_id;
        for (const estacion of estaciones) {
            console.log(estacion);
            if(fechaActual >= estacion.E_fecha_inicio && fechaActual <= estacion.E_fecha_fin){
                console.log("coincidencia------", estacion._id)
                E_id = estacion._id;
                console.log(E_id);
                break;
            }
        }

        console.log("A_id------E_id:-------",A_id, E_id);
        const duracionEncontrada = await Duracion.find({A_id: A_id, E_id: E_id});
        console.log("duracion encontrada:------",duracionEncontrada);
        const aumentoDias = duracionEncontrada[0].D_duracion;
        console.log("aumento de dias:----------",aumentoDias);

        fechaActual.setDate(fechaActual.getDate() + aumentoDias);

        
        const nuevoAnio = fechaActual.getFullYear();
        const nuevoMes = fechaActual.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0 (enero es 0)
        const nuevoDia = fechaActual.getDate();

        const nuevaFecha = `${nuevoAnio}-${nuevoMes < 10 ? '0' + nuevoMes : nuevoMes}-${nuevoDia < 10 ? '0' + nuevoDia : nuevoDia}`;
        console.log(nuevaFecha); 
        
        const AU_fecha_caducidad = new Date(nuevaFecha);
        console.log(AU_fecha_caducidad); 
        
        console.log("Fecha Actual: ", new Date(), "-----------","Mas ", aumentoDias, "dias -------","Fecha Mas Dia: ", AU_fecha_caducidad); 

        */
        /////

        let tipoDeCaso;
        if(fechaIngreso){
            if(fechaCaducidad){
                console.log(fechaIngreso, fechaCaducidad);
                console.log("Si ingreso, si caducidad");
                tipoDeCaso = 1;
            }else{
                console.log(fechaIngreso, fechaCaducidad);
                console.log("Si ingreso, no caducidad");
                tipoDeCaso = 2;
            }
        }else{
            if(fechaCaducidad){
                console.log(fechaIngreso, fechaCaducidad);
                console.log("no ingreso, si caducidad");
                tipoDeCaso = 3;
            }else{
                console.log(fechaIngreso, fechaCaducidad);
                console.log("no ingreso, no caducidad");
                tipoDeCaso = 4;
            }
        }
        console.log(A_id, C_id, U_id, AU_cantidad, UN_id, M_id, T_id);


        let nuevoAlimentoDeUsuario;

        switch (tipoDeCaso) {
            case 1:
                nuevoAlimentoDeUsuario = new AlimentoDeUsuario({
                    A_id: A_id,
                    C_id: C_id,
                    AU_fecha_ingreso: new Date(fechaIngreso),
                    AU_fecha_caducidad: new Date(fechaCaducidad),
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });
                await nuevoAlimentoDeUsuario.save();
                console.log("Si ingreso, si caducidad: ", nuevoAlimentoDeUsuario);
                break;
            case 2:

                const fechaIngresoCaso2 = new Date(fechaIngreso);
                const estaciones = await Estacion.find();
                    
                let E_id;
                for (const estacion of estaciones) {
                    console.log(estacion);
                    if(fechaIngresoCaso2 >= estacion.E_fecha_inicio && fechaIngresoCaso2 <= estacion.E_fecha_fin){
                        console.log("coincidencia------", estacion._id)
                        E_id = estacion._id;
                        console.log(E_id);
                        break;
                    }
                }

                console.log("A_id------E_id:-------",A_id, E_id);
                const duracionEncontrada = await Duracion.find({A_id: A_id, E_id: E_id});
                console.log("duracion encontrada:------",duracionEncontrada);
                const aumentoDias = duracionEncontrada[0].D_duracion;
                console.log("aumento de dias:----------",aumentoDias);

                fechaIngresoCaso2.setDate(fechaIngresoCaso2.getDate() + aumentoDias+1);

                
                const nuevoAnio = fechaIngresoCaso2.getFullYear();
                const nuevoMes = fechaIngresoCaso2.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0 (enero es 0)
                const nuevoDia = fechaIngresoCaso2.getDate();

                const nuevaFecha = `${nuevoAnio}-${nuevoMes < 10 ? '0' + nuevoMes : nuevoMes}-${nuevoDia < 10 ? '0' + nuevoDia : nuevoDia}`;
                console.log(nuevaFecha); 
                
                const AU_fecha_caducidad = new Date(nuevaFecha);
                console.log(AU_fecha_caducidad); 
                
                console.log("Fecha Ingreso: ", new Date(fechaIngreso), "-----------","Mas ", aumentoDias, "dias -------","Fecha Mas Dia: ", AU_fecha_caducidad); 


                nuevoAlimentoDeUsuario = new AlimentoDeUsuario({
                    A_id: A_id,
                    C_id: C_id,
                    AU_fecha_ingreso: new Date(fechaIngreso),
                    AU_fecha_caducidad: AU_fecha_caducidad,
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });
                await nuevoAlimentoDeUsuario.save();
                console.log("Si ingreso, no caducidad: ", nuevoAlimentoDeUsuario);
                break;


            case 3:
                nuevoAlimentoDeUsuario = new AlimentoDeUsuario({
                    A_id: A_id,
                    C_id: C_id,
                    AU_fecha_caducidad: new Date(fechaCaducidad),
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });
                await nuevoAlimentoDeUsuario.save();
                console.log("No ingreso, si caducidad: ", nuevoAlimentoDeUsuario);
                break;
            case 4:

                const fechaActual = new Date();
                console.log(fechaActual);
                const estaciones2 = await Estacion.find();
                
                let E_id2;
                for (const estacion of estaciones2) {
                    console.log(estacion);
                    if(fechaActual >= estacion.E_fecha_inicio && fechaActual <= estacion.E_fecha_fin){
                        console.log("coincidencia------", estacion._id)
                        E_id2 = estacion._id;
                        console.log(E_id2);
                        break;
                    }
                }
        
                console.log("A_id------E_id:-------",A_id, E_id2);
                const duracionEncontrada2 = await Duracion.find({A_id: A_id, E_id: E_id2});
                console.log("duracion encontrada:------",duracionEncontrada2);
                const aumentoDias2 = duracionEncontrada2[0].D_duracion;
                console.log("aumento de dias:----------",aumentoDias2);
        
                fechaActual.setDate(fechaActual.getDate() + aumentoDias2);
        
                
                const nuevoAnio2 = fechaActual.getFullYear();
                const nuevoMes2 = fechaActual.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0 (enero es 0)
                const nuevoDia2 = fechaActual.getDate();
        
                const nuevaFecha2 = `${nuevoAnio2}-${nuevoMes2 < 10 ? '0' + nuevoMes2 : nuevoMes2}-${nuevoDia2 < 10 ? '0' + nuevoDia2 : nuevoDia2}`;
                console.log(nuevaFecha2); 
                
                const AU_fecha_caducidad2 = new Date(nuevaFecha2);
                console.log(AU_fecha_caducidad2); 
                
                console.log("Fecha Actual: ", new Date(), "-----------","Mas ", aumentoDias2, "dias -------","Fecha Mas Dia: ", AU_fecha_caducidad2); 



                nuevoAlimentoDeUsuario = new AlimentoDeUsuario({
                    A_id: A_id,
                    C_id: C_id,
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    AU_fecha_caducidad: AU_fecha_caducidad2,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });
                await nuevoAlimentoDeUsuario.save();
                console.log("No ingreso, no caducidad: ", nuevoAlimentoDeUsuario);
                break;
        }
        
        res.redirect('/dashboard/foods');
        
    }catch(e){
        console.log(e.message);
    }
    
};

foodsCtrl.renderUpdateFood = async (req, res) => {
    try{

        const id = req.params.id;

        const alimentoDeUsuarioEncontrado = await AlimentoDeUsuario.findById(id);

        console.log(alimentoDeUsuarioEncontrado);

        const fechaIngreso = alimentoDeUsuarioEncontrado.AU_fecha_ingreso;
        let diaFechaIngreso = fechaIngreso.getDate().toString();

        if(diaFechaIngreso.length == 1){
            diaFechaIngreso = "0"+diaFechaIngreso;
        }


        let mesFechaIngreso = fechaIngreso.getMonth()+1;
        mesFechaIngreso = mesFechaIngreso.toString();

        if(mesFechaIngreso.length == 1){
            mesFechaIngreso = "0"+mesFechaIngreso;
        }
        
        const anioFechaIngreso = fechaIngreso.getFullYear();

        console.log(diaFechaIngreso, mesFechaIngreso, anioFechaIngreso);

        const fechaCaducidad = alimentoDeUsuarioEncontrado.AU_fecha_caducidad;
        let diaFechaCaducidad = fechaCaducidad.getDate().toString();

        if(diaFechaCaducidad.length == 1){
            diaFechaCaducidad = "0"+diaFechaCaducidad;
        }

        let mesFechaCaducidad = fechaCaducidad.getMonth()+1;
        mesFechaCaducidad = mesFechaCaducidad.toString();

        if(mesFechaCaducidad.length == 1){
            mesFechaCaducidad = "0"+mesFechaCaducidad;
        }

        const anioFechaCaducidad = fechaCaducidad.getFullYear().toString();

        console.log(diaFechaCaducidad, mesFechaCaducidad, anioFechaCaducidad);

        const alimentos = await Alimento.find();
        const categorias = await Categoria.find();
        const unidades = await Unidad.find();
        const marcas = await Marca.find();
        const tiendas = await Tienda.find();
        const cantidad = alimentoDeUsuarioEncontrado.AU_cantidad;
        
        res.render('foods/edit', {alimentoDeUsuarioEncontrado, alimentos, categorias, unidades, marcas, tiendas, cantidad, diaFechaIngreso, mesFechaIngreso, anioFechaIngreso, diaFechaCaducidad, mesFechaCaducidad, anioFechaCaducidad});

    }catch(e){
        console.log(e.message);
    }
};

foodsCtrl.updateFood = async (req, res) => {
    
    try{
        const id = req.params.id;

        console.log(req.body);
        
        const {alimento, categoria, fechaIngreso, fechaCaducidad, cantidad, unidad, marca, tienda} = req.body;

        const alimentoEncontrado = await Alimento.findOne({A_nombre: alimento});
        const A_id = alimentoEncontrado._id;
        const categoriaEncontrado = await Categoria.findOne({C_nombre: categoria});
        const C_id = categoriaEncontrado._id;
        const U_id = req.user._id;
        const AU_cantidad = parseInt(cantidad);
        const unidadEncontrado = await Unidad.findOne({UN_unidad: unidad});
        const UN_id = unidadEncontrado._id;
        const marcaEncontrado = await Marca.findOne({M_nombre: marca});
        const M_id = marcaEncontrado._id;
        const tiendaEncontrado = await Tienda.findOne({T_nombre: tienda});
        const T_id = tiendaEncontrado._id;
        

        console.log(fechaIngreso, fechaCaducidad);

        let tipoDeCaso;
        if(fechaIngreso){
            if(fechaCaducidad){
                console.log(fechaIngreso, fechaCaducidad);
                console.log("Si ingreso, si caducidad");
                tipoDeCaso = 1;
            }else{
                console.log(fechaIngreso, fechaCaducidad);
                console.log("Si ingreso, no caducidad");
                tipoDeCaso = 2;
            }
        }else{
            if(fechaCaducidad){
                console.log(fechaIngreso, fechaCaducidad);
                console.log("no ingreso, si caducidad");
                tipoDeCaso = 3;
            }else{
                console.log(fechaIngreso, fechaCaducidad);
                console.log("no ingreso, no caducidad");
                tipoDeCaso = 4;
            }
        }
        console.log(A_id, C_id, U_id, AU_cantidad, UN_id, M_id, T_id);


        let alimentoUsuarioActualizado;

        switch (tipoDeCaso) {
            case 1:
                alimentoUsuarioActualizado = await AlimentoDeUsuario.findByIdAndUpdate(id, {
                    A_id: A_id,
                    C_id: C_id,
                    AU_fecha_ingreso: new Date(fechaIngreso),
                    AU_fecha_caducidad: new Date(fechaCaducidad),
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });

                console.log("Si ingreso, si caducidad: ", alimentoUsuarioActualizado);
                break;

            case 2:

                const fechaIngresoCaso2 = new Date(fechaIngreso);
                const estaciones = await Estacion.find();
                    
                let E_id;
                for (const estacion of estaciones) {
                    console.log(estacion);
                    if(fechaIngresoCaso2 >= estacion.E_fecha_inicio && fechaIngresoCaso2 <= estacion.E_fecha_fin){
                        console.log("coincidencia------", estacion._id)
                        E_id = estacion._id;
                        console.log(E_id);
                        break;
                    }
                }

                console.log("A_id------E_id:-------",A_id, E_id);
                const duracionEncontrada = await Duracion.find({A_id: A_id, E_id: E_id});
                console.log("duracion encontrada:------",duracionEncontrada);
                const aumentoDias = duracionEncontrada[0].D_duracion;
                console.log("aumento de dias:----------",aumentoDias);

                fechaIngresoCaso2.setDate(fechaIngresoCaso2.getDate() + aumentoDias+1);

                
                const nuevoAnio = fechaIngresoCaso2.getFullYear();
                const nuevoMes = fechaIngresoCaso2.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0 (enero es 0)
                const nuevoDia = fechaIngresoCaso2.getDate();

                const nuevaFecha = `${nuevoAnio}-${nuevoMes < 10 ? '0' + nuevoMes : nuevoMes}-${nuevoDia < 10 ? '0' + nuevoDia : nuevoDia}`;
                console.log(nuevaFecha); 
                
                const AU_fecha_caducidad = new Date(nuevaFecha);
                console.log(AU_fecha_caducidad); 
                
                console.log("Fecha Ingreso: ", new Date(fechaIngreso), "-----------","Mas ", aumentoDias, "dias -------","Fecha Mas Dia: ", AU_fecha_caducidad); 


                alimentoUsuarioActualizado = await AlimentoDeUsuario.findByIdAndUpdate(id, {
                    A_id: A_id,
                    C_id: C_id,
                    AU_fecha_ingreso: new Date(fechaIngreso),
                    AU_fecha_caducidad: AU_fecha_caducidad,
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });
                
                console.log("Si ingreso, no caducidad: ", alimentoUsuarioActualizado);
                break;

            case 3:
                alimentoUsuarioActualizado = await AlimentoDeUsuario.findByIdAndUpdate(id, {
                    A_id: A_id,
                    C_id: C_id,
                    AU_fecha_ingreso: new Date(),
                    AU_fecha_caducidad: new Date(fechaCaducidad),
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });
                
                console.log("No ingreso, si caducidad: ", alimentoUsuarioActualizado);
                break;
            case 4:

                const fechaActual = new Date();
                console.log(fechaActual);
                const estaciones2 = await Estacion.find();
                
                let E_id2;
                for (const estacion of estaciones2) {
                    console.log(estacion);
                    if(fechaActual >= estacion.E_fecha_inicio && fechaActual <= estacion.E_fecha_fin){
                        console.log("coincidencia------", estacion._id)
                        E_id2 = estacion._id;
                        console.log(E_id2);
                        break;
                    }
                }
        
                console.log("A_id------E_id:-------",A_id, E_id2);
                const duracionEncontrada2 = await Duracion.find({A_id: A_id, E_id: E_id2});
                console.log("duracion encontrada:------",duracionEncontrada2);
                const aumentoDias2 = duracionEncontrada2[0].D_duracion;
                console.log("aumento de dias:----------",aumentoDias2);
        
                fechaActual.setDate(fechaActual.getDate() + aumentoDias2+1);
        
                
                const nuevoAnio2 = fechaActual.getFullYear();
                const nuevoMes2 = fechaActual.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0 (enero es 0)
                const nuevoDia2 = fechaActual.getDate();
        
                const nuevaFecha2 = `${nuevoAnio2}-${nuevoMes2 < 10 ? '0' + nuevoMes2 : nuevoMes2}-${nuevoDia2 < 10 ? '0' + nuevoDia2 : nuevoDia2}`;
                console.log(nuevaFecha2); 
                
                const AU_fecha_caducidad2 = new Date(nuevaFecha2);
                console.log(AU_fecha_caducidad2); 
                
                console.log("Fecha Actual: ", new Date(), "-----------","Mas ", aumentoDias2, "dias -------","Fecha Mas Dia: ", AU_fecha_caducidad2); 



                alimentoUsuarioActualizado = await AlimentoDeUsuario.findByIdAndUpdate(id, {
                    A_id: A_id,
                    C_id: C_id,
                    U_id: U_id,
                    AU_cantidad: AU_cantidad,
                    AU_fecha_ingreso: new Date(),
                    AU_fecha_caducidad: AU_fecha_caducidad2,
                    UN_id: UN_id,
                    M_id: M_id,
                    T_id: T_id
                });
                
                console.log("No ingreso, no caducidad: ", alimentoUsuarioActualizado);
                break;
        }
        
        res.redirect('/dashboard/foods');
        
        
    }catch(e){
        console.log(e);
    }

};

foodsCtrl.deleteFood = async (req, res) => {
    try{
        await AlimentoDeUsuario.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard/foods');
    }catch(e){
        console.log(e.message);
    }
};




module.exports = foodsCtrl;