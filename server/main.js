
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
			if (runningTotal < (customerTotal * (profileColl[0].A/100))) {
				runningTotal = (runningTotal + customerValues[i]);
				arrScore.push([customerColl[i]._id,'A']);
			} else if (runningTotal < (customerTotal * ((profileColl[0].A + profileColl[0].B)/100))) {
				runningTotal = (runningTotal + customerValues[i]);
				arrScore.push([customerColl[i]._id,'B']);
			} else if (runningTotal < (customerTotal * ((profileColl[0].A + profileColl[0].B + profileColl[0].C)/100))) {
				runningTotal = (runningTotal + customerValues[i]);
				arrScore.push([customerColl[i]._id,'C']);
//console.log('customerTotal: '+customerTotal);
//console.log('profileMultiplier: '+((profileColl[0].A + profileColl[0].B + profileColl[0].C + profileColl[0].D)/100))
//console.log('runningTotal v profileTotal: '+runningTotal+' v '+(customerTotal * (profileColl[0].A + profileColl[0].B + profileColl[0].C + profileColl[0].D)/100));
			} else if (runningTotal < (customerTotal * ((profileColl[0].A + profileColl[0].B + profileColl[0].C + profileColl[0].D)/100))) {
				runningTotal = (runningTotal + customerValues[i]);
				arrScore.push([customerColl[i]._id,'D']);
			}
		});
//console.log(arrScore);
		return arrScore;
	}
});


/*

Meteor.methods({
	'calcGMCashRank': function () {

		var gmCashProfile = Profile.find({type: 'gmCash'}).fetch();
		var gmCashColl = Customers.find({}, {sort: {gmCash: -1}}).fetch();
		var gmCashAll = 0;
		var runningTotal = 0;

		_.each(gmCashColl, function (num, i) {
			gmCashAll = (gmCashAll + gmCashColl[i].gmCash);
		});

		var arrGMCash = [];
		var strVal;

		_.each(gmCashColl, function (num, i) {
	//console.log('runningTotal:'+runningTotal);
	//console.log('gmCashAll:'+gmCashAll);
	//console.log('multiplier:'+(gmCashProfile[0].A/100))
	//console.log('run v cashAll:'+runningTotal+' v '+(gmCashAll * (gmCashProfile[0].A/100)));
			if (runningTotal < (gmCashAll * (gmCashProfile[0].A/100))) {
				runningTotal = (runningTotal + gmCashColl[i].gmCash);
				arrGMCash.push([gmCashColl[i]._id,'A']);
	//console.log('gmCashAll:'+gmCashAll);
	//console.log('multiplier:'+((gmCashProfile[0].A + gmCashProfile[0].B)/100))
	//console.log('run v cashAll:'+runningTotal+' v '+(gmCashAll * (gmCashProfile[0].A + gmCashProfile[0].B)/100));
			} else if (runningTotal < (gmCashAll * ((gmCashProfile[0].A + gmCashProfile[0].B)/100))) {
				runningTotal = (runningTotal + gmCashColl[i].gmCash);
				arrGMCash.push([gmCashColl[i]._id,'B']);
	//console.log('gmCashAll:'+gmCashAll);
	//console.log('multiplier:'+((gmCashProfile[0].A + gmCashProfile[0].B + gmCashProfile[0].C)/100))
	//console.log('run v cashAll:'+runningTotal+' v '+(gmCashAll * (gmCashProfile[0].A + gmCashProfile[0].B + gmCashProfile[0].C)/100));
			} else if (runningTotal < (gmCashAll * ((gmCashProfile[0].A + gmCashProfile[0].B + gmCashProfile[0].C)/100))) {
				runningTotal = (runningTotal + gmCashColl[i].gmCash);
				arrGMCash.push([gmCashColl[i]._id,'C']);
	//console.log('gmCashAll:'+gmCashAll);
	//console.log('multiplier:'+((gmCashProfile[0].A + gmCashProfile[0].B + gmCashProfile[0].C + gmCashProfile[0].D)/100))
	//console.log('run v cashAll:'+runningTotal+' v '+(gmCashAll * (gmCashProfile[0].A + gmCashProfile[0].B + gmCashProfile[0].C + gmCashProfile[0].D)/100));
			} else if (runningTotal < (gmCashAll * ((gmCashProfile[0].A + gmCashProfile[0].B + gmCashProfile[0].C + gmCashProfile[0].D)/100))) {
				runningTotal = (runningTotal + gmCashColl[i].gmCash);
				arrGMCash.push([gmCashColl[i]._id,'D']);
			}
		});
//console.log(arrGMCash);
		return arrGMCash;
	}
});

*/