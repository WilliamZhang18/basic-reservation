# Basic Reservation
This repo is using Node.js, GraphQL, AWS DynamoDB to simulate a basic reservation system.

## Prerequisite
Create a DynamoDB in "us-east-1" with the following configurations:
```
Table name:	reservation
Primary partition key:	id (Number)
```

## Getting Started
`git clone https://github.com/WilliamZhang18/basic-reservation.git`

`cd basic-reservation`

`npm install`

`npm start`

Open browser and go to

`http://localhost:3000/graphql`


# Query to retrieve a reservation by ID
```
{
  reservation(id:1) {
    id
    guest_name
  }
}
```

# Query to retrieve all reservations
```
{
  reservations {
    id
    guest_name
    hotel_name
    arrival_date
    departure_date
  }
}
```

# Mutation to create a reservation
```
mutation {
  createRevervation(id: 2, guest_name: "Phil", hotel_name: "Hilton", arrival_date: "2021-05-06", departure_date: "2021-05-07") {
   id
  }
}
```
