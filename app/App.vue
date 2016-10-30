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
		  :categories1="categories">
		</bookmark-list>
	</div>
</template>

<script>
	// the Javascript for our component
	// We will export a Vue component options object here
	import store from './store';
	import Sidebar from './components/Sidebar.vue';
	import BookmarkList from './components/BookmarkList.vue'
	import eventHub from './shared/EventHub';

	export default{
		components:{
			Sidebar,
			BookmarkList
		},

		data(){
			return {
				categories: {},
				bookmarks: {},
				selectedCategory:''
			}
		},
		beforeMount(){
			this.updateListings();
		},
		mounted(){
			store.on('data-updated', this.updateListings);
			eventHub.$on('category-selected', this.setSelectedCategory);
			eventHub.$on('filter-by-title', this.filterByTitle);
		},
		methods:{
			updateListings(){
				store.getCategories((err, categories) => {
					if(err){
						//console.log(err);
					}else{
						// console.log(categories);
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
				if(!categoryId){
					store.getBookmarks((err, bookmarks) => {
						if(err){

						}else{
							this.bookmarks = bookmarks;
						}
					});
				}else{
					this.selectedCategory = categoryId;
					store.getBookmarks((err, bookmarks) => {
						if(err){

						}else{
							var filteredBookmarks = {};
							for(var bookmark in bookmarks){
								if(bookmarks[bookmark].category_id == categoryId){
									filteredBookmarks[bookmark] = bookmarks[bookmark]; 
								}
							}
							
							this.bookmarks = filteredBookmarks; 
						}
					});										
				}
			},
			filterByTitle(keyword){
				store.getBookmarks((err, bookmarks) => {
					if(err){

					}else{
						var filteredBookmarks = {};
						for(var bookmark in bookmarks){
							if(bookmarks[bookmark].title.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
								filteredBookmarks[bookmark] = bookmarks[bookmark]; 
							}
						}
						
						this.bookmarks = filteredBookmarks; 
					}
				});
			}
		}
	}
</script>
