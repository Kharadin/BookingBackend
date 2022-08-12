import { query, response } from "express"
import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"
import Type from "../models/Type.js"

export const createHotel = async (req, res, next) => {
     const newHotel = new Hotel(req.body)
     try{
          const savedHotel = await newHotel.save()
          res.status(200).json(savedHotel)
     }catch(err) {
          next(err)
     }
}

export const createTestHotels = async (req, res, next) => {
    const {  number, ...others} = req.body
    console.log(req)
    console.log (number)
    for (let i=0; i< number; i++) 
    
    {     console.log(i)
         const newHotel = new Hotel(req.body)
         try{
              const savedHotel = await newHotel.save()
              res.status(200).json(savedHotel)
              response.end()
          }catch(err) {
               console.log (err)
          }
     }
}

export const updateHotel = async (req, res, next) => {
     try{
          const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,
          {$set: req.body},
          {new: true}
          )
          // $set is mongo method...
          //findByIdAndUpdate - returns the previous document, not the updated one...by default. .. without option {new: true}

          res.status(200).json(updatedHotel) 
     }catch(err) {
         next(err)
     }
}


export const getHotel = async (req, res, next) => {
     try{
          const hotel = await Hotel.findById(req.params.id
         );
          res.status(200).json(hotel);
     } catch(err) {
          next(err)
     }
}

export const deleteHotel = async (req, res, next) => {
     try{
           await Hotel.findByIdAndDelete(req.params.id 
               );
               res.status(200).json("Hotel deleted") 
     }catch(err) {
          next(err);
     }
}

export const getHotels = async (req, res, next) => {
     console.log(req.query)
     const { limit,...others} = req.query;
     const skip = req.query.page ? parseInt(req.query.page) : 0;

      
     let query ={}
     if ('city' in others  && others.city !=='') {
               query.city = others.city
     }
     
     if ('type' in others && !(others.type =='undefined' || others.type =='' )) {
          query.type = others.type
     }
     
     if ('featured' in others ) {
          query.featured = others.featured
     }
     
     if ('min' in others || 'max' in others ) {
          query.cheapestPrice= {$gt: (others.min -1) | 1, $lt: others.max || 9999};
     }
     

     // if (type === 'undefined') {
     //       query = {...others,
     //                     cheapestPrice: {$gt: (min -1) | 1, $lt: max || 9999},}
     // } else  {  query = {...others,
     //      cheapestPrice: {$gt: (min -1) | 1, $lt: max || 9999}, type: type }

     // }
     // console.log(others)
     // console.log(type)
     console.log(query)
     try{
          const hotels = await Hotel.find(query).skip(skip * req.query.limit).limit(req.query.limit);
               if ('count' in others) {
                  const hotelCount = await Hotel.countDocuments(query);
                 return res.status(200).json({count: hotelCount, hotelList:hotels})
                    
               }

          res.status(200).json(hotels);
     } catch(err) {
          next(err)
     }
}

export const countByCity = async (req, res, next) => {
     const cities = req.query.cities.split(",")
     try{
          const list = await Promise.all(cities.map(city=>{
               return Hotel.countDocuments({city: city})
          }))
          res.status(200).json(list);
     } catch(err) {
          next(err)
     }
}

// otherwise the below can be done like the above- for customised types, etc...

// export const countByType = async (req, res, next) => {
//   try 
//   {  const chaletsCount = await Hotel.countDocuments({type:"hotel"})
//      const lakehouseCount = await Hotel.countDocuments({type:"lakehouse"})
//      const villasCount = await Hotel.countDocuments({type:"villa"})
//      const resortsCount = await Hotel.countDocuments({type:"resort"})
//      const cabinsCount = await Hotel.countDocuments({type:"cabin"})

//          res.status(200).json([
//                {type:"hotel", count: chaletsCount},
//                {type:"lakehouse", count: lakehouseCount},
//                {type:"villa", count: villasCount},
//                {type:"resort",count: resortsCount},
//                {type:"cabin", count: cabinsCount},
//           ])
         
//   } catch(err) {
//           next(err)

//   }
// }

export const countByType = async (req, res, next) => {
     try {
          const types = await Type.find();
          const  count = await Promise.all(types.map(type=>{
               return Hotel.countDocuments({type: type._id })
          }
           ))
         const countTypes =[]
     // this old-School stuff works    
     //      const length = types.length;
     //     for (let i = 0; i< length; i++) {
     //           countTypes[i]= {type: types[i].type, count:count[i]}
     //     };

          // new-style way: 
          types.map((type, i)=> {
               // filtering out unused fields... the rest is in ...others
               const {hotels, __v,  ...others}=type._doc 
               // _id, - removed from destructuring assignment to use in navigate-state- from Home(Header) to List
          //    countTypes[i] = {...type._doc, count: count[i]}
          //this works to add properties., mind ._doc to clear metadata

             countTypes[i] = ({...others, count:count[i] } )
             // adding count field. 
             
          })
          
          res.status(200).json(countTypes)
     } catch (err) {
          next(err)
     }
}

export const getHotelRooms = async (req, res, next) =>{
     try {
          const hotel = await Hotel.findById(req.params.id)
          const list = await Promise.all(hotel.rooms.map(room=> {
               return Room.findById(room);
          }))
          res.status(200).json(list)
     } catch(err) {
          next (err)
     }
}