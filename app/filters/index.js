export function filterByTitle(value, title){
	return value;
	//return filterBookmarks(value, 'title', title);
}

export function filterByCategory(value, category){
	if(!category) return value
  return value;
	//return filterBookmarks(value, 'category', category)
}

function filterBookmarks(bookmarks, filterBy, filterValue){
	var filteredBookmarks = {};
	for(var bookmark in bookmarks){
	//	console.log(bookmark);
		// console.log(bookmarks);
		//if(bookmarks[bookmark][filterBy].indexOf(filterValue) > -1){
			//filterBookmarks[bookmark] = bookmarks[bookmark]
		//}
		filterBookmarks[bookmark] = bookmarks[bookmark];
	}
	return filteredBookmarks;
}
