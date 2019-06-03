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

function sortByCreationDate(data) {
  const images = data.Images;
  images.sort(function(a,b) {
    const dateA = a["CreationDate"];
    const dateB = b["CreationDate"];
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    //dates are equal
    return 0;
  });

  //reverse so we have the images sorted by date in descending order
  images.reverse();
}

ec2.describeImages(params, function(err, data) {
  if (err) {                      // an error occurred
    console.log(err, err.stack);  
  } else {                        // successful response
    sortByCreationDate(data);
    console.log(data);           
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
