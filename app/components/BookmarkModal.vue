<template>
<div>
  <div id="addbookmark-modal" class="ui small modal">
    <i class="close icon"></i>
    <div class="header">
      Add a new bookmark
    </div>
    <div class="content">

      <form class="ui form">
        <div class="field">
          <label>Bookmark Title</label>
          <input v-model="bookmarkTitle" type="text" required placeholder="Enter a title for your bookmark...">
        </div>
        <div class="field">
          <label>Bookmark URL</label>
          <input v-model="bookmarkUrl" type="text" required placeholder="Enter the URL for your bookmark...">
        </div>
        <div class="field">
          <label>Bookmark category</label>
          <select v-model="bookmarkCategory" required class="ui simple dropdown">
            <option value="">Select a category</option>
            <template v-for="(category, id) in categories">
              <option>{{ category.catName }}</option>
            </template>
          </select>
        </div>
      </form>

    </div>
    <div class="actions">
      <div @click="addBookmark" class="ui inverted purple button">Save</div>
    </div>
  </div>
  
  <div id="editbookmark-modal" class="ui small modal">
    <i class="close icon"></i>
    <div class="header">
      Edit a bookmark
    </div>
    <div class="content">

      <form class="ui form">
        <div class="field">
          <label>Bookmark Title</label>
          <input v-model="bookmarkTitle" type="text" required placeholder="Enter a title for your bookmark...">
        </div>
        <div class="field">
          <label>Bookmark URL</label>
          <input v-model="bookmarkUrl" type="text" required placeholder="Enter the URL for your bookmark...">
        </div>
        <div class="field">
          <label>Bookmark category</label>
          <select v-model="bookmarkCategory" required class="ui simple dropdown">
            <option value="">Select a category</option>
            <template v-for="(category, id) in categories">
              <option>{{ category.catName }}</option>
            </template>
          </select>
        </div>
      </form>

    </div>
    <div class="actions">
      <div @click="editBookmark(bookmarkId)" class="ui inverted purple button">Save</div>
    </div>
  </div>  
</div>
</template>

<script>
  import store from '../store'
  import eventHub from '../shared/EventHub';

  export default {

    data () {
      return {
		bookmarkId:0,
        bookmarkTitle: '',
        bookmarkUrl: '',
        bookmarkCategory: ''
      }
    },

    props: ['categories'],

    methods: {

      addBookmark () {
        const newBookmark = {
          title: this.bookmarkTitle,
          url: this.bookmarkUrl,
          category: this.bookmarkCategory
        }
        store.addBookmark(newBookmark)
        $('#addbookmark-modal').modal('hide');
      },

      addBookmarkForm:function(){
        this.bookmarkTitle = this.bookmarkUrl = this.bookmarkCategory = ''
        $('#addbookmark-modal').modal('show')
      },
	  
	  editBookmark () {
		const newBookmark = {
			title:this.bookmarkTitle,
			url:this.bookmarkUrl,
			category:this.bookmarkCategory
		};
		store.editBookmark(this.bookmarkId, newBookmark);
		$('#editbookmark-modal').modal('hide');
	  },
	  
	  editBookmarkForm:function(id){
		// console.log(id);
		// this.bookmarkTitle = this.bookmarkUrl = this.bookmarkCategory = '';
		store.getBookmark(id, (err, bookmark) => {
			if(err){
				
			}else{
				this.bookmarkId = id;
				// console.log(bookmark);
				this.bookmarkTitle = bookmark.title;
				this.bookmarkUrl = bookmark.url;
				this.bookmarkCategory = bookmark.category;
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
