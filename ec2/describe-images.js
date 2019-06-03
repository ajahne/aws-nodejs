//load AWS SDK
const AWS = require('aws-sdk');

//set the region, going to perform tests in Oregon
AWS.config.update({region:'us-west-2'});

//create EC2 service object
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

//get the current Amazon Linux 2 AMIs
const params = {
  DryRun:false,
  Filters: [
    {
      Name: 'name',
      Values: [
        'amzn2-ami-hvm-2.0.2019????-x86_64-gp2'
      ]
    },
    {
      Name: 'state',
      Values: [
        'available'
      ]
    },
  ],
  Owners: [
    'amazon',
  ]  
 };

ec2.describeImages(params, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(data);           // successful response
  }  
});


//Example output:
/*
data = {
  "Images": [
    {
     "Architecture": "x86_64",
     "CreationDate": "2019-05-09T00:58:10.000Z",
     "ImageId": "ami-0cb72367e98845d43",
     "ImageLocation": "amazon/amzn2-ami-hvm-2.0.20190508-x86_64-gp2",
     "ImageType": "machine",
     "Public": true,
     "OwnerId": "137112412989",
     "ProductCodes": [],
     "State": "available",
     "BlockDeviceMappings": [
      {
       "DeviceName": "/dev/xvda",
       "Ebs": {
        "DeleteOnTermination": true,
        "SnapshotId": "snap-05f1f2daed90efa18",
        "VolumeSize": 8,
        "VolumeType": "gp2",
        "Encrypted": false
       }
      }
     ],
     "Description": "Amazon Linux 2 AMI 2.0.20190508 x86_64 HVM gp2",
     "EnaSupport": true,
     "Hypervisor": "xen",
     "ImageOwnerAlias": "amazon",
     "Name": "amzn2-ami-hvm-2.0.20190508-x86_64-gp2",
     "RootDeviceName": "/dev/xvda",
     "RootDeviceType": "ebs",
     "SriovNetSupport": "simple",
     "Tags": [],
     "VirtualizationType": "hvm"
    }
  ]
}
*/
