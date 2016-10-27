import { EventEmitter } from 'events';
//import Firebase from 'firebase';

// const db= new Firebase("https://vuejstest-78852.firebaseio.com/");
// const categoriesRef = db.child('categories');
// const bookmarkRef = db.child('bookmarks');
const store = new EventEmitter();

let categories = {};
let bookmarks = {};
/*
db.on('value', (snapshot) => {
	var bookmarkData = snapshot.val();
	if	(bookmarkData) {
		categories = bookmarkData.categories;
		bookmarks = bookmarkData.bookmarks;
		store.emit('data-update', categories, bookmarks);
	}
});
*/
/*
categories = {
    "Development" : "blue",
    "Design" : "purple"
  };
bookmarks = {
    "-KE-NI-AQIM8L3ZC8_Ek" : {
      "category" : "Development",
      "title" : "Real-Time Analytics Dashboard",
      "url" : "http://coligo.io/real-time-analytics-with-nodejs-socketio-vuejs/"
    },
    "-KE-Od9opi-E7KvvG-LG" : {
      "category" : "Development",
      "title" : "Building Large-Scale Apps - VueJs",
      "url" : "http://vuejs.org/guide/application.html"
    },
    "-KE-OzR79eW51MP6B-B_" : {
      "category" : "Development",
      "title" : "Firebase Web Quickstart",
      "url" : "https://www.firebase.com/docs/web/quickstart.html"
    },
    "-KE-P94aT_jmOfUJWEJX" : {
      "category" : "Development",
      "title" : "Get started with Electron",
      "url" : "http://electron.atom.io/"
    }
  };
store.emit('data-update', categories, bookmarks);
*/



store.changedata = function(){
	// search categories

	db.each("select catName, catColor from categories", function(err, row){
		categories[row.catName] = row.catColor;
	});
	// search bookmarks
	db.each("select id, category, title, url from bookmarks", function(err, row){
		bookmarks[row.id] = row;
	});
  console.log(categories);
	console.log(bookmarks);
	store.emit('data-updated', categories, bookmarks);
}

store.getCategories = function(){
	db.each("select catName, catColor from categories", function(err, row){
		//categories[row.catName] = row.catColor;
		Object.defineProperty(categories, row.catName, {
			get:function(){
				return row.catColor;
			},
			set:function(val){
				categories[row.catName] = row.catColor;
			}
		});
	});
	return categories;
}

store.getBookmarks = function(){
	db.each("select id, category, title, url from bookmarks", function(err, row){
		//bookmarks[row.id] = row;
		Object.defineProperty(bookmarks, row.id, {
			get:function(){
				return row;
			},
			set:function(val){
				bookmark[row.id] = val;
			}
		});
	});
	return bookmarks;
}

store.addCategory = (category) => {
	// categoriesRef.update(category);
	// console.log(category);
	db.serialize(function(){
		var stmt = db.prepare("insert into categories('catName', 'catColor') values(?, ?)");
		for (var var1 in category) {
			stmt.run(var1, category[var1]);
		}
		//stmt.finalize();

		// update state
		// store.changedata();
		db.serialize(function(){
			db.each("select catName, catColor from categories", function(err, row){
				categories[row.catName] = row.catColor;
			});
			db.each("select id, category, title, url from bookmarks", function(err, row){
				bookmarks[row.id] = row;
			});
			console.log(categories);
			console.log(bookmarks);
			store.emit('data-updated', categories, bookmarks);
		});

	});



}

store.deleteCategory = (catName) => {
/*	if(!('Uncategorized' in categories)){
		categoriesRef.update({'Uncategorized' : 'white'});
	}

	for(var key in bookmarks){
		if(bookmarks[key].category === catName){
			bookmarksRef.child(key).update({category:'Uncategorized'});
		}
	}
	categoriesRef.child(catName).remove();*/
	db.serialize(function(){

		console.log(catName);

		var stmt = db.prepare("delete from categories where catName=?");
		stmt.run(catName);
		//stmt.finalize();
		db.serialize(function(){
			db.each("select catName, catColor from categories", function(err, row){
				categories[row.catName] = row.catColor;
			});
			db.each("select id, category, title, url from bookmarks", function(err, row){
				bookmarks[row.id] = row;
			});
			store.emit('data-updated', categories, bookmarks);
		});


	});

}


store.addBookmark = (bookmark) => {
	// bookmarksRef.push(bookmark);
	console.log(bookmark);
	db.serialize(function(){
		var stmt = db.prepare("insert into bookmarks('category', 'title', 'url') values(?, ?, ?)");
		stmt.run(bookmark.category, bookmark.title, bookmark.url);
		//stmt.finalize();
		db.serialize(function(){
			db.each("select catName, catColor from categories", function(err, row){
				categories[row.catName] = row.catColor;
			});
			db.each("select id, category, title, url from bookmarks", function(err, row){
				bookmarks[row.id] = row;
			});
			store.emit('data-updated', categories, bookmarks);
		});

	});

}

store.deleteBookmark = (bookmarkId) => {
	console.log(bookmarkId);
	db.serialize(function(){
		// db.run("delete from bookmarks where id=" + );
		var stmt = db.prepare("delete from bookmarks where id=?");
		stmt.run(bookmarkId);
		//stmt.finalize();
		// bookmarksRef.child(bookmarkId).remove();
		db.serialize(function(){
			db.each("select catName, catColor from categories", function(err, row){
				categories[row.catName] = row.catColor;
			});
			db.each("select id, category, title, url from bookmarks", function(err, row){
				bookmarks[row.id] = row;
			});
			store.emit('data-updated', categories, bookmarks);
		});

	})

}

export default store
