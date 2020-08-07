var app = new Vue({

	el: '#app',
	data: {
		product: 'Socks',
		image: './assets/vmSocks-green-onWhite.jpg',
		inStock: true,
		details: ['80% cotton', '20% polyster', 'Gender-neutral'],
		variants: [
			{
				variantId: 2234,
				variantColor: "green"
			},
			{
				variantId: 2235,
				variantColor: "blue"
			}
		],

		// Challenge

		size: 'Size', 

		sizes: [
			{
				sizeId: 001,
				sizeType: 'Small'
			},
			{
				sizeId: 002,
				sizeType: 'Medium'
			},
			{
				sizeId: 003,
				sizeType: 'Large'
			}
		]
	}

})