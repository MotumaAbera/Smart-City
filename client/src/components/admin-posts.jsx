import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function AdminPosts({ posts, onAddPost }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title && form.content) {
      onAddPost({ ...form, date: new Date().toLocaleString() });
      setForm({ title: "", content: "" });
      setShowForm(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Admin Updates / Posts</CardTitle>
          <Button onClick={() => setShowForm((v) => !v)} size="sm">
            {showForm ? "Cancel" : "Add Post"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
            <Textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your update..."
              rows={4}
              required
            />
            <Button type="submit" className="bg-primary text-white">
              Post Update
            </Button>
          </form>
        )}
        <div className="space-y-4">
          {posts.length === 0 && (
            <div className="text-gray-500">No posts yet.</div>
          )}
          {posts.map((post, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-gray-50">
              <div className="font-semibold text-lg text-primary mb-1">{post.title}</div>
              <div className="text-gray-700 mb-2">{post.content}</div>
              <div className="text-xs text-gray-400">{post.date}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
