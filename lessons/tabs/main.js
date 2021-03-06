//Create tabs for “Shipping” and “Details” that display the shipping cost and product details, respectively.

/*
 * @var eventBus
 * 
 * Main purpose of this global variable 
 * is to communicate with 'product-review' 
 * and other components
 */

var eventBus  = new Vue()

// Product component

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

				<information-tab :shipping="shipping" :details="details"></information-tab>


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

			<product-tabs :reviews="reviews"></product-tabs>

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
	},
	mounted() {
		eventBus.$on('review-submitted', productReview => {
			this.reviews.push(productReview) 
		})
	}

})

// Product review component

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
	        <input id="name" v-model="name">
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
			errors: []
		}
	},
	methods: {
		onSubmit() {
			this.errors = []
			if (this.name && this.review && this.rating) {
				let productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating,
				}
				eventBus.$emit('review-submitted', productReview)
				this.name = null
				this.review = null
				this.rating = null

			} else {
				if (!this.name) this.errors.push("Name required.")
				if (!this.review) this.errors.push("Review required.")
				if (!this.rating) this.errors.push("Rating required.")

			}

		}
	}
})

// Tabs component

Vue.component('product-tabs', {
	props: {
		reviews: {
			type: Array,
			required: true
		}
	},
	template: `
		<div>
			<span class="tab"
				  :class="{ activeTab: selectedTab ===  tab }"
				  v-for="(tab, index) in tabs" :key="index"
				  @click="selectedTab = tab"> {{ tab }} </span>

			<div v-show="selectedTab === 'Reviews'">
				<p v-if="!reviews.length">There are no reviews yet.</p>
				<ul v-else>
					<li v-for="(review, index) in reviews"
						:key="index">
						<p>{{ review.name }}</p>
						<p>Rating: {{ review.rating }} </p>
						<p>{{ review.review }} </p>
					</li>
				</ul>
			</div>

			<product-review v-show="selectedTab === 'Make a Review'"></product-review>

		</div>
	`,
	data() {
		return {
			tabs: ['Reviews', 'Make a Review'],
			selectedTab: 'Reviews'
		}
	}
})

Vue.component('information-tab', {
	props: {
		shipping: {
			required: true

		},
		details: {
			type: Array,
			required: true
		}
	},
	template: `
		<div>
			<span class="tab" 
				  v-for="(tab, index) in tabs" :key="index"
				  @click="selectedTab = tab"
				  :class="{ activeTab: selectedTab === tab }">{{ tab }}</span>

			<div v-show="selectedTab === 'Shipping'">
				<p>{{ shipping }}</p>
			</div>

			<div v-show="selectedTab === 'Details'">
				<ul>
					<li v-for="detail in details"> {{ detail }} </li>
				</ul>

			</div>

		</div>
	`,
	data() {
		return {
			tabs: ['Shipping', 'Details'],
			selectedTab: 'Shipping'
		}
	}
})

var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: []

	},
	methods: {
		updateCart(id) {
			this.cart.push(id)
		}
	}
})