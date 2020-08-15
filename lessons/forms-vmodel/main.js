/*
 * Creating a component
 *
 * Vue.component('name', {options})
 */

 //Add a question to the form: “Would you recommend this product”. Then take in that response from the user via radio buttons of “yes” or “no” and add it to the productReview object, with form validation.

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

				<ul>
					<li v-for="detail in details"> {{ detail }} </li>
				</ul>

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

				<div>
					<h2>Reviews</h2>
					<p v-if="!reviews.length">There are no reviews yet.</p>
					<ul>
						<li v-for="review in reviews">
							<p>Customer: {{ review.name }}</p>
							<p>Comment: {{ review.review }} </p>
							<p>Rating: {{ review.rating }} </p>
							<p>Is recommend: {{ review.picked }} </p>
						</li>
					</ul>
				</div>

			</div>
			<product-review @review-submitted="AddReview"></product-review>
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
			],
			reviews: []
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
		},
		AddReview: function(productReview) {
			this.reviews.push(productReview) 
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

Vue.component('product-review', {
	template: `
	    <form class="review-form" @submit.prevent="onSubmit">

	      <p v-if="errors.length">
	      	<b>Please correct the following:</b>
	      	<ul>
	      		<li v-for="error in errors">{{ error }}</li>
	      	</ul>
	      </p>

	      <p>
	        <label for="name">Name:</label>
	        <input id="name" v-model="name" placeholder="name">
	      </p>
	      
	      <p>
	        <label for="review">Review:</label>      
	        <textarea id="review" v-model="review"></textarea>
	      </p>
	      
	      <p>
	        <label for="rating">Rating:</label>
	        <select id="rating" v-model.number="rating">
	          <option>5</option>
	          <option>4</option>
	          <option>3</option>
	          <option>2</option>
	          <option>1</option>
	        </select>
	      </p>
			<p>Would you recommend this product? </p>
			<input type="radio" id="yes" value="Yes" v-model="picked">
			<label for="yes">Yes</label>
			<br>
			<input type="radio" id="no" value="No" v-model="picked">
			<label for="no">No</label>
			<br>
	      <p>
	        <input type="submit" value="Submit">  
	      </p>    
	    
	    </form>
	`,
	data() {
		return {
			name: null,
			review: null,
			rating: null,
			picked: null,
			errors: []
		}
	},
	methods: {
		onSubmit() {
			if (this.name && this.review && this.rating && this.picked) {
				let productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating,
					picked: this.picked
				}
				this.$emit('review-submitted', productReview)
				this.name = null
				this.review = null
				this.rating = null
				this.picked = null

			} else {
				if (!this.name) this.errors.push("Name required.")
				if (!this.review) this.errors.push("Review required.")
				if (!this.rating) this.errors.push("Rating required.")
				if (!this.picked) this.errors.push("Please pick Yes or No.")

			}

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