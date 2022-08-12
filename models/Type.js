import mongoose from 'mongoose';
const  Schema  = mongoose.Schema;


const TypeSchema = new Schema({
     type:{
          type: String,
          required: true
     }, 
     hotels: [{
      type: Schema.Types.ObjectId,
      ref: "hotels"     
     }]

     
})

export default mongoose.model("Type", TypeSchema)

