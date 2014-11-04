	
//////////////////////////////////////////////////////////////////////////////////
// Session Management...
Session.setDefault('selectedCustomer', null);
Session.setDefault('gmCashId', null);
Session.setDefault('editingGMCash', null);
Session.setDefault('editingGMGroup', null);
Session.setDefault('gmCashArray', null);

Session.setDefault('ctsScore', null);
Session.setDefault('gmCashScore', null);
Session.setDefault('gmPercentScore', null);
Session.setDefault('TrendScore', null);
Session.setDefault('gmGroupScore', null);
Session.setDefault('COVOScore', null);
Session.setDefault('COVLScore', null);

Session.setDefault('ctsRank', null);
Session.setDefault('gmCashRank', null);
Session.setDefault('gmPercentRank', null);
Session.setDefault('TrendRank', null);
Session.setDefault('gmGroupRank', null);
Session.setDefault('COVORank', null);
Session.setDefault('COVLRank', null);

//////////////////////////////////////////////////////////////////////////////////
// Meteor Calls...
Meteor.call('calcRankThenScore', 'gmCash', function(err, result) {
    Session.set('gmCashArray', result);
});

//////////////////////////////////////////////////////////////////////////////////
// Display (these events apply to all child templates)
Template.display.events({
	'click .profile': function () {
		Session.set('editing', this._id);
	},
	'click .save': function () {
		var strA = $('#A').val();
		var strB = $('#B').val();
		var strC = $('#C').val();
		var strD = $('#D').val();
		Profile.update(this._id, {$set: {
			A: parseFloat(strA),
			B: parseFloat(strB),
			C: parseFloat(strC),
			D: parseFloat(strD)
		}});
		Session.set('editing', false);
	}
});

//////////////////////////////////////////////////////////////////////////////////
// CTS
Template.cts.helpers({
	profile: function () {
		return Profile.findOne({type: 'cts'});
	},
	ctsScore: function () {
		return Session.get('ctsScore');
	}
});

//////////////////////////////////////////////////////////////////////////////////
// GM$
Template.gmCash.helpers({
	profile: function () {
		return Profile.findOne({type: 'gmCash'});
	},
	gmCashScore: function () {
		return Session.get('gmCashScore');
	},
	gmCashId: function () {
		return Session.get('gmCashId');
	},
	gmCashRank: function () {
		return Session.get('gmCashRank');
	},
	gmCashArray: function () {
		return Session.get('gmCashArray');
	}
});

Template.gmCash.events({
	'click .save': function () {
		Meteor.call('calcRankThenScore', 'gmCash', function(err, result) {
		    Session.set('gmCashArray', result);
		});
	}
});

//////////////////////////////////////////////////////////////////////////////////
// GM%
Template.gmPercent.helpers({
	profile: function () {
		return Profile.findOne({type: 'gmPercent'});
	},
	gmPercentScore: function () {
		return Session.get('gmPercentScore');
	}
});

//////////////////////////////////////////////////////////////////////////////////
// Trend
Template.Trend.helpers({
	profile: function () {
		return Profile.findOne({type: 'Trend'});
	},
	trendScore: function () {
		return Session.get('TrendScore');
	}
});

//////////////////////////////////////////////////////////////////////////////////
// COVO
Template.COVO.helpers({
	profile: function () {
		return Profile.findOne({type: 'COVO'});
	},
	COVOScore: function () {
		return Session.get('COVOScore');
	}
});

//////////////////////////////////////////////////////////////////////////////////
// COVL
Template.COVL.helpers({
	profile: function () {
		return Profile.findOne({type: 'COVL'});
	},
	COVLScore: function () {
		return Session.get('COVLScore');
	}
});


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
// GROUPS

//////////////////////////////////////////////////////////////////////////////////
// gmGroup
Template.gmGroup.helpers({
	profile: function () {
		return Profile.findOne({type: 'gmGroup'});
	},
	selected: function () {
		// Determine if a customer has been selected
		if (Session.get('selectedCustomer') === null) {
			return 'empty'
		} else {
			return 'full'
		}
	}
});


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
// CUSTOMERS

//////////////////////////////////////////////////////////////////////////////////
// Customers
Template.customers.helpers({
	customer: function () {
		return Customers.find({});
	},
	selected: function () {
		if (this._id == Session.get('selectedCustomer')) {
			return 'info';
		}
	},
	gmCashArray: function () {
		return Session.get('gmCashArray');
	}	
});

Template.customers.events({
	'click .selectedCustomer': function () {
		Session.set('selectedCustomer', this._id);
		Session.set('ctsScore', this.cts);
		Session.set('gmCashScore', this.gmCash);
		Session.set('gmCashId', this._id);
		Session.set('gmPercentScore', this.gmPercent);
		Session.set('TrendScore', this.Trend);
		Session.set('COVOScore', this.COVO);
		Session.set('COVLScore', this.COVL);
	}
});

//////////////////////////////////////////////////////////////////////////////////
// Register Helpers...
Handlebars.registerHelper('calcRankAsc', function(profileScore, profileName) {
	var profile = Profile.find({type: profileName}).fetch();
	var profileNameRank = (profileName + 'Rank');

	if (profileScore === null) {
		return ''
	} else if (profileScore <= profile[0].A) {
		Session.set(profileNameRank, 'A');
		return 'A' 
	} else if (profileScore <= profile[0].B) {
		Session.set(profileNameRank, 'B');
		return 'B'
	} else if (profileScore <= profile[0].C) {
		Session.set(profileNameRank, 'C');
		return 'C'
	} else {
		Session.set(profileNameRank, 'D');
		return 'D'
	}
});

Handlebars.registerHelper('calcRankDesc', function(profileScore, profileName) {
	var profile = Profile.find({type: profileName}).fetch();
	var profileNameRank = (profileName + 'Rank');

	if (profileScore === null) {
		return ''
	} else if (profileScore >= profile[0].A) {
		Session.set(profileNameRank, 'A');
		return 'A' 
	} else if (profileScore >= profile[0].B) {
		Session.set(profileNameRank, 'B');
		return 'B'
	} else if (profileScore >= profile[0].C) {
		Session.set(profileNameRank, 'C');
		return 'C'
	} else {
		Session.set(profileNameRank, 'D');
		return 'D'
	}
});

Handlebars.registerHelper('editing', function() {
	return Session.equals('editing',this._id)
});

Handlebars.registerHelper("matchGMCashRank", function(item) {
	var gmCashId;

	if (item === undefined) {
		GMCashId = this._id;
	} else { 
		GMCashId = item;
	}

	var arrGMCashId = Session.get('gmCashArray');
	for (i=0; i < arrGMCashId.length; ++i) {
		if (GMCashId == arrGMCashId[i][0]) {
			Session.set('gmCashRank', arrGMCashId[i][1])
			return arrGMCashId[i][1];
		}
	}
});

Handlebars.registerHelper("calcGroupRank", function(selectedCustId, groupProfileName, groupMembers) {
	var groupProfile = Profile.find({type: groupProfileName}).fetch();
	var arrGroupMembers = groupMembers.split(',');
	var runningTotal = 0;
	var arrGroupProfile = new Array;

	if (selectedCustId == 'empty') {
		return ''
	} else {	

		arrGroupProfile.push(groupProfile[0].A);
		arrGroupProfile.push(groupProfile[0].B);
		arrGroupProfile.push(groupProfile[0].C);
		arrGroupProfile.push(groupProfile[0].D);

		for (i=0; i < arrGroupMembers.length; ++i) {
			var memberGrade = convertGrade(Session.get(arrGroupMembers[i]));
//console.log('session: '+Session.get(arrGroupMembers[i]));
//console.log('memberGrade: '+memberGrade);			
			var calculatedGrade = (memberGrade * (arrGroupProfile[i]/100));
//console.log('weightedGrade: '+calculatedGrade)
			runningTotal = (runningTotal + calculatedGrade);
//console.log('runningTotal: '+runningTotal);
		}
		var numRank = runningTotal;
		var letterGrade = convertRank(numRank);
		return letterGrade 
	} 
});

//////////////////////////////////////////////////////////////////////////////////
// Methods...
var convertGrade = function (letterGrade) {
	if (letterGrade === null) {
		return ''		
	} else if (letterGrade == 'A') {
		return 1 
	} else if (letterGrade == 'B') {
		return .8999
	} else if (letterGrade == 'C') {
		return .7999
	} else if (letterGrade == 'D') {
		return .6999
	}
}

var convertRank = function (numRank) {
	if (numRank === null) {
		return ''		
	} else if (numRank >= .90) {
		return 'A' 
	} else if (numRank >= .80) {
		return 'B'
	} else if (numRank >= .70) {
		return 'C'
	} else if (numRank >= .60) {
		return 'D'
	}
}