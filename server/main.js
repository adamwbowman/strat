/*
Meteor.methods({
	'calcRankThenScore': function (profileName) {

		var profileColl = Profile.find({type: profileName}).fetch();
		var customerColl = Customers.find().fetch();
		var customerTotal = 0;
		var runningTotal = 0;

		customerColl = _.chain(customerColl).sortBy(profileName).reverse().value();

		var customerValues = _.pluck(customerColl, profileName);
		for (i=0; i < customerValues.length; ++i) {
			customerTotal = (customerTotal + customerValues[i]);
		}

		var arrScore = [];
		var strVal;

		_.each(customerValues, function (num, i) {
			if (runningTotal <= (customerTotal * (profileColl[0].A/100))) {
				runningTotal = (runningTotal + customerValues[i]);
				arrScore.push([customerColl[i]._id,'A']);
			} else if (runningTotal <= (customerTotal * ((profileColl[0].A + profileColl[0].B)/100))) {
				runningTotal = (runningTotal + customerValues[i]);
				arrScore.push([customerColl[i]._id,'B']);
			} else if (runningTotal <= (customerTotal * ((profileColl[0].A + profileColl[0].B + profileColl[0].C)/100))) {
				runningTotal = (runningTotal + customerValues[i]);
				arrScore.push([customerColl[i]._id,'C']);
//console.log('customerTotal: '+customerTotal);
//console.log('profileMultiplier: '+((profileColl[0].A + profileColl[0].B + profileColl[0].C + profileColl[0].D)/100))
//console.log('runningTotal v profileTotal: '+runningTotal+' v '+(customerTotal * (profileColl[0].A + profileColl[0].B + profileColl[0].C + profileColl[0].D)/100));
			} else if (runningTotal <= (customerTotal * ((profileColl[0].A + profileColl[0].B + profileColl[0].C + profileColl[0].D)/100))) {
				runningTotal = (runningTotal + customerValues[i]);
				arrScore.push([customerColl[i]._id,'D']);
			}
		});
//console.log(arrScore);
		return arrScore;
	}
});
*/