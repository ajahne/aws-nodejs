const AWS = require('aws-sdk');

//set the region to Oregon
AWS.config.update({region:'us-west-2'});

//create ec2
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

//setup instance params
const instanceParams = {
  DryRun: true,
  InstanceIds: [
    'i-#####'    
  ]
};

ec2.stopInstances(instanceParams, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(data);           // successful response
  }  
});
