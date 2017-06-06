app.factory("ToolFactory", function($q, $http, FIREBASE_CONFIG) {

	let getToolList = (itemID) => {
		let finalTools = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/tools.json?orderBy="itemID"&equalTo="${itemID}"`)
			.then(fbTools => {
				fbTools = fbTools.data;
				if (fbTools !== null) {
		      Object.keys(fbTools).forEach(key => {
		        fbTools[key].id=key;
		        finalTools.push(fbTools[key]);
		      });
				}
		    resolve(finalTools);
			})
			.catch(error => {reject(error);});

		});
	};

	return {getToolList: getToolList};

});