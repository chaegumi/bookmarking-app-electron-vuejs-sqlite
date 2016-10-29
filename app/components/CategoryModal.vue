<template>
<div>
	<div id="addcat-modal" class="ui small modal">
		<i class="close icon"></i>
		<div class="header">
			Add a new category
		</div>
		<div class="content">

			<form class="ui form addcatform" @submit.prevent="addCategory">
				<div :class="{'field':true, 'error':errors.has('catName')}">
					<label>Category name</label>
					<input v-model="catName" type="text" v-validate.initial="catName" data-rules="required" placeholder="Enter a category name...">
					<span class="ui pointing red basic label" v-show="errors.has('catName')">{{ errors.first('catName') }}</span>
				</div>
				<div :class="{'field':true, 'error':errors.has('catColor')}">
					<label>Category Color</label>
					<select v-model="catColor" v-validate.initial="catColor" data-rules="required" class="ui simple dropdown">
						<option value="">Select a color</option>
						<option v-for="color in categoryColors">
							{{color}}
						</option>
					</select>
					<span class="ui pointing red basic label" v-show="errors.has('catColor')">{{ errors.first('catColor') }}</span>
				</div>
				<div class="">
					<button type="submit" class="ui purple inverted button">Save</button>
				</div>
			</form>
		</div>

	</div>
		<div id="editcat-modal" class="ui small modal">
		<i class="close icon"></i>
		<div class="header">
			Edit a category
		</div>
		<div class="content">
			<form class="ui form editcatform" @submit.prevent="editCategory(catId)">
				<div class="field">
					<label>Category name</label>
					<input v-model="catName" v-validate.initial="catName" data-rules="required" type="text" placeholder="Enter a category name...">
					<span class="ui pointing red basic label" v-show="errors.has('catName')">{{ errors.first('catName') }}</span>
				</div>
				<div class="field">
					<label>Category Color</label>
					<select v-model="catColor" v-validate.initial="catColor" data-rules="required" class="ui simple dropdown">
						<option value="">Select a color</option>
						<option v-for="color in categoryColors">
							{{color}}
						</option>
					</select>
					<span class="ui pointing red basic label" v-show="errors.has('catName')">{{ errors.first('catName') }}</span>
				</div>
				<div class="">
					<button type="submit" class="ui purple inverted button">Save</button>
				</div>
			</form>
		</div>

	</div>
</div>	
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
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
			this.$validator.validateAll();
			
			if(!this.errors.any()){
				var newCategory = {
					catName:this.catName,
					catColor:this.catColor
				}
				
				store.addCategory(newCategory)
				$('#addcat-modal').modal('hide');
			}

		},
		addCategoryForm:function(){
			this.catName = this.catColor = '';
			
			$('#addcat-modal').modal('show');
			
		},
		
		editCategory(){
			this.$validator.validateAll();
			
			if(!this.errors.any()){
				var newCategory = {
					catName:this.catName,
					catColor:this.catColor
				};
				store.editCategory(this.catId, newCategory);
				$('#editcat-modal').modal('hide');
			}		

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
