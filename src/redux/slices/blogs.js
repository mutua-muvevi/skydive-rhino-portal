import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	blog: null,
	blogError: null,

	blogs: null,
	blogsError: null,

	addBlog: null,
	addBlogError: null,

	editBlog: null,
	editBlogError: null,

	deleteBlog: null,
	deleteBlogError: null,

	deleteManyBlogs: null,
	deleteManyBlogsError: null,

	fetchAllBlogs: null,
	fetchAllBlogsError: null,

	fetchSingleBlog: null,
	fetchSingleBlogError: null,
};

//the slice
const slice = createSlice({
	name: "blogs",
	initialState,
	reducers: {
		// START LOADING
		startLoading(state) {
			state.isLoading = true;
		},

		// STOP LOADING
		stopLoading(state) {
			state.isLoading = false;
		},

		//FETCH ALL BLOGS
		fetchAllBlogs(state, action) {
			state.isLoading = false;
			state.blogs = action.payload;
		},

		fetchAllBlogsError(state, action) {
			state.isLoading = false;
			state.blogsError = action.payload;
		},

		//SET A BLOG
		setBlog(state, action) {
			state.isLoading = false;
			state.blog = action.payload;
		},

		setBlogError(state, action) {
			state.isLoading = false;
			state.blogError = action.payload;
		},

		//FETCH SINGLE BLOG
		fetchSingleBlog(state, action) {
			state.isLoading = false;
			state.fetchSingleBlog = action.payload;
		},

		fetchSingleBlogError(state, action) {
			state.isLoading = false;
			state.fetchSingleBlogError = action.payload;
		},

		//ADD BLOG
		addBlog(state, action) {
			state.isLoading = false;
			state.addBlog = action.payload;
		},

		addBlogError(state, action) {
			state.isLoading = false;
			state.addBlogError = action.payload;
		},

		//EDIT BLOG
		editBlog(state, action) {
			state.isLoading = false;
			state.editBlog = action.payload;
		},

		editBlogError(state, action) {
			state.isLoading = false;
			state.editBlogError = action.payload;
		},

		//DELETE BLOG
		deleteBlog(state, action) {
			state.isLoading = false;
			state.deleteBlog = action.payload;
		},

		deleteBlogError(state, action) {
			state.isLoading = false;
			state.deleteBlogError = action.payload;
		},

		//DELETE MANY BLOGS
		deleteManyBlogs(state, action) {
			state.isLoading = false;
			state.deleteManyBlogs = action.payload;
		},

		deleteManyBlogsError(state, action) {
			state.isLoading = false;
			state.deleteManyBlogsError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//----------------------------------add a blog------------------------------------
export function addBlog(userID, token, blog) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const formData = new FormData();

			// Append non-file fields to FormData
			formData.append("title", blog.title);
			formData.append("introDescription", blog.introDescription);
			formData.append("tags", JSON.stringify(blog.tags));

			// Append thumbnail file to FormData
			if (blog.thumbnail) {
				formData.append(
					"thumbnail",
					blog.thumbnail,
					blog.thumbnail.name
				);
			}

			// Append content block files and details to FormData
			if (Array.isArray(blog.contentBlocks)) {
				blog.contentBlocks.forEach((block, index) => {
					formData.append(
						`contentBlocks[${index}][title]`,
						block.title
					);
					formData.append(
						`contentBlocks[${index}][details]`,
						block.details
					);

					// Append each image with the field name 'image'
					if (block.image) {
						formData.append(`image`, block.image, block.image.name);
					}
				});
			}

			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/blog/${userID}/post`,
				formData,
				{
					headers: {
						Authorization: token,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.addBlog(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.addBlogError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

// ----------------------------------edit a blog------------------------------------
export function editBlog(userID, token, blogID, blog) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const formData = new FormData();

			// Append non-file fields
			formData.append("title", blog.title);
			formData.append("introDescription", blog.introDescription);
			formData.append("tags", JSON.stringify(blog.tags));

			// Handle new thumbnail file
			if (blog.thumbnail && blog.thumbnail instanceof File) {
				formData.append(
					"thumbnail",
					blog.thumbnail,
					blog.thumbnail.name
				);
			}

			// Handle new content block images
			blog.contentBlocks.forEach((block, index) => {
				formData.append(`contentBlocks[${index}][title]`, block.title);
				formData.append(
					`contentBlocks[${index}][details]`,
					block.details
				);

				if (block.image && block.image instanceof File) {
					formData.append("image", block.image, block.image.name);
				}
			});

			// Axios PUT request
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/blog/${userID}/edit/${blogID}`,
				formData,
				{
					headers: {
						Authorization: token,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.editBlog(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.editBlogError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

// ----------------------------------set a blog------------------------------------
export function setBlog(blog) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			dispatch(slice.actions.setBlog(blog));
			return blog;
		} catch (error) {
			dispatch(slice.actions.setBlogError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------------fetch all blogs------------------------------------
export function fetchAllBlogs(userID, token) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/blog/fetch/all`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.fetchAllBlogs(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.fetchAllBlogsError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------------fetch single blog------------------------------------
export function fetchSingleBlog(userID, token, id) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/blog/${userID}/fetch/single/${id}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.fetchSingleBlog(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.fetchSingleBlogError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------------delete blog------------------------------------
export function deleteBlog(userID, token, blogID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/blog/${userID}/delete/single/${blogID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteBlog(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteBlogError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------------delete many blogs------------------------------------
export function deleteManyBlogs(userID, token, blogIDs) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/blog/${userID}/delete/many`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					data: {
						blogIDs: blogIDs,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteManyBlogs(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteManyBlogsError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}
