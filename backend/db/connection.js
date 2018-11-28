const monk =require('monk');
const db = monk('mongodb://root:game9898@ds151383.mlab.com:51383/forum-basdat')

module.exports=db;