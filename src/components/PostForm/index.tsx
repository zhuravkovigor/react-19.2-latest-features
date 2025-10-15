import { useState, useTransition, type FormEvent } from "react";
import { createPost } from "../../services/post";
import tryCatch from "../../utils/try-catch";

type PostsFormProps = {
  onPostAdded: () => void;
};

export default function PostsForm({ onPostAdded }: PostsFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const { data, error } = await tryCatch(createPost({ title, body }));

      if (error) {
        console.error("Ошибка при добавлении поста:", error);
        return;
      }

      if (data) {
        setTitle("");
        setBody("");
        onPostAdded();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Введите заголовок поста"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Введите содержание поста"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isSubmitting}
          required
          className="form-input form-textarea"
        />
      </div>
      <button type="submit" disabled={isSubmitting} className="form-button">
        {isSubmitting ? "⏳ Добавление..." : "Добавить пост"}
      </button>
    </form>
  );
}
