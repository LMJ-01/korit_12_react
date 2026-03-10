import React from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Loader2, FileText, Send, Hash, Layers } from "lucide-react";

const getPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  if (!response.ok) throw new Error('네트워크 응답에 문제가 발생했습니다...');
  return response.json();
};

const createPost = async ({ title, body }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title, body, userId: 1 }),
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
  });
  return response.json();
};

const queryClient = new QueryClient();

function PostApp() {
  const client = useQueryClient();

  const { isLoading, error, data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      client.invalidateQueries(['posts']);
      alert(`🎉 새 포스트 생성 완료! (ID: ${newPost.id})`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const content = formData.get('content');

    if (!title || !content) return;
    createMutation.mutate({ title, body: content });
    e.currentTarget.reset();
  };

  return (
    <div style={styles.container}>
      {/* Sidebar Form */}
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}><Layers size={28} /> 글 작성</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="title"
            type="text"
            placeholder="제목을 입력하세요"
            style={styles.input}
            required
          />
          <textarea
            name="content"
            rows="5"
            placeholder="내용을 입력하세요"
            style={styles.textarea}
            required
          />
          <button
            type="submit"
            style={{ ...styles.button, backgroundColor: createMutation.isPending ? '#60a5fa66' : '#3b82f6' }}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            {createMutation.isPending ? '전송 중...' : '포스트 발행'}
          </button>
        </form>
      </aside>

      {/* Main Feed */}
      <main style={styles.feed}>
        <h2 style={styles.feedTitle}><PlusCircle size={24} /> 최근 포스트</h2>

        {isLoading ? (
          <div style={styles.loadingState}>
            <Loader2 size={36} className="animate-spin" />
            <p>피드를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div style={styles.errorState}>⚠️ 오류 발생: {error.message}</div>
        ) : (
          <div style={styles.postGrid}>
            {posts.map(post => (
              <div key={post.id} style={styles.postCard}>
                <div style={styles.postHeader}>
                  <span style={styles.postId}><Hash size={14} /> {post.id}</span>
                  <FileText size={16} color="#60a5fa" />
                </div>
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postBody}>{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// -------------------- Styles --------------------
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f0f9ff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1e293b',
    padding: '20px',
    gap: '20px'
  },
  sidebar: {
    flex: '0 0 300px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: 'fit-content'
  },
  sidebarTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#1e40af'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    outline: 'none',
    fontSize: '1rem'
  },
  textarea: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
    resize: 'none',
    outline: 'none'
  },
  button: {
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease'
  },
  feed: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  feedTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#1e40af'
  },
  postGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '16px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.04)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  postId: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#3b82f6',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  postTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    marginBottom: '6px'
  },
  postBody: {
    fontSize: '0.875rem',
    color: '#475569',
    lineHeight: '1.4'
  },
  loadingState: {
    textAlign: 'center',
    padding: '50px 0',
    color: '#3b82f6'
  },
  errorState: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fee2e2',
    color: '#b91c1c'
  }
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostApp />
    </QueryClientProvider>
  )
}

export default App;