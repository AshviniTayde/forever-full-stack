import jwt from 'jsonwebtoken'
// import { assets } from '../../fronted/src/assets/assets'
// import cartRouter from '../routes/cartRoute';

const authUser=async (req,res,next) => {
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"not a authorized, login Again"})
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export default authUser