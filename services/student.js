const Student = require('../models/student')

exports.getAllStudents = (req, res, next) => {
    Student.find({ age: { $gt: 18 } }).sort({name:1})
    .then((students)=>res.json({message : "List of All Students", studentList : students}))
    .catch(err => res.status(400).json('Error: '+ err))
}

exports.getByNoteSortedByName = (req, res, next) => {
    Student.find({ note : {$gt: 10} })
    .then((students)=>res.json({message : "List of All Students have note > 10", studentList : students}))
    .catch(err => res.status(400).json('Error: '+ err))
}

exports.getByName = (req, res, next) => {
    Student.find({name : req.params.name})
    .then(s => res.json(s))
    .catch(err => res.status(400).json('Error: '+ err));
}

exports.addStudent = async (req, res, next) => {
    
    const sList = await Student.find({name : req.body.name})

    if(sList.length==0){
        var s = new Student({
            name : req.body.name,
            age : req.body.age,
            note : req.body.note
        })
        s.save()
        .then(data=>res.send(data))
        .catch(err=>res.status(500).json('Error: '+ err))
    } 
    else {
        res.status(500).json('Error: This student name is already existing !')
    }
}

exports.getByID = (req, res, next) => {
    Student.findById(req.params.id)
    .then(s => res.json(s))
    .catch(err => res.status(400).json('Error: '+ err));
}

exports.updateStudent = (req, res, next) => {
    Student.findByIdAndUpdate(req.params.id, req.body)
    .then(s =>{
        s.name= req.body.name;
        s.age= req.body.age;
        s.note= req.body.note;
    })
    .then(() => res.json('student updated!'))
    .catch(err => res.status(400).json('Error: '+ err));
}

exports.getNote = (req, res, next) => {
    Student.find({ age: { $gt: 18 } , name : { $regex:/^A.*/ } })
    .then((students)=>res.json({message : "List of All Students have age > 18 and name starts with A", studentList : students}))
    .catch(err => res.status(400).json('Error: '+ err))
}

exports.updateNote = async (req, res, next) => {
    const sList = await Student.find({ age: { $gt: 18 }, name : { $regex:/^A.*/ } }, req.body)
    for(let i=0; i<sList.length; i++){
        await Student.findOneAndUpdate({ _id:sList[i]._id }, {$set: {
            note: sList[i].note += 2
        }})
    }
    res.send({ message: "List of students is updated !" })
}

exports.deleteStudent = (req, res, next) => {
    Student.findByIdAndDelete(req.params.id)
    .then(() => res.json('student deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
}