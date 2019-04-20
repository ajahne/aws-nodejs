const AWS = require('aws-sdk');

//set the region to oregon
AWS.config.update({region:'us-west-2'});

//create ec2
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

//setup instance params
const params = {
  DryRun: true,
  ImageId: 'ami-#####', 
  InstanceType: 't2.micro',
  KeyName: 'My-Key-Pair',
  MinCount: 1,
  MaxCount: 1,
  SubnetId: 'subnet-#####',
  TagSpecifications: [
    {
      ResourceType: "instance", 
      Tags: [
        {
          Key: "Name", 
          Value: "Node SDK EC2 Creation"
        }
      ]
    }
  ]
};

ec2.runInstances(params, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(data);           // successful response
  }  
});
