//load AWS SDK
const AWS = require('aws-sdk');

//set the region, going to perform tests in Oregon
AWS.config.update({region:'us-west-2'});

//create EC2 service object
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

//empty params object, needed to pass into describeSubnets function
const params = {};

ec2.describeSubnets(params, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(data);           // successful response
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
