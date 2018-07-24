var express = require('express')
var cors = require('cors')
var app = express()
var port = parseInt(process.env.PORT || 2000)
var students = require('./src/students')
app.use(cors())
app.listen(port, () => {
    console.log(`port listening on http://localhost:${port}`)
})

function findById(data, id){
    for (let i = 0; i < data.length; i++){
        if (data[i].id == id){
            return data[i]
        }
    }
    return null
}

app.get('/', (request, response) => {
    response.json({data : students})
})

app.get('/:id', (request, response) => {
    var record = findById(students, request.params.id)
    if(!record) {
        response.status = 404
        response.json({
            error: {
                message: 'No records found!'
            }
        })
    }
    response.json({data : record})
})