const mongoose = require('mongoose');
const MONGODB_URI = `mongodb://127.0.0.1:27017/goFood`;
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err)); 



const Alimento = require('./models/Alimento')
const AlimentoDeUsuario = require('./models/AlimentoDeUsuario')
const Categoria = require('./models/Categoria')
const Duracion = require('./models/Duracion')
const Estacion = require('./models/Estacion')
const Marca = require('./models/Marca')
const Receta = require('./models/Receta')
const Tienda = require('./models/Tienda')
const Unidad = require('./models/Unidad')
const User = require('./models/User')
const Valoracion = require('./models/Valoracion')

//creaReceta()
//creaValoracion()
//creaUnidad()
//creaCategoria()
//creaMarca()
//creaTienda()
//creaAlimento()
//creaEstacion()
//creaDuracion()
//creaAlimentoDeUsuario()


async function creaReceta(){
    const nuevaReceta = new Receta({
        R_nombre: "Pasta Alfredo",
        R_descripcion: "Fideos con queso y hotdog",
        R_ingredientes: ["Fideos", "Hot Dog"]
    })
    await nuevaReceta.save()
    console.log(nuevaReceta)
}

async function creaValoracion(){
    const nuevaValoracion = new Valoracion({
        U_id: "6475c423a59cbf118cfa713b",
        R_id: "6475d276d3e9c501b1b5f9a4",
        V_valoracion: 7
    })
    await nuevaValoracion.save()
    console.log(nuevaValoracion)
}

async function creaUnidad(){
    const nuevaUnidad = new Unidad({
        UN_unidad: "Kg",
        UN_nombre: "Kilogramo"
    })
    await nuevaUnidad.save()
    console.log(nuevaUnidad)
}

async function creaCategoria(){
    const nuevaCategoria = new Categoria({
        C_nombre: "Enlatados"
    })
    await nuevaCategoria.save()
    console.log(nuevaCategoria)
}

async function creaMarca(){
    const nuevaMarca = new Marca({
        M_nombre: "Molitalia"
    })
    await nuevaMarca.save()
    console.log(nuevaMarca)
}

async function creaTienda(){
    const nuevaTienda = new Tienda({
        T_nombre: "Tottus"
    })
    await nuevaTienda.save()
    console.log(nuevaTienda)
}

async function creaAlimento(){
    const nuevoAlimento = new Alimento({
        A_nombre: "Lata de atun"
    })
    await nuevoAlimento.save()
    console.log(nuevoAlimento)
}

async function creaEstacion(){
    const nuevaEstacion1 = new Estacion({
        E_nombre: "Otono",
        E_fecha_inicio: new Date('March 20, 2023'),
        E_fecha_fin: new Date('June 20, 2023')
    })
    await nuevaEstacion1.save()
    console.log(nuevaEstacion1)

    const nuevaEstacion2 = new Estacion({
        E_nombre: "Invierno",
        E_fecha_inicio: new Date('June 21, 2023'),
        E_fecha_fin: new Date('September 22, 2023')
    })
    await nuevaEstacion2.save()
    console.log(nuevaEstacion2)

    const nuevaEstacion3 = new Estacion({
        E_nombre: "Primavera",
        E_fecha_inicio: new Date('September 23, 2023'),
        E_fecha_fin: new Date('December 20, 2023')
    })
    await nuevaEstacion3.save()
    console.log(nuevaEstacion3)

    const nuevaEstacion4 = new Estacion({
        E_nombre: "Verano",
        E_fecha_inicio: new Date('December 21, 2023'),
        E_fecha_fin: new Date('March 18, 2024')
    })
    await nuevaEstacion4.save()
    console.log(nuevaEstacion4)
}

async function creaDuracion(){
    const nuevaDuracion1 = new Duracion({
        A_id: "6475f1cc4c2cf87da5c250c2",
        D_duracion: 1,
        E_id: "6475f63a2fe2312d0323f6e1"
    })
    await nuevaDuracion1.save()
    console.log(nuevaDuracion1)

    const nuevaDuracion2 = new Duracion({
        A_id: "6475f1cc4c2cf87da5c250c2",
        D_duracion: 2,
        E_id: "6475f63a2fe2312d0323f6e4"
    })
    await nuevaDuracion2.save()
    console.log(nuevaDuracion2)

    const nuevaDuracion3 = new Duracion({
        A_id: "6475f1cc4c2cf87da5c250c2",
        D_duracion: 3,
        E_id: "6475f63a2fe2312d0323f6e6"
    })
    await nuevaDuracion3.save()
    console.log(nuevaDuracion3)

    const nuevaDuracion4 = new Duracion({
        A_id: "6475f1cc4c2cf87da5c250c2",
        D_duracion: 4,
        E_id: "6475f63a2fe2312d0323f6e8"
    })
    await nuevaDuracion4.save()
    console.log(nuevaDuracion4)
}

async function creaAlimentoDeUsuario(){
    const nuevoAlimentoDeUsuario = new AlimentoDeUsuario({
        A_id: "6475f1cc4c2cf87da5c250c2",
        C_id: "6475e8038f555ff3c4ab4901",
        AU_fecha_ingreso: new Date(),
        AU_fecha_caducidad: new Date('June 08, 2023'),
        U_id: "6475c423a59cbf118cfa713b",
        AU_cantidad: 3,
        UN_id: "6475e753369fb7fe97760993",
        M_id: "6475f00f59351dc8914260ec",
        T_id: "6475f0b54dbc5230ad8202f8"
    })
    await nuevoAlimentoDeUsuario.save()
    console.log(nuevoAlimentoDeUsuario)
}


