import './App.css';

import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useRenderTimes } from './Utils';

import styles from './BlogPosts.module.css';


const StatusNames = {
	draft: 'Draft',
	published: 'Published',
	removed: 'Removed',	
	scheduledToBePublished: 'Scheduled To Be Published',
};

const blogPostStatusOptions = [
{ label: StatusNames.draft, value: 'draft'},
{ label: StatusNames.published, value: 'published'},	
{ label: StatusNames.removed, value: 'removed'},
{ label: StatusNames.scheduledToBePublished, value: 'scheduledToBePublished'}
];


function BlogPostComponent({ num }) {
    const count = useRenderTimes();
    const dispatch = useDispatch();
	const blogPost = useSelector((state) => {
		console.log(`BlogPost num = ${num} useSelector: this blogPost = ${JSON.stringify(state.entities?.[num])}`)		
		return state.entities?.[num];
		}, shallowEqual 
	);

	const handleChange = (blogPost, event) => {
		const found = blogPostStatusOptions.find((elem) => {
			return elem.value === event.target.value
		});
		if (found) {
			console.log(`event.target.value = ${event.target.value}`);
			const newStatus = { id: blogPost.id, blogPostStatus: event.target.value};
			dispatch({type: 'changeStatus', payload: newStatus});
		}
	}	  
  
	console.log(`BlogPost num = ${num} before return: this blogPost = ${JSON.stringify(blogPost)}`)	
    return (
	blogPost ?
		<>
		<div className={styles.blogPostsContainer} key={blogPost.id}>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>{blogPost.id}</div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>{blogPost.title}</div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`} style={{color: 'blue'}}>{StatusNames[blogPost.blogPostStatus]}</div>
			<div className={`${styles.surroundingText} ${styles.cellContainer}`}>
			<select className={styles.dropDownList} value={blogPost.blogPostStatus} onChange={(e) => handleChange(blogPost, e)}>
			  {blogPostStatusOptions.map((option) => (
				<option key={option.value} value={option.value}>{option.label}</option>
			  ))}
			</select>				
			</div>
		</div>	
		<div>This component has re-rendered {count} times</div>
		</>
		: ""
    );
}
  
export default BlogPostComponent;
  