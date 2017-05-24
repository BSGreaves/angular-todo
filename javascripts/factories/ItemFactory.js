app.factory("ItemFactory", function($http, $q, $rootScope, FIREBASE_CONFIG) {

	let getItemList = (userID) => {
		let items = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/items.json?orderBy="uid"&equalTo="${userID}"`)
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

	let getSingleItem = id => {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/items/${id}.json`)
			.then(fbItem => {
				fbItem = fbItem.data;
				fbItem.id = id;
		    resolve(fbItem);
			})
			.catch(error => reject(error));
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
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/items/${id}.json`)
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
					task: item.task,
					uid: item.uid
				}))
			.then(result => resolve(result))
			.catch(error => reject(error));
		});
	};

	return {getItemList: getItemList, postNewItem: postNewItem, deleteItem: deleteItem, editItem: editItem, getSingleItem: getSingleItem};
});