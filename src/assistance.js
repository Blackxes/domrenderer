//_____________________________________________________________________________________________
/**********************************************************************************************

	general functionalities

	@Author: Alexander Bassov
	@Email: blackxes@gmx.de
	@Github: https://www.github.com/Blackxes

/*********************************************************************************************/

var Classes = require( "./classes.js" );

//_____________________________________________________________________________________________
// returns a solid random number between min and max
var getRandom = function( max, min = 0 ) {
	return Math.floor((Math.random() * 10000) % (max + 1 - min) + min)
}
exports.getRandom = getRandom;

//_____________________________________________________________________________________________
// return a "free id" from an object where the key is the key
var getFreeId = function( container ) {

	if ( !container || container.constructor !== Object )
		return null;
	
	let id = ++Object.keys( container ).length;
	while ( container[id] )
		id++;
	
	return id;
}
exports.getFreeId = getFreeId;

//_____________________________________________________________________________________________
// returns a random item from an / considering the given exceptions
//
// param1 (array) expects the array
// param2 (array) excepts the exceptions
//
// return mixed | null - item from given container or null
//
var getRandomItemFromArray = function( container, exceptions = null ) {

	if ( container && container.constructor !== Array || exceptions && exceptions.constructor !== Array )
		return false;

	let item = null;
	while ( true )	{
		let key = getRandom( container.length - 1 );
		if ( !exceptions || exceptions && exceptions.indefOf(container[key]) == -1 ) {
			item = container[key];
			break;
		}
	}
	
	return item;
}
exports.getRandomItemFromArray = getRandomItemFromArray;

//_____________________________________________________________________________________________
// returns an instance of a response
// more convenient than always writing "new Classes.response"
var respond = function( _type, msg, _value, source ) {

	let type = (_type == undefined) ? "ok" : _type;
	let value = (type == "error" && _value == undefined) ? false : _value || null;
	return new Classes.response( type, msg, value, source );
}
exports.respond = respond;

//_____________________________________________________________________________________________
//