var app = new Vue({

	el: '#app',

	// data properties

	data: {
		brand: 'Vue mastery',
		product: 'Socks',
		selectedVariant: 0,
		details: ['80% cotton', '20% polyster', 'Gender-neutral'],
		variants: [
			{
				variantId: 2234,
				variantColor: "green",
				variantImage: './assets/vmSocks-green-onWhite.jpg',
				variantQuantity: 10
			},
			{
				variantId: 2235,
				variantColor: "blue",
				variantImage: './assets/bluesocks.png',
				variantQuantity: 0
			}
		],
		cart: 0,
		onSale: true
	},

	// methods properties

	methods: {
		AddToCart: function() {
			this.cart += 1
		},
		UpdateProduct: function(index) {
			this.selectedVariant = index
			console.log(index)
		}
	},

	// computed properties

	computed: {
		title() {
			return this.brand + ' ' + this.product
		},
		image() {
			return this.variants[this.selectedVariant].variantImage
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity
		},

		// challenge
		
		sale() {
          if (this.onSale) {
            return this.brand + ' ' + this.product + ' are on sale!'
          } 
            return  this.brand + ' ' + this.product + ' are not on sale'
		}
	}

})