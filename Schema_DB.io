Table User {
id            int  [primary key]
firstName     varchar
lastName      varchar
dateOfBirth   datetime
gender        varchar
role          Role
phone         varchar
email         varchar  [unique]
address       varchar
}

Table Appointments {
id              int  [primary key]
patientId       int
employeeId      int
appointmentDate datetime
diagnosis       text
notes           text
}

Table Prescriptions {
id             int  [primary key]
appointmentId  int
medicationName varchar
dosage         varchar
instructions   text
}

Table Attendances {
id             int  [primary key]
patientsId     int
employeeId     int
urgencyLevel   UrgencyLevel
observations   text
}

Enum Role {
Doctor
Staff
Patient
}

Enum UrgencyLevel {
Low
Medium
High
Emergency
}

Ref: Appointments.patientId > User.id
Ref: Appointments.employeeId > User.id
Ref: Prescriptions.appointmentId > Appointments.id
Ref: Attendances.patientsId > User.id
Ref: Attendances.employeeId > User.id