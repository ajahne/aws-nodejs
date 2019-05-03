## Example: Find the current Amazon Linux 2 AMI
```javascript
const AWS = require('aws-sdk');
const fs = require("fs");

//set the region, going to perform tests in oregon
AWS.config.update({region:'us-west-2'});

//create ec2
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

//date, which is 8 chars, e.g. 20190403
//hardware is 6? chars, can be arm64 or, x86_64
const params = {
  DryRun:false,
  Filters: [
    {
      Name: 'name',
      Values: [
        'amzn2-ami-hvm-2.0.????????-??????-??????????????'
      ]
    },
    {
      Name: 'state',
      Values: [
        'available'
      ]
    },
    /* more items */
  ],
  Owners: [
    'amazon',
    /* more items */
  ]  
 };

ec2.describeImages(params, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log('success');
    fs.writeFile('data2.json', JSON.stringify(data, null, ' '), (err) => {
      if (err) {
        throw err;
      }
      console.log('The file has been saved');
    });
    console.log('After writing, but before callback');
    // console.log(data);           // successful response
  }  
});
```
