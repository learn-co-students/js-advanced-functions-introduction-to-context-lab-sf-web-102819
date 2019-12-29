// Your code here
function createEmployeeRecord(arr) {
    let newEmployee = {}
    newEmployee.firstName = arr[0]
    newEmployee.familyName = arr[1]
    newEmployee.title = arr[2]
    newEmployee.payPerHour = arr[3]
    newEmployee.timeInEvents = []
    newEmployee.timeOutEvents = []
    return newEmployee

}

function createEmployeeRecords(arr) {
    let newArr = arr.map(employee => createEmployeeRecord(employee))
    return newArr
}

function createTimeInEvent(employee, time) {
    const newEvent = {}
    newEvent.type = "TimeIn"
    newEvent.date = time.split(" ")[0]
    newEvent.hour = parseInt(time.split(" ")[1])
    employee.timeInEvents.push(newEvent)
    return employee
}

function createTimeOutEvent(employee, time) {
    const newEvent = {}
    newEvent.type = "TimeOut"
    newEvent.date = time.split(" ")[0]
    newEvent.hour = parseInt(time.split(" ")[1])
    employee.timeOutEvents.push(newEvent)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let hours = 0
    let startIndex = employee.timeInEvents.findIndex(event => event.date == date)
    hours = employee.timeOutEvents[startIndex].hour - employee.timeInEvents[startIndex].hour
    return hours/100
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee,date)
    let wages = hours * employee.payPerHour
    return wages
}

function allWagesFor(employee) {
    const wages = employee.timeInEvents.map(event => wagesEarnedOnDate(employee, event.date))
    return wages.reduce((current, acc) => current + acc)
}

function findEmployeeByFirstName(arr, name) {
    let index = arr.findIndex(employee => employee.firstName == name)
    return arr[index]
}

function calculatePayroll(arr) {
    let payroll = 0
    let wagesArr = []

    wagesArr = arr.map(employee => allWagesFor(employee))
    payroll = wagesArr.reduce((cur, acc) => cur + acc)

    return payroll

}


