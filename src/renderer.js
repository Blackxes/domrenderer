//_____________________________________________________________________________________________
/**********************************************************************************************

	controls dom rendering

	@Author: Alexander Bassov
	@Email: blackxes@gmx.de
	@Github: https://www.github.com/Blackxes

/*********************************************************************************************/

var Assistance = require( "./assistance.js" );
var Classes = require( "./classes.js" );
var HTParser = require( "js_htparser" );

//_____________________________________________________________________________________________
var Renderer = new class RendererClass {

	//_________________________________________________________________________________________
	constructor() {

		this.renderObjects = {}; // 
		this.objects = {} // collection of all currently rendered objects in the dom
	}

	//_____________________________________________________________________________________________
	// prerenders every template in the parser / its necessary for preparation purposes
	// when defining a markup for a render object the template id is checked
	// when the template is defined inline in another template the check will fail
	// and the renderobject not registered
	preRender() {

		let templates = HTParser.getTemplates();

		// prerender every template except the core templates
		for( let id in templates ) {
			HTParser.parse(id);
		}

		return true;
	}

	//_____________________________________________________________________________________________
	// renders the requested object / template id
	render( id, container ) {

		if ( !this.hasRenderObject(id) )
			return Assistance.respond( "notfound", `id '${id}' not found`, false );
		
		let renderObject = this.getRenderObject( id );
		let content = Parser.parse( id, renderObject.markup );

		if ( container ) {

			let el = document.querySelector(container);
			if ( !el )
				return Assistance.respond( "notfound", "invalid selector / no container", false, content );

			el.innerHTML = content;
		}
		
		return Assistance.respond( "ok", null, true, content );
	}

	//_____________________________________________________________________________________________
	// registers an object to be considered into rendering into the dom
	registerRenderObject( id, markup, options ) {
		
		if ( !HTParser.hasTemplate(id) )
			return Assistance.respond( "error", "invalid values", false, "registerRenderObject" );
		
		let renderObject = new Classes.renderObject( id, markup || {} );
		HTParser.setTemplateOptions( options );

		

		this.objects[ templateId ] = renderObject;
	}

	//_____________________________________________________________________________________________
	// returns a render object
	getRenderObject( id ) {

		return this.objects[id] || null;
	}

	//_____________________________________________________________________________________________
	// returns the existance of a render object as boolean
	hasRenderObject( id ) {
		return Boolean( this.objects[id] );
	}

	//_____________________________________________________________________________________________
	//
}
module.exports = Renderer;

//_____________________________________________________________________________________________
//
