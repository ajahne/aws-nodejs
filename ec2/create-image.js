const AWS = require('aws-sdk');

//set the region to Oregon
AWS.config.update({region:'us-west-2'});

//create ec2
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

//setup image params
const params = {
  BlockDeviceMappings: [
     {
        DeviceName: "/dev/sdh", 
        Ebs: {
          VolumeSize: 100
      }
    }
  ], 
  Description: "An AMI for my server created via Node", 
  DryRun: true,
  InstanceId: "i-#####", 
  Name: "Node SDK Image", 
  NoReboot: true
 };

ec2.createImage(params, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(data);           // successful response
  }  
});
