<template>
	<div id="links-container">
		<div id="toolbar">
			<div class="ui inverted icon fluid input">
				<input v-model="query" type="text" placeholder="Filter your links...">
				<i class="search icon"></i>
			</div>
		</div>
		<div class="ui relaxed divided selection list">
			<bookmark v-for="(bookmark, id) in bookmarks1"
        :id="id"
        :title="bookmark.title"
        :url="bookmark.url"
        :category="bookmark.category"
        :category-color="categories[bookmark.category]">
      </bookmark>
		</div>
	</div>
</template>

<script>
import Bookmark from './Bookmark.vue';
import { filterByTitle } from '../filters';

export default{
	data(){
		return {
			query:''
		}
	},
	props:['bookmarks1', 'categories'],
	components:{
		Bookmark
	},
	created:function(){
		console.log(this.bookmarks1);
		console.log(this.categories);
	},
	computed:{
		bookmarks:filterByTitle
	}
	/*filters:{
		filterByTitle
	}*/
}
</script>
