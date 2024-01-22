const TransactionSchema = require('../model/TransactionSchema');
const DepositSchema = require("../model/DepositSchema");

const create=(req,resp)=>{
    const transaction = new TransactionSchema({
        memberNo:req.body.memberNo,
        name:req.body.name,
        amount: req.body.amount,
        date: req.body.date
    });
    transaction.save().then(response=>{
        resp.status(201).json({'message':'transaction saved!'});
    }).catch(error=>{
        return resp.status(500).json(error);
    });
}
const deleteById=async (req,resp)=>{
    const deleteData = await TransactionSchema.findByIdAndDelete({'_id':req.params.id});
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
        TransactionSchema.find(query)
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
        TransactionSchema.countDocuments().then(data=>{
            return resp.status(200).json(data);
        })

    }catch (error){
        return resp.status(500).json({'message':'internal server error'});
    }
}

const findAmount=async (req, resp) => {
    try {
        const result = await TransactionSchema.aggregate([
            {
                $group: {
                    _id: null,
                    totalSum: {$sum: '$amount'}
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
    create, deleteById, findAll, findCount, findAmount
}
