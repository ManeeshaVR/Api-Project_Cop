const MemberSchema = require('../model/MemberSchema');
const userSchema = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const create=(req,resp)=>{
    const member = new MemberSchema({
        memberNo:req.body.memberNo,
        name:req.body.name,
        department:req.body.department,
        salary:req.body.salary,
        age:req.body.age,
        nic:req.body.nic,
        email:req.body.email,
        image:req.body.image,
    });
    member.save().then(response=>{
        resp.status(201).json({'message':'member saved!'});
    }).catch(error=>{
        return resp.status(500).json(error);
    });
}
const findById=(req,resp)=>{
    MemberSchema.findOne({'_id':req.params.id}).then(selectedObj=>{
        if(selectedObj!=null){
            return  resp.status(200).json(selectedObj);
        }
        return resp.status(404).json({'message':'member not found!'});
    });
}
const mailMember=(req,resp)=>{
    const transporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'cooperativesociety759@gmail.com',
            pass:'kdci dupf wntn pdrx',
        }
    });

    const mailOption={
        from:'cooperativesociety759@gmail.com',
        to:req.body.email,
        subject:'Deposit Details',
        text:'Member No: '+req.body.memberNo+'\nName: '+req.body.name+"\nShares: "+req.body.shares+'\nCompulsory Deposits: '+req.body.comDeposits+'\nSpecial Deposits: '+req.body.specDeposits+'\nPension Deposits: '+req.body.penDeposits
    }
    transporter.sendMail(mailOption, function (error, info) {
        if (error){
            return resp.status(500).json({'error':error});
        }else{
            return resp.status(201).json({'message':'Email sent!'});
        }
    })
}
const update= async (req,resp)=>{
    const updateData = await MemberSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            memberNo:req.body.memberNo,
            name:req.body.name,
            department:req.body.department,
            salary:req.body.salary,
            age:req.body.age,
            nic:req.body.nic,
            email:req.body.email,
            image:req.body.image,
        }
    },{new:true});

    if(updateData){
        return  resp.status(200).json({'message':'updated'});
    }else{
        return resp.status(500).json({'message':'internal server error'});
    }
}
const deleteById=async (req,resp)=>{
    const deleteData = await MemberSchema.findByIdAndDelete({'_id':req.params.id});
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
        MemberSchema.find(query)
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
        MemberSchema.countDocuments().then(data=>{
            return resp.status(200).json(data);
        })

    }catch (error){
        return resp.status(500).json({'message':'internal server error'});
    }
}

module.exports= {
    create, findById, update, deleteById, findAll, findCount, mailMember
}
