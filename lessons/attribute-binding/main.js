// Setup vue instance 
var app = new Vue({

	/**
	* Properties:
	*
	* el -> this property plugs intance in to the div with the id of app
	* data -> give the instance a product whole value is Socks
	*/

	el: '#app',
	data: {
		product: 'Socks',
		// product: 'Boots'
		// image: './assets/vmSocks-green-onWhite.jpg',
		image: './assets/bluesocks.png',
		description: 'socks description',
		url: 'https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578366211820_6.png?alt=media&token=8d11c5b3-5741-414c-a7ad-6d830f2f4229',
		tooltip: 'where this socks come from tho?',
		target: '_new'

	}

})