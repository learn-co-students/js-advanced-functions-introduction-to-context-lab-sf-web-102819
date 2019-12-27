// Your code here
 function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
 }

 function createEmployeeRecords(arrayOfarrays){
    return arrayOfarrays.map(function(row){
        return createEmployeeRecord(row)
    })
 }

 function createTimeOutEvent(recordObject, time){
    recordObject.timeOutEvents.push({
        type: 'TimeOut',
        date: time.split(' ')[0],
        hour: parseInt(time.split(' ')[1], 10)
    })
    return recordObject
 }

 function createTimeInEvent(recordObject, time){
     recordObject.timeInEvents.push({
         type: 'TimeIn',
         date: time.split(' ')[0],
         hour: parseInt(time.split(' ')[1], 10)
     })
     return recordObject
}

function hoursWorkedOnDate(recordObject, thisDate){
    let timeIn = recordObject.timeInEvents.find(function(x){
        return x.date == thisDate
    })
    let timeOut = recordObject.timeOutEvents.find(function(x){
        return x.date == thisDate
    })
    // console.log(timeIn)
    // console.log(timeOut)
    return (timeOut.hour)/100 - (timeIn.hour)/100
}

function wagesEarnedOnDate(recordObject, thisDate){
    let payRate = recordObject.payPerHour
    let hoursWorked = hoursWorkedOnDate(recordObject, thisDate)
    return payRate * hoursWorked
}

function allWagesFor(recordObject){
    let allDates = recordObject.timeInEvents.map(function(x){
        return x.date
    })
    let wagesEarned = allDates.map(function(x){
        return wagesEarnedOnDate(recordObject, x)
    })
    let total = wagesEarned.reduce(function(x, total){
        return total + x
    })
    return total
}

function calculatePayroll(employees){
    let employeePayments = employees.map(function(x){
        return allWagesFor(x)
    })
    let total = employeePayments.reduce(function(total, x){
        return total + x
    })
    return total;
}

function findEmployeeByFirstName(employeeArray, thisName){
    return employeeArray.find(function(x){
        return x.firstName == thisName
    })
}
