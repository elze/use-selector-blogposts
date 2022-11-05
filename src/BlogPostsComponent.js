import './App.css';

import React, {useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import BlogPostComponent from './BlogPostComponent'
import styles from './BlogPosts.module.css';


function BlogPostsComponent() {
	//const count = useRenderTimes();
	const dispatch = useDispatch();
	// const blogposts = useSelector((state) => state.entities);
	const blogpostIds = useSelector((state) => state.ids, shallowEqual );
	
	useEffect(() => {   
		console.log(`App: useEffect: about to dispatch getBlogPosts`);
		
		async function getBlogPosts() {
			let blogPostsInfo;	
			let errorInfo;
			try {
				const uri = `https://api.geekitude.com/api/blogposts`;
				const response = await fetch(uri);
				if (response.status !== 200) {
					response.json()
						.then(error => {
							const errorMessage = error.error?.message;
							errorInfo = `Server error: ${errorMessage}`
							blogPostsInfo = [];
							console.log(`getBlogPosts: an error occurred: blogPostsInfo = ${JSON.stringify(blogPostsInfo)} errorInfo = ${errorInfo}`);
						})
						.catch((err) => {
							errorInfo = `Unable to retrieve data`;							
							const errMsg = `getBlogPosts: an error occurred. The error result is not a valid JSON object; err = ${err}`;
							console.log(errMsg);
						});
				}			
				else {
					blogPostsInfo = await response.json();			
					console.log(`getBlogPosts: got response.json() ; response.status = ${response.status} errorInfo = ${errorInfo}`);
				}
			}
			catch(err) {
				console.log(`getBlogPosts: a network error occurred: err = ${err}`);
				errorInfo = `Server error: ${err}`
				blogPostsInfo = {};
			}
			dispatch({type: 'setData', blogposts: blogPostsInfo});
		}
		getBlogPosts();

		return () => {
			console.log('BlogPostsComponent component is being destroyed');
		};

	}, [dispatch]); 	

  return (
      <div className="App">
		  <div style={{ marginBottom: '30px' }}>This application was created for Women Who Code Austin, TX frontend meetup to demonstrate React.js with Redux-Toolkit. Here is the Github repository: <a href="https://github.com/elze/use-selector-blogposts">https://github.com/elze/use-selector-blogposts</a>. <br/>	
		  Here is the <a href="http://geekitude.com">author's website</a>.</div>  	  
		  
		<h2>Blog Posts</h2>
		<div className={styles.blogPostsContainer}>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>ID</b></div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>Title</b></div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>Status</b></div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}><b>Move to</b></div>			
		</div>		  		  
      {
	blogpostIds?
		blogpostIds?.map((id, ind) => { 
			  console.log(`blogposts?.map: id = ${id} ind = ${ind}}`);
            return (
			      <BlogPostComponent key={id} num={ind}/>
			      )
          }
        )
		: ""
      } 
      </div>
  );
}


export default BlogPostsComponent;
