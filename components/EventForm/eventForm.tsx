"use client";

import { useState } from "react";
import "./eventForm.scss";
import { api } from "@/services/axios";

interface EventFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function EventForm({
  onClose,
  onSuccess,
}: EventFormProps) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("concert");
  const [price, setPrice] = useState("0");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");


    try {

      await api.post("/events", {

        title,
        description,
        date,
        location,
        category,
        price,

        ...(imageUrl.trim()
          ? { imageUrl }
          : {}),

      });


      setMessage(
        "Событие успешно создано"
      );


      setTimeout(() => {

        onSuccess();
        onClose();

      }, 800);



    } catch (error: any) {

      console.error(error);


      const msg =
        error.response?.data?.message;


      setError(
        Array.isArray(msg)
          ? msg.join(", ")
          : msg || "Ошибка создания события"
      );


    } finally {

      setLoading(false);

    }

  }


  return (

    <form
      className="eventForm"
      onSubmit={handleSubmit}
    >

      <h2>
        Создание события
      </h2>


      {message && (
        <div className="success">
          {message}
        </div>
      )}


      {error && (
        <div className="error">
          {error}
        </div>
      )}



      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e)=>
          setTitle(e.target.value)
        }
        required
      />



      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e)=>
          setDescription(e.target.value)
        }
        required
      />



      <input
        type="datetime-local"
        value={date}
        onChange={(e)=>
          setDate(e.target.value)
        }
        required
      />



      <input
        type="text"
        placeholder="Место проведения"
        value={location}
        onChange={(e)=>
          setLocation(e.target.value)
        }
        required
      />



      <select
        value={category}
        onChange={(e)=>
          setCategory(e.target.value)
        }
      >

        <option value="concert">
          Концерт
        </option>

        <option value="lecture">
          Лекция
        </option>

        <option value="sport">
          Спорт
        </option>

        <option value="theatre">
          Театр
        </option>

        <option value="other">
          Другое
        </option>

      </select>



      <input
        type="number"
        placeholder="Стоимость билета (сом)"
        value={price}
        onChange={(e)=>
          setPrice(e.target.value)
        }
      />



      <input
        type="text"
        placeholder="Ссылка на изображение"
        value={imageUrl}
        onChange={(e)=>
          setImageUrl(e.target.value)
        }
      />



      <div className="buttons">


        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Создание..."
            : "Создать событие"}

        </button>



        <button
          type="button"
          onClick={onClose}
        >
          Отмена
        </button>


      </div>


    </form>

  );
}