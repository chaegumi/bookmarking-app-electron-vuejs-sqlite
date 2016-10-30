<template>
	<div>
		<div class="ui visible sidebar" id="categories">
			<div id="cat-header">
				<h2><i class="bookmark icon"></i> Bookmark</h2>
			</div>
			<div class="container">
				<h2>
					Categories
					<span class="clickable right-float">
						<i @click="addCategory" class="add icon"></i>
					</span>
				</h2>
				
				<div class="ui list">
					<div class="item clickable">
						<div class="content">
							<a class="ui grey empty circular label"></a>
							<span @click="categorySelected('')">All</span>
						</div>
					</div>
					<div v-for="(category, id) in categories" class="item clickable">
						<div class="content">
							<a v-bind:class="'ui ' + category.catColor + ' empty circular label'"></a>
							<span @dblclick="editCategory(id)" @click="categorySelected(id)" :class="{selected:selectedCategory === id}">
								{{category.catName}} ({{category.bookmarkCount}})
							</span>
								
							<i v-if="category.catName !== 'Uncategorized'" class="remove icon right-float"
								@click="deleteCategory(id)">
							</i>
							<i v-if="category.catName !== 'Uncategorized'" class="edit icon right-float"
								@click="editCategory(id)">
							</i>
						</div>
					</div>
				</div>
				<button @click="addBookmark" class="ui grey inverted basic icon circular button right-float">
					<i class="icon add"></i>
				</button>
			</div>
		</div>
		<category-modal></category-modal>
		<bookmark-modal :categories="categories"></bookmark-modal>
	</div>
</template>

<script>
import store from '../store'
import CategoryModal from './CategoryModal.vue'
import BookmarkModal from './BookmarkModal.vue'
import eventHub from '../shared/EventHub';

export default{
	data(){
		return {
			selectedCategory:''
		}
	},

	props:['categories'],
	components:{
		CategoryModal,
		BookmarkModal
	},

	methods:{
		addBookmark(){
			eventHub.$emit('add-bookmark')
		},

		addCategory(){
			eventHub.$emit('add-category')
		},
		
		editCategory(categoryId){
			eventHub.$emit('edit-category', categoryId);
		},

		deleteCategory(categoryId){
			if(confirm('Are you sure to delete this category?')){
				store.deleteCategory(categoryId)
			}
		},

		categorySelected(categoryId){
			this.selectedCategory = categoryId
			eventHub.$emit('category-selected', categoryId)
		}
	}
}
</script>
