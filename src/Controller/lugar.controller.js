const Lugar = require('../Models/lugar.model');
const {saveTrek , deleteOneTrek, updateOneTrek , getFilterTreks, getOneTrek} = require('../Services/lugar.services');

    async function addTrek(req,res){
        // res.json({
        //     msj: "Entro por add"
        // })

        try{
            const data = req.body;
            const result = await saveTrek(data);
            res.json({
                Msg: "Lugar agregado exitosamente",
                lugar: result
            })
        }catch(err){
            res.status(410);
            console.error(err)
            res.json({
                Msg: "La insercion del lugar fallo",
                Error: err
            });
        }
    }


    async function getTrek(req,res){
        // res.json({
        //     msj: "Entro por get"
        // })
        await Lugar.find({})
        .then(data=>{
            res.json(data)
        }).catch(err=>{
            res.status(411);
            console.error(err)
            res.json({
                Msg:"No se logro obtener los Lugares",
                Error: err
            });
        })
    }


    async function updateTrekById(req,res){
        // res.json({
        //     msj: "Entro por update"
        // })
        try{
            const id = req.params
            const data = req.body
            const result =  await updateOneTrek(id,data)
            res.json(result);
        }catch(err){
            res.status(412);
            console.error(err);
            res.json({
                Msg:"No se pudo modificar el Trek",
                Error: err
            });
        }
      

    }


    async function deleteTrek(req,res){
        // res.json({
        //     msj: "Entro por delete"
        // })
        try{
            const {id} = req.params;
            const result = await deleteOneTrek(id);
            res.json(result);
        }catch(err){
            res.status(413);
            console.error(err);
            res.json({
                Msg:"No se pudo eliminar el Trek",
                Error: err
            });
        }



    }

    async function filterTrek(req,res){
        try{
            const {nombre,localidad,dificultad} = req.query;
            const result = await getFilterTreks(nombre,localidad,dificultad);
            res.json(result);

        }catch(err){
            res.status(414);
            console.error(err);
            res.json({
                Msg:"No se pudo encontrar ningun trek",
                Error: err
            });
        }
    }

    async function findTrek(req,res){
        try{
            const {id} = req.params;
            const result = await getOneTrek(id);
            res.json(result);

        }catch(err){
            res.status(415);
            console.error(err);
            res.json({
                Msg:"No se pudo encontrar el trek, verifique el ID",
                Error: err
            });
        }
    }

module.exports= {addTrek,getTrek,updateTrekById,deleteTrek,filterTrek,findTrek};