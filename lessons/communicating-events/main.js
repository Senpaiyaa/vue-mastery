/*
 * Creating a component
 *
 * Vue.component('name', {options})
 */


 //Create a new component for product-details with a prop of details. 

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
		<ul>
			<li v-for="detail in details"> {{ detail }} </li>
		</ul>
  `
})


Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
		<div class="product">

			<div class="product-image">
				<img :src="image">
			</div>

			<div class="product-info">
				<h1> {{ title }} </h1>
				<p v-if="inStock">In Stock</p>
				<p v-else>Out of Stock</p>
				<p>Shipping: {{ shipping }}</p>

				<product-details :details="details"></product-details>

				<div v-for="(variant, index) in variants" 
					:key="variant.variantId"
					class="color-box"
					:style="{ backgroundColor: variant.variantColor }"
					@mouseover="UpdateProduct(index)">

				</div>

				<!-- Adding a method on click -->
				<button v-on:click="AddToCart" 
						:disabled="!inStock"
						:class="{ disabledButton: !inStock }">Add to cart</button>
			</div>

		</div>

	`,

	data() {
		return 	{
			brand: 'Vue mastery',
			product: 'Socks',
			selectedVariant: 0,
			details: ['80% cotton', '20% polyster', 'Gender-neutral'],
			variants: [
				{
					variantId: 2234,
					variantColor: "green",
					variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
					variantQuantity: 10
				},
				{
					variantId: 2235,
					variantColor: "blue",
					variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
					variantQuantity: 0
				}
			]
		}
	},

	// methods properties

	methods: {
		AddToCart: function() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
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
		shipping() {
			if (this.premium) {
				return "Free"
			}
			return 2.99
		}
	}

})

var app = new Vue({
	el: '#app',
	data: {
		premium: false,
		cart: []

	},
	methods: {
		updateCart(id) {
			this.cart.push(id)
		}
	}
})