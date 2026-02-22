import React, { useState, useEffect } from "react";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    uniqueId: "",
    comment: ""
  });

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    alert(data.message);

    setFormData({ name: "", uniqueId: "", comment: "" });
    fetchUsers(); // refresh table
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt="webdev"
          style={styles.image}
        />

        <h1 style={styles.heading}>
          Web Dev with Python + React + MySQL 🚀
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="uniqueId"
            placeholder="Enter Unique ID"
            value={formData.uniqueId}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <textarea
            name="comment"
            placeholder="Enter Comment"
            value={formData.comment}
            onChange={handleChange}
            required
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>

        {/* TABLE */}
        <h2 style={{ marginTop: "40px" }}>Submitted Users</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Unique ID</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.unique_id}</td>
                <td>{user.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    padding: "40px",
    fontFamily: "Arial"
  },
  container: {
    background: "white",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "900px",
    margin: "auto",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "20px"
  },
  heading: {
    textAlign: "center",
    color: "#2a5298"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px"
  },
  button: {
    padding: "12px",
    background: "#2a5298",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse"
  }
};

export default Home;