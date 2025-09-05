import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/todos"; // Adjust port if needed

const TodoApiApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      if (!res.ok) throw new Error("Failed to add todo");
      setInput("");
      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete todo");
      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          maxHeight: 700,
          
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: 24,
          boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Header gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #667eea, #764ba2)",
          }}
        ></div>

        {/* Header section - fixed */}
        <div
          style={{
            padding: "32px 32px 24px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#1f2937",
              margin: "0 0 24px",
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ✨ Todo App
          </h2>

          <form onSubmit={addTodo}>
            <div
              style={{
                display: "flex",
                gap: 12,
                padding: 6,
                background: "rgba(248, 250, 252, 0.8)",
                borderRadius: 16,
                border: "1px solid rgba(226, 232, 240, 0.6)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What needs to be done?"
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  borderRadius: 12,
                  border: "none",
                  background: "transparent",
                  fontSize: 16,
                  outline: "none",
                  color: "#374151",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "16px 24px",
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  border: "none",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 8px 16px -4px rgba(102, 126, 234, 0.4)",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 12px 20px -4px rgba(102, 126, 234, 0.5)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 8px 16px -4px rgba(102, 126, 234, 0.4)";
                }}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>

        {/* Content section - scrollable */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: "0 32px",
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e0 transparent",
          }}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#6b7280",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  border: "4px solid #e5e7eb",
                  borderTop: "4px solid #667eea",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginBottom: 16,
                }}
              ></div>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>
                Loading your tasks...
              </p>
            </div>
          ) : error ? (
            <div
              style={{
                background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
                border: "1px solid #fecaca",
                color: "#dc2626",
                padding: 20,
                borderRadius: 16,
                textAlign: "center",
                margin: "20px 0",
                fontWeight: 500,
              }}
            >
              ⚠️ {error}
            </div>
          ) : (
            <div style={{ paddingBottom: 20 }}>
              {todos.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "200px",
                    color: "#6b7280",
                  }}
                >
                  <div style={{ fontSize: 64, marginBottom: 16, opacity: 0.6 }}>
                    📝
                  </div>
                  <p style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>
                    No tasks yet. Add one above!
                  </p>
                </div>
              ) : (
                <div style={{ marginTop: 20 }}>
                  {todos.map((todo, index) => (
                    <div
                      key={todo.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "20px 0",
                        borderBottom:
                          index !== todos.length - 1
                            ? "1px solid rgba(241, 245, 249, 0.8)"
                            : "none",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderRadius: 12,
                        margin: "0 -16px",
                        paddingLeft: 16,
                        paddingRight: 16,
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(248, 250, 252, 0.8)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <span
                        style={{
                          fontSize: 16,
                          color: "#374151",
                          flex: 1,
                          paddingRight: 16,
                          lineHeight: 1.5,
                          fontWeight: 500,
                        }}
                      >
                        {todo.text}
                      </span>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        style={{
                          background:
                            "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                          border: "1px solid rgba(254, 202, 202, 0.8)",
                          color: "#dc2626",
                          cursor: "pointer",
                          padding: "10px 16px",
                          borderRadius: 10,
                          fontSize: 14,
                          fontWeight: 600,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background =
                            "linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background =
                            "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)";
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer section - fixed */}
        <div
          style={{
            padding: "20px 32px 32px",
            borderTop: "1px solid rgba(0, 0, 0, 0.05)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: 16,
              background:
                "linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)",
              borderRadius: 16,
              color: "#6b7280",
              fontSize: 14,
              fontWeight: 600,
              border: "1px solid rgba(226, 232, 240, 0.6)",
            }}
          >
            📊 {todos.length} {todos.length === 1 ? "task" : "tasks"} total
          </div>
        </div>
      </div>

      <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                /* Custom scrollbar */
                *::-webkit-scrollbar {
                    width: 8px;
                }
                
                *::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                *::-webkit-scrollbar-thumb {
                    background: rgba(203, 213, 224, 0.6);
                    border-radius: 4px;
                }
                
                *::-webkit-scrollbar-thumb:hover {
                    background: rgba(203, 213, 224, 0.8);
                }
            `}</style>
    </div>
  );
};

export default TodoApiApp;
