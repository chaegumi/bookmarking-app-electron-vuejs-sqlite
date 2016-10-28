<template>
<div>
	<div id="addcat-modal" class="ui small modal">
		<i class="close icon"></i>
		<div class="header">
			Add a new category
		</div>
		<div class="content">

			<form class="ui form addcatform">
				<div class="field">
					<label>Category name</label>
					<input v-model="catName" type="text" required placeholder="Enter a category name...">
				</div>
				<div class="field">
					<label>Category Color</label>
					<select v-model="catColor" required class="ui simple dropdown">
						<option value="">Select a color</option>
						<option v-for="color in categoryColors">
							{{color}}
						</option>
					</select>
				</div>
			</form>
		</div>
		<div class="actions">
			<div @click="addCategory" class="ui purple inverted button">Save</div>
		</div>
	</div>
		<div id="editcat-modal" class="ui small modal">
		<i class="close icon"></i>
		<div class="header">
			Edit a category
		</div>
		<div class="content">
			<form class="ui form editcatform">
				<div class="field">
					<label>Category name</label>
					<input v-model="catName" required type="text" placeholder="Enter a category name...">
				</div>
				<div class="field">
					<label>Category Color</label>
					<select v-model="catColor" required class="ui simple dropdown">
						<option value="">Select a color</option>
						<option v-for="color in categoryColors">
							{{color}}
						</option>
					</select>
				</div>
			</form>
		</div>
		<div class="actions">
			<div @click="editCategory(catId)" class="ui purple inverted button">Save</div>
		</div>
	</div>
</div>	
</template>

<script>
import store from '../store'
import eventHub from '../shared/EventHub';

export default {
	data(){
		return {
			catId:0,
			catName:'',
			catColor:'',
			categoryColors:['red', 'orange', 'yellow', 'olive', 'green',
          'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
		}
	},

	methods:{
		addCategory () {
			var newCategory = {
				catName:this.catName,
				catColor:this.catColor
			}
			// newCategory[this.catName] = this.catColor
			store.addCategory(newCategory)
			$('#addcat-modal').modal('hide');
		},
		addCategoryForm:function(){
			this.catName = this.catColor = '';
			
			$('#addcat-modal').modal('show');
			
		},
		
		editCategory(){
			var newCategory = {
				catName:this.catName,
				catColor:this.catColor
			};
			store.editCategory(this.catId, newCategory);
			$('#editcat-modal').modal('hide');
		},
		editCategoryForm:function(catId){
			store.getCategory(catId, (err, category) => {
				if(err){
				}else{
					this.catId = category.id;
					this.catName = category.catName;
					this.catColor = category.catColor;
					$('#editcat-modal').modal('show');
				}
			});
		}
	},

	mounted:function(){
		eventHub.$on('add-category', this.addCategoryForm);
		eventHub.$on('edit-category', this.editCategoryForm);
	},

	beforeDestroy:function(){
		eventHub.$off('add-category', this.addCategoryForm);
		eventHub.$off('edit-category', this.editCategoryForm);
	}
}
</script>
