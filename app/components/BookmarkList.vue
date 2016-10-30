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
		:category_id="bookmark.category_id" 
		:categories="categories1">
      </bookmark>
		</div>
	</div>
</template>

<script>
import Bookmark from './Bookmark.vue';
import eventHub from '../shared/EventHub';

export default{
	data(){
		return {
			query:''
		}
	},
	props:['bookmarks1', 'categories1'],
	components:{
		Bookmark
	},
	watch:{
		query:function(keyword){
			eventHub.$emit('filter-by-title', keyword);
		}
	}
}
</script>
