import { EventEmitter } from 'events';

const store = new EventEmitter();

store.getCategories = function(cb){
	var categories = {};
	db.each("select id, catName, catColor, (select count(id) from bookmarks where bookmarks.category_id=categories.id) as bookmarkCount from categories", function(err, row){
		categories[row.id] = row;
	}, function(err, rowCount){
		cb(null, categories);
	});
}

store.getCategory = function(catId, cb){
	db.get("select id, catName, catColor from categories where id=?", {1:catId}, function(err, row){
		cb(null, row);
	});
}

store.getBookmarks = function(cb){
	var bookmarks = {};
	db.each("select id, category_id, title, url from bookmarks", function(err, row){
		bookmarks[row.id] = row;
	}, function(err, rowCount){
		cb(null, bookmarks);
	});
}

store.getBookmark = function(bookmarkId, cb){
	db.get("select id, category_id, title, url from bookmarks where id=?", {1:bookmarkId}, function(err, row){
		cb(null, row);
	});
}

store.addCategory = (category) => {
	db.serialize(function(){
		var stmt = db.prepare("insert into categories('catName', 'catColor') values(?, ?)");
		// for (var var1 in category) {
			// stmt.run(var1, category[var1]);
		// }
		stmt.run(category.catName, category.catColor);
		store.emit('data-updated');
	});
}

store.editCategory = (catId, category) => {
	db.serialize(function(){
		db.run("update categories set catName=?, catColor=? where id=?", {
			1:category.catName,
			2:category.catColor,
			3:catId
		});
		store.emit('data-updated');
	});
}

store.deleteCategory = (catId) => {
	db.serialize(function(){
		var stmt = db.prepare("delete from categories where id=?");
		stmt.run(catId);
		store.emit('data-updated');
	});
}


store.addBookmark = (bookmark) => {
	db.serialize(function(){
		var stmt = db.prepare("insert into bookmarks('category_id', 'title', 'url') values(?, ?, ?)");
		stmt.run(bookmark.category_id, bookmark.title, bookmark.url);
		store.emit('data-updated');
	});
}

store.editBookmark = (bookmarkId, bookmark) => {
	db.serialize(function(){
		db.run("update bookmarks set category_id=?, title=?, url=? where id=?", {
			1:bookmark.category_id,
			2:bookmark.title,
			3:bookmark.url,
			4:bookmarkId
		});
		store.emit('data-updated');
	});
}

store.deleteBookmark = (bookmarkId) => {
	db.serialize(function(){
		var stmt = db.prepare("delete from bookmarks where id=?");
		stmt.run(bookmarkId);
		store.emit('data-updated');
	})

}

export default store
