export const originalState = {
	entities: [],
	ids: []
};


export function reducer(state=originalState, action) {  
  switch (action.type) {
      case 'setData':
        console.log(`reducer, case setData: originalState = ${JSON.stringify(originalState)} `);
		const newState = {entities: action.blogposts, ids: action.blogposts.map(b => b.id)};
        return newState;   	  	  
      case 'changeStatus': 
		const id = action.payload.id;
		
		const newBlogPostStatus = action.payload.blogPostStatus;		
		const ind = state.entities.findIndex((elem) => {
			return elem.id === id
		});

		console.log(`reducer, case changeStatus, beginning: state.entities[${ind}].blogPostStatus = ${state.entities[ind].blogPostStatus} action.payload.blogPostStatus = ${action.payload.blogPostStatus} newBlogPostStatus=${newBlogPostStatus}`);
				
		if (ind > -1) {		
			let blogPost = {...state.entities[ind], blogPostStatus: newBlogPostStatus};
			console.log(`reducer, case changeStatus: after the spread blogPost = ${JSON.stringify(blogPost)}`);
			let blogposts = Object.assign([], state.entities, {[ind]: blogPost})
			console.log(`reducer, case changeStatus: after the second spread blogPosts = ${JSON.stringify(blogposts)}`);
			console.log(`reducer, case changeStatus: state.entities[${ind}].blogPostStatus = ${state.entities[ind].blogPostStatus} blogposts[${ind}].blogPostStatus = ${blogposts[ind].blogPostStatus}`);
			return {entities: blogposts, ids: state.ids};
		}
		return state;	  
      default:
	      return state;
  }
}
