const API = "http://localhost:5000/api/posts";
const user = JSON.parse(localStorage.getItem("user"));
const currentUser = JSON.parse(localStorage.getItem("user"));
// Create post
async function createPost() {
  const content = document.getElementById("postContent").value;

  const user = JSON.parse(localStorage.getItem("user"));

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user._id,
      username: user.username, // ✅ important
      content
    })
  });

  loadPosts();
}

// Load posts
async function loadPosts() {
  try {
    const res = await fetch(API);
    const posts = await res.json();

    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    // Show latest posts first
    for (let i = posts.length - 1; i >= 0; i--) {
      const post = posts[i];

      let comments = [];
      try {
        comments = await loadComments(post._id);
      } catch {
        comments = [];
      }

      const div = document.createElement("div");
      div.className = "post";

      div.innerHTML = `
        
        
        <p>${post.content}</p>

        <button onclick="likePost('${post._id}')">
          ❤️ Like (${post.likes.length})
        </button>

        <button onclick="addComment('${post._id}')">
          💬 Comment
        </button>

        <div style="margin-top:10px;">
          ${comments.map(c => `<p>💬 ${c.text}</p>`).join("")}
        </div>
      `;

      feed.appendChild(div);
    }

  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

// Like post
async function likePost(id) {
  await fetch(`${API}/${id}/like`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: "user._id" })
  });

  loadPosts();
}

loadPosts();
// Add comment
async function addComment(postId) {
  const text = prompt("Enter comment:");

  await fetch("http://localhost:5000/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId,
      userId: "user._id",
      text
    })
  });

  loadPosts();
}

// Load comments
async function loadComments(postId) {
  const res = await fetch(`http://localhost:5000/api/comments/${postId}`);
  return await res.json();
}