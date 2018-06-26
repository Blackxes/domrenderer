//_____________________________________________________________________________________________
/**********************************************************************************************

	contains several container classes

	@Author: Alexander Bassov
	@Email: blackxes@gmx.de
	@Github: https://www.github.com/Blackxes

/*********************************************************************************************/

//_____________________________________________________________________________________________
// response class to communicate through the system
class Response = class ResponseClass {
	
	//_________________________________________________________________________________________
	constructor( type, msg, value, source ) {

		this.type = type || "no type given";
		this.msg = msg || null;
		this.value = value || null;
		this.source = source || null;
	}
}
exports.response = Response;

//_____________________________________________________________________________________________
//