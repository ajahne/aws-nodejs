const AWS = require('aws-sdk');
const fs = require("fs");

//set the region, going to perform tests in oregon
AWS.config.update({region:'us-west-2'});

//create ec2
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

const params = {
  DryRun:false,  
 };

ec2.describeSubnets(params, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log('success');
    fs.writeFile('data.json', JSON.stringify(data, null, ' '), (err) => {
      if (err) {
        throw err;
      }
      console.log('The file has been saved');
    });
    console.log('After writing, but before callback');
    // console.log(data);           // successful response
  }  
});

//Example output:
/*
 data = {
  Subnets: [
     {
    AvailabilityZone: "us-west-2c", 
    AvailableIpAddressCount: 251, 
    CidrBlock: "10.0.1.0/24", 
    DefaultForAz: false, 
    MapPublicIpOnLaunch: false, 
    State: "available", 
    SubnetId: "subnet-9d4a7b6c", 
    VpcId: "vpc-a01106c2"
   }
  ]
 }
 */
