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
			this.updateListings();
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
			store.on('data-updated', this.updateListings)
		},
		methods:{
			updateListings(){
				store.getCategories((err, categories) => {
					if(err){

					}else{
						this.categories = categories;
					}
				});
				store.getBookmarks((err, bookmarks) => {
					if(err){

					}else{
						this.bookmarks = bookmarks;
					}
				});
			},
			setSelectedCategory(categoryId){
				this.selectedCategory = categoryId;
			}
		}
	}
</script>
