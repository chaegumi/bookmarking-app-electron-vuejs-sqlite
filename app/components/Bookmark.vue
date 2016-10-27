<template>
	<div @click="openLink" class="item">
		<div class="content">
			<i @click.stop="deleteBookmark" class="icon remove right-float"></i>
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

export default{
	props:['id', 'title', 'url', 'category', 'categoryColor'],
	methods:{
		deleteBookmark(){
			console.log('deleteBookmark');
			store.deleteBookmark(this.id)
		},
		openLink(){
			shell.openExternal(this.url)
		}
	}
}
</script>
