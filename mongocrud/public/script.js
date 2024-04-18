document.addEventListener("DOMContentLoaded", async () => {
  const blogList = document.getElementById("blogList");
  const addForm = document.getElementById("addForm");
  const errorContainer = document.getElementById("errorContainer");

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch("/posts");
      const blogs = await response.json();
      blogList.innerHTML = "";
      blogs.forEach((blog) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${blog.title}</strong>: ${blog.content}
        <button onclick="deleteBlog('${blog._id}')" class="text-red-500 underline">Delete</button>`;
        blogList.appendChild(li);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Add blog
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(addForm);
    const title = formData.get("title");
    const content = formData.get("content");

    // Clear previous error message
    errorContainer.innerText = "";

    // Validate input fields
    if (!title || !content) {
      errorContainer.innerText = "Title and content are required";
      return;
    }

    try {
      await fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      addForm.reset();
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  });

  // Delete blog
  window.deleteBlog = async (id) => {
    try {
      await fetch(`/posts/${id}`, {
        method: "DELETE",
      });
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  // Initial fetch
  fetchBlogs();
});
