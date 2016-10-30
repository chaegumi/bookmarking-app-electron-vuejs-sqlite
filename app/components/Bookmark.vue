<template>
	<div @click="openLink" class="item">
		<div class="content">
			<i @click.stop="deleteBookmark" class="icon remove right-float"></i>
			<i @click.stop="editBookmark" class="icon edit right-float"></i>
			<a class="header">{{title}}</a>
			<div class="description">
				{{url}}
				<a v-bind:class="'ui ' + categoryColor + ' tiny label right-float'">{{category}}</a>
			</div>
		</div>
	</div>
</template>

<script>
import {shell} from 'electron'
import store from '../store'
import eventHub from '../shared/EventHub';

export default{
	/*data(){
		return {
			category:'',
			categoryColor:''
		}
	},*/
	props:['id', 'title', 'url', 'categories', 'category_id'],
	computed:{
		category:function(){
			if(this.categories.hasOwnProperty(this.category_id)){
				return this.categories[this.category_id].catName;
			}else{
				return '';
			}
		},
		categoryColor:function(){
			if(this.categories.hasOwnProperty(this.category_id)){
				return this.categories[this.category_id].catColor;
			}else{
				return '';
			}
		}
	},
	methods:{
		deleteBookmark(){
			if(confirm('Are you sure to delete this bookmark?')){
				store.deleteBookmark(this.id)
			}
		},
		editBookmark(){
			eventHub.$emit('edit-bookmark', this.id);
		},
		openLink(){
			shell.openExternal(this.url)
		}
	}
}
</script>
