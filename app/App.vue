<template>
	<!-- The HTML template for our component -->
	<div id="app">{{categories}} {{bookmarks}}
		<textarea v-model="bookmarks"></textarea>
		<textarea v-model="categories"></textarea>
		<sidebar
			:categories="categories"
			v-on:category-selected="setSelectedCategory">
		</sidebar>
		<bookmark-list
		  :bookmarks1="bookmarks"
		  :categories="categories">
		</bookmark-list>
	</div>
</template>

<script>
	// the Javascript for our component
	// We will export a Vue component options object here
	import store from './store';
	import Sidebar from './components/Sidebar.vue';
	import BookmarkList from './components/BookmarkList.vue'
	import { filterByCategory } from './filters'

	export default{
		components:{
			Sidebar,
			BookmarkList
		},

		data(){
			return {
				categories: new Object(),
				bookmarks: new Object(),
				selectedCategory:''
			}
		},
		beforeMount(){
			var bookmarks = store.getBookmarks();
			var categories = store.getCategories();

var bookmarks2 = {};
bookmarks2 = bookmarks;
		var bookmarks3 = {
    "-KE-NI-AQIM8L3ZC8_Ek" : {
      "category" : "Development",
      "title" : "Real-Time Analytics Dashboard",
      "url" : "http://coligo.io/real-time-analytics-with-nodejs-socketio-vuejs/"
    },
    "-KE-Od9opi-E7KvvG-LG" : {
      "category" : "Development",
      "title" : "Building Large-Scale Apps - VueJs",
      "url" : "http://vuejs.org/guide/application.html"
    },
    "-KE-OzR79eW51MP6B-B_" : {
      "category" : "Development",
      "title" : "Firebase Web Quickstart",
      "url" : "https://www.firebase.com/docs/web/quickstart.html"
    },
    "-KE-P94aT_jmOfUJWEJX" : {
      "category" : "Development",
      "title" : "Get started with Electron",
      "url" : "http://electron.atom.io/"
    }
  };
	console.dir(bookmarks2);
	console.dir(bookmarks3);
		this.bookmarks = bookmarks3;
		this.categories = {
    "Development" : "blue",
    "Design" : "purple"
  };
			//this.$set(this.data.bookmarks, bookmarks);
		//	this.$set(this.data.categories, categories);
			console.log(categories);
		},
	/*	computed:{
			bookmarks:store.getBookmarks(),
			categories:store.getCategories()
		},*/
/*
		filters:{
			filterByCategory
		},*/
		mounted(){
			//this.loadListings();
			console.log('listen data-updated');
			store.on('data-updated', this.updateListings)
			//store.changedata();
		},
		beforeUpdate(){
			console.log()
		},
		methods:{
			loadListings(){
				store.changedata();
			},
			updateListings(categories, bookmarks){
				console.log(categories);
				console.log(bookmarks);
				this.categories = categories;
				this.bookmarks = bookmarks;
			},
			setSelectedCategory(category){
				this.selectedCategory = category;
			}
		}
	}
</script>
