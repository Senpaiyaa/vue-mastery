var app = new Vue({

	el: '#app',
	data: {
		product: 'Socks',
		image: './assets/vmSocks-green-onWhite.jpg',
		inStock: false,
		details: ['80% cotton', '20% polyster', 'Gender-neutral'],
		variants: [
			{
				variantId: 2234,
				variantColor: "green",
				variantImage: './assets/vmSocks-green-onWhite.jpg'
			},
			{
				variantId: 2235,
				variantColor: "blue",
				variantImage: './assets/bluesocks.png'
			}
		],
		cart: 0
	},

	methods: {
		AddToCart: function() {
			this.cart += 1
		},
		UpdateProduct: function(variantImage) {
			this.image = variantImage
		}
	}

})