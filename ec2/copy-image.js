const AWS = require('aws-sdk');

//set the region to Oregon
AWS.config.update({region:'us-west-2'});

//create ec2
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

//setup image params
const params = {
  Description: "AMI Copied using node", 
  DryRun:true,
  Name: "AMI Node", 
  SourceImageId: "ami-#####", /*The ID of the AMI to copy.*/
  SourceRegion: "us-west-2" /*The name of the region that contains the AMI to copy.*/
 };

ec2.copyImage(params, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(data);           // successful response
  }  
});
