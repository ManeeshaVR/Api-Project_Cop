const DepositSchema = require('../model/DepositSchema');

const create=(req,resp)=>{
    const deposit = new DepositSchema({
        memberNo:req.body.memberNo,
        name:req.body.name,
        shares: req.body.shares,
        comDeposits: req.body.comDeposits,
        specDeposits: req.body.specDeposits,
        penDeposits: req.body.penDeposits,
        monthlyShares: req.body.monthlyShares,
        monthlyComDeposits: req.body.monthlyComDeposits,
        monthlySpecDeposits: req.body.monthlySpecDeposits,
        monthlyPenDeposits: req.body.monthlyPenDeposits
    });
    deposit.save().then(response=>{
        resp.status(201).json({'message':'deposit saved!'});
    }).catch(error=>{
        return resp.status(500).json(error);
    });
}
const findById=(req,resp)=>{
    DepositSchema.findOne({'_id':req.params.id}).then(selectedObj=>{
        if(selectedObj!=null){
            return  resp.status(200).json(selectedObj);
        }
        return resp.status(404).json({'message':'deposit not found!'});
    });
}
const findByNo=(req,resp)=>{
    DepositSchema.findOne({'memberNo':req.params.memberNo}).then(selectedObj=>{
        if(selectedObj!=null){
            return  resp.status(200).json(selectedObj);
        }
        return resp.status(404).json({'message':'deposit not found!'});
    });
}
const update= async (req,resp)=>{
    const updateData = await DepositSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            memberNo:req.body.memberNo,
            name:req.body.name,
            shares: req.body.shares,
            comDeposits: req.body.comDeposits,
            specDeposits: req.body.specDeposits,
            penDeposits: req.body.penDeposits,
            monthlyShares: req.body.monthlyShares,
            monthlyComDeposits: req.body.monthlyComDeposits,
            monthlySpecDeposits: req.body.monthlySpecDeposits,
            monthlyPenDeposits: req.body.monthlyPenDeposits
        }
    },{new:true});

    if(updateData){
        return  resp.status(200).json({'message':'updated'});
    }else{
        return resp.status(500).json({'message':'internal server error'});
    }
}
const updateDeposits= async (req,resp)=>{
    const updateData = await DepositSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            shares: req.body.shares,
            comDeposits: req.body.comDeposits,
            specDeposits: req.body.specDeposits,
            penDeposits: req.body.penDeposits,
        }
    },{new:true});

    if(updateData){
        return  resp.status(200).json({'message':'updated'});
    }else{
        return resp.status(500).json({'message':'internal server error'});
    }
}
const updateSpecDeposit= async (req,resp)=>{
    const updateData = await DepositSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            specDeposits: req.body.specDeposits,
        }
    },{new:true});

    if(updateData){
        return  resp.status(200).json({'message':'updated'});
    }else{
        return resp.status(500).json({'message':'internal server error'});
    }
}
const deleteById=async (req,resp)=>{
    const deleteData = await DepositSchema.findByIdAndDelete({'_id':req.params.id});
    if(deleteData){
        return  resp.status(204).json({'message':'deleted'});
    }else{
        return resp.status(500).json({'message':'internal server error'});
    }
}
const findAll=(req,resp)=>{
    try{
        const {searchText, page=1, size=10}=req.query;

        const pageNumber=parseInt(page);
        const pageSize=parseInt(size);

        const query ={};
        if(searchText){
            query.$text={$search:searchText}
        }

        const skip= (pageNumber-1) * pageSize;
        DepositSchema.find(query)
            .limit(pageSize)
            .skip(skip).then(response=>{
            return resp.status(200).json(response);
        })

    }catch (error){
        console.log(error)
        return resp.status(500).json({'message':'internal server error'});
    }
}

const findCount=(req,resp)=>{
    try{
        DepositSchema.countDocuments().then(data=>{
            return resp.status(200).json(data);
        })

    }catch (error){
        return resp.status(500).json({'message':'internal server error'});
    }
}

const findShares=async (req, resp) => {
    try {
        const result = await DepositSchema.aggregate([
            {
                $group: {
                    _id: null,
                    totalSum: {$sum: '$shares'}
                }
            }
        ]);
        console.log(result);
        const totalSum = result.length > 0 ? result[0].totalSum : 0;
        resp.json({totalSum});
    } catch (error) {
        return resp.status(500).json({'message': 'internal server error'});
    }
}

const findComDeposits=async (req, resp) => {
    try {
        const result = await DepositSchema.aggregate([
            {
                $group: {
                    _id: null,
                    totalSum: {$sum: '$comDeposits'}
                }
            }
        ]);
        console.log(result);
        const totalSum = result.length > 0 ? result[0].totalSum : 0;
        resp.json({totalSum});
    } catch (error) {
        return resp.status(500).json({'message': 'internal server error'});
    }
}

const findSpecDeposits=async (req, resp) => {
    try {
        const result = await DepositSchema.aggregate([
            {
                $group: {
                    _id: null,
                    totalSum: {$sum: '$specDeposits'}
                }
            }
        ]);
        console.log(result);
        const totalSum = result.length > 0 ? result[0].totalSum : 0;
        resp.json({totalSum});
    } catch (error) {
        return resp.status(500).json({'message': 'internal server error'});
    }
}

const findPenDeposits=async (req, resp) => {
    try {
        const result = await DepositSchema.aggregate([
            {
                $group: {
                    _id: null,
                    totalSum: {$sum: '$penDeposits'}
                }
            }
        ]);
        console.log(result);
        const totalSum = result.length > 0 ? result[0].totalSum : 0;
        resp.json({totalSum});
    } catch (error) {
        return resp.status(500).json({'message': 'internal server error'});
    }
}



module.exports= {
    create, findById, update, deleteById, findAll, findCount, updateSpecDeposit, findByNo, updateDeposits, findShares, findComDeposits, findSpecDeposits, findPenDeposits
}
