<template>
<div>
  <div id="addbookmark-modal" class="ui small modal">
    <i class="close icon"></i>
    <div class="header">
      Add a new bookmark
    </div>
    <div class="content">

      <form class="ui form" @submit.prevent="addBookmark">
        <div class="field">
          <label>Bookmark Title</label>
          <input v-model="bookmarkTitle" v-validate.initial="bookmarkTitle" data-rules="required" type="text" placeholder="Enter a title for your bookmark...">
		  <span class="ui pointing red basic label" v-show="errors.has('bookmarkTitle')">{{ errors.first('bookmarkTitle') }}</span>
        </div>
        <div class="field">
          <label>Bookmark URL</label>
          <input v-model="bookmarkUrl" v-validate.initial="bookmarkUrl" data-rules="required|url" type="text"  placeholder="Enter the URL for your bookmark...">
		  <span class="ui pointing red basic label" v-show="errors.has('bookmarkUrl')">{{ errors.first('bookmarkUrl') }}</span>
        </div>
        <div class="field">
          <label>Bookmark category</label>
          <select v-model="bookmarkCategory" v-validate.initial="bookmarkCategory" data-rules="required" class="ui simple dropdown">
            <option value="">Select a category</option>
            
            <option v-for="(category, id) in categories" v-bind:value="id">{{ category.catName }}</option>
            
          </select>
		  <span class="ui pointing red basic label" v-show="errors.has('bookmarkCategory')">{{ errors.first('bookmarkCategory') }}</span>
        </div>
		<div class="">
		  <button type="submit" class="ui inverted purple button">Save</button>
		</div>
      </form>

    </div>

  </div>
  
  <div id="editbookmark-modal" class="ui small modal">
    <i class="close icon"></i>
    <div class="header">
      Edit a bookmark
    </div>
    <div class="content">

      <form class="ui form" @submit.prevent="editBookmark(bookmarkId)">
        <div class="field">
          <label>Bookmark Title</label>
          <input v-model="bookmarkTitle" v-validate.initial="bookmarkTitle" data-rules="required" type="text" placeholder="Enter a title for your bookmark...">
		  <span class="ui pointing red basic label" v-show="errors.has('bookmarkTitle')">{{ errors.first('bookmarkTitle') }}</span>
        </div>
        <div class="field">
          <label>Bookmark URL</label>
          <input v-model="bookmarkUrl" v-validate.initial="bookmarkUrl" data-rules="required|url" type="text"  placeholder="Enter the URL for your bookmark...">
		  <span class="ui pointing red basic label" v-show="errors.has('bookmarkUrl')">{{ errors.first('bookmarkUrl') }}</span>
        </div>
        <div class="field">
          <label>Bookmark category</label>
          <select v-model="bookmarkCategory" v-validate.initial="bookmarkCategory" data-rules="required" class="ui simple dropdown">
            <option value="">Select a category</option>
            
            <option v-for="(category, id) in categories" v-bind:value="id">{{ category.catName }}</option>
            
          </select>
		  <span class="ui pointing red basic label" v-show="errors.has('bookmarkCategory')">{{ errors.first('bookmarkCategory') }}</span>
        </div>
		<div class="">
		  <button type="submit" class="ui inverted purple button">Save</button>
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

    data () {
      return {
		bookmarkId:0,
        bookmarkTitle: '',
        bookmarkUrl: '',
        bookmarkCategory: 0
      }
    },

    props: ['categories'],

    methods: {

      addBookmark () {
		this.$validator.validateAll();
			
		if(!this.errors.any()){
			const newBookmark = {
			  title: this.bookmarkTitle,
			  url: this.bookmarkUrl,
			  category_id: this.bookmarkCategory
			}
			store.addBookmark(newBookmark)
			$('#addbookmark-modal').modal('hide');
		}
      },

      addBookmarkForm:function(){
        this.bookmarkTitle = this.bookmarkUrl = this.bookmarkCategory = ''
        $('#addbookmark-modal').modal('show')
      },
	  
	  editBookmark () {
		this.$validator.validateAll();
			
		if(!this.errors.any()){	  
			const newBookmark = {
				title:this.bookmarkTitle,
				url:this.bookmarkUrl,
				category_id:this.bookmarkCategory
			};
			store.editBookmark(this.bookmarkId, newBookmark);
			$('#editbookmark-modal').modal('hide');
		}
	  },
	  
	  editBookmarkForm:function(id){
		// console.log(id);
		// this.bookmarkTitle = this.bookmarkUrl = this.bookmarkCategory = '';
		store.getBookmark(id, (err, bookmark) => {
			if(err){
				
			}else{
				this.bookmarkId = id;
				this.bookmarkTitle = bookmark.title;
				this.bookmarkUrl = bookmark.url;
				this.bookmarkCategory = bookmark.category_id;
				$('#editbookmark-modal').modal('show');
			}
		});
	  }

    },

    mounted:function(){
      eventHub.$on('add-bookmark', this.addBookmarkForm);
	  eventHub.$on('edit-bookmark', this.editBookmarkForm);
    },

    beforeDestroy:function(){
      eventHub.$off('add-bookmark', this.addBookmarkForm);
	  eventHub.$off('edit-bookmark', this.editBookmarkForm);
    }

  }
</script>
