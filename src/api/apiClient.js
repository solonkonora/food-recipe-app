// Simple API client for the backend tasty-api
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  
  // get token from localStorage if available
  const token = localStorage.getItem('authToken');
  
  const opts = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }), // add token to headers if available
    },
    credentials: 'include', // allow cookies (if backend uses HttpOnly cookies)
    ...options,
  };

  if (opts.body && typeof opts.body !== 'string') {
    opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    let err = text;
    try { err = JSON.parse(text); } catch (e) { /* ignore non-json response */ }
    const error = new Error('API request failed');
    error.status = res.status;
    error.response = err;
    throw error;
  }

  // Attempt to parse JSON, but fall back to text
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

export async function getRecipes() {
  return request('/recipes', { method: 'GET' });
}

export async function getRecipe(id) {
  return request(`/recipes/${id}`, { method: 'GET' });
}

export async function createRecipe(data) {
  // data: { title, description, image_path, category_id }
  return request('/recipes', { method: 'POST', body: data });
}

export async function createIngredients(recipeId, ingredients) {
  // create ingredients one by one
  const results = [];
  for (const ingredient of ingredients) {
    const result = await request(`/ingredients/${recipeId}`, {
      method: 'POST',
      body: ingredient,
    });
    results.push(result);
  }
  return results;
}

export async function createInstructions(recipeId, instructions) {
  // Backend expects { instructions: [...] }
  return request(`/instructions/${recipeId}`, {
    method: 'POST',
    body: { instructions },
  });
}

export async function uploadImage(formData) {
  const url = `${API_BASE}/recipes/upload-image`;
  
  // get token from localStorage if available
  const token = localStorage.getItem('authToken');
  
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: headers, // add auth header
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    let err = text;
    try { err = JSON.parse(text); } catch (e) { /* ignore */ }
    const error = new Error('Image upload failed');
    error.status = res.status;
    error.response = err;
    throw error;
  }

  return res.json();
}

export async function updateRecipe(id, data) {
  return request(`/recipes/${id}`, { method: 'PUT', body: data });
}

export async function deleteRecipe(id) {
  return request(`/recipes/${id}`, { method: 'DELETE' });
}

// auth endpoints
export async function signup(email, password, full_name) {
  return request('/auth/signup', { 
    method: 'POST', 
    body: { email, password, full_name } 
  });
}

export async function login(email, password) {
  return request('/auth/login', { 
    method: 'POST', 
    body: { email, password } 
  });
}

export async function logout() {
  return request('/auth/logout', { method: 'POST' });
}

export async function getCurrentUser() {
  return request('/auth/me', { method: 'GET' });
}

// favorites endpoints
export async function getFavorites() {
  return request('/favorites', { method: 'GET' });
}

export async function addFavorite(recipeId) {
  return request(`/favorites/${recipeId}`, { method: 'POST' });
}

export async function removeFavorite(recipeId) {
  return request(`/favorites/${recipeId}`, { method: 'DELETE' });
}

export async function checkFavorite(recipeId) {
  return request(`/favorites/check/${recipeId}`, { method: 'GET' });
}

// instructions endpoints
export async function getInstructions(recipeId) {
  return request(`/instructions/${recipeId}`, { method: 'GET' });
}

export async function updateInstruction(id, data) {
  return request(`/instructions/${id}`, { method: 'PUT', body: data });
}

export async function deleteInstruction(id) {
  return request(`/instructions/${id}`, { method: 'DELETE' });
}

// ingredients endpoints
export async function getIngredients(recipeId) {
  return request(`/ingredients/${recipeId}`, { method: 'GET' });
}

export async function updateIngredient(id, data) {
  return request(`/ingredients/${id}`, { method: 'PUT', body: data });
}

export async function deleteIngredient(id) {
  return request(`/ingredients/${id}`, { method: 'DELETE' });
}

export default { 
  getRecipes, 
  getRecipe, 
  createRecipe, 
  updateRecipe, 
  deleteRecipe,
  signup,
  login,
  logout,
  getCurrentUser,
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
  getInstructions,
  getIngredients,
  createIngredients,
  createInstructions,
  updateIngredient,
  updateInstruction,
  deleteIngredient,
  deleteInstruction,
  uploadImage
};
