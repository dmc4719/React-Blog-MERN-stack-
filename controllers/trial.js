var fs = require('fs')


try{
    fs.unlinkSync('sample.txt')
}
catch(err){
    console.log(err)
}