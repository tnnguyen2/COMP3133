const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
        validator: function(v) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
    }
  },
  gender: {
    type: String,
    enum: ['male','female','other'],
  },
  city:{
    type: String,
    uppercase: true,
  },
  designation: {
    type: String
  },
  salary: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Salary must be a positive number');
      }
    }
  },
  created: { 
    type: Date,
    'default': Date.now
  },
  updatedat: {
    type: Date,
    'default': Date.now
  },
});

//Declare Virtual Fields
EmployeeSchema.virtual('fullname').get(function() {
  return this.firstname + ' ' + this.lastname;
})

//Custom Schema Methods
//1. Instance Method Declaration
EmployeeSchema.methods.getSalary = function() {
  return `$${this.salary}`;
}

//2. Static method declararion
EmployeeSchema.statics.getEmployeeByFirstName = function(name) {
  return this.find({ firstname: name });
}

//Writing Query Helpers



EmployeeSchema.pre('save', (next) => {
  console.log("Before Save")
  let now = Date.now()
   
  this.updatedat = now
  // Set a value for createdAt only if it is null
  if (!this.created) {
    this.created = now
  }
  
  // Call the next function in the pre-save chain
  next()
});

EmployeeSchema.pre('findOneAndUpdate', (next) => {
  console.log("Before findOneAndUpdate")
  let now = Date.now()
  this.updatedat = now
  console.log(this.updatedat)
  next()
});


EmployeeSchema.post('init', (doc) => {
  console.log('%s has been initialized from the db', doc._id);
});

EmployeeSchema.post('validate', (doc) => {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

EmployeeSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

EmployeeSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;