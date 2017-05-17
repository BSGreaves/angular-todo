app.factory("ItemFactory", function($http, $q, FIREBASE_CONFIG) {

	let getItemList = () => {
		let items = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/items.json`)
			.then(fbItems => {
				fbItems = fbItems.data;
				if (fbItems !== null) {
		      Object.keys(fbItems).forEach(key => {
		        fbItems[key].id=key;
		        items.push(fbItems[key]);
		      });
				}
		    resolve(items);
			})
			.catch(error => {reject(error);});
		});
	};

	let postNewItem = newItem => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/items.json`, JSON.stringify(newItem))
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	let deleteItem = id => {
		return $q((resolve, reject) => {
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/items/${item.id}.json`)
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	let editItem = item => {
		return $q((resolve, reject) => {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/items/${item.id}.json`,
				JSON.stringify({
					assignedTo: item.assignedTo,
					isCompleted: item.isCompleted,
					task: item.task
				}))
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	return {getItemList: getItemList, postNewItem: postNewItem, deleteItem: deleteItem, editItem: editItem};
});