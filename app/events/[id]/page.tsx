"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Event, Category } from "@/types/event";

import {
  getEventById,
  deleteEvent,
  updateEvent,
} from "@/services/event.service";

import styles from "./page.module.scss";


const categoryNames: Record<string, string> = {
  concert: "Концерт",
  lecture: "Лекция",
  sport: "Спорт",
  theatre: "Театр",
  other: "Другое",
};


export default function EventPage() {

  const { id } = useParams();
  const router = useRouter();


  const [event, setEvent] = useState<Event | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "concert",
    price: "",
    imageUrl: "",
  });



  useEffect(() => {

    async function loadEvent() {

      try {

        const data = await getEventById(id as string);

        setEvent(data);


        setForm({
          title: data.title,
          description: data.description,
          date: data.date.slice(0, 16),
          location: data.location,
          category: data.category,
          price: data.price,
          imageUrl: data.imageUrl ?? "",
        });


      } catch {

        setError(
          "Ошибка загрузки события"
        );

      } finally {

        setLoading(false);

      }

    }


    if (id) {
      loadEvent();
    }


  }, [id]);




  const changeField = (
    key: string,
    value: string
  ) => {

    setForm(prev => ({
      ...prev,
      [key]: value
    }));

  };




  const handleSave = async () => {

    if (!event) return;


    try {

      setSaving(true);

      setError("");
      setMessage("");



      const updated = await updateEvent(
        event.id,
        {

          title: form.title,

          description: form.description,

          date: form.date,

          location: form.location,

          category: form.category as Category,

          price: form.price,


          ...(form.imageUrl.trim()
            ? {
                imageUrl: form.imageUrl.trim()
              }
            : {})

        }
      );


      setEvent(updated);

      setEditing(false);

      setMessage(
        "Событие обновлено"
      );


    } catch (error: any) {

      console.error(
        error.response?.data
      );


      const msg =
        error.response?.data?.message;


      setError(
        Array.isArray(msg)
          ? msg.join(", ")
          : msg || "Ошибка сохранения"
      );


    } finally {

      setSaving(false);

    }

  };





  const cancelEdit = () => {

    if (!event) return;


    setForm({

      title: event.title,

      description: event.description,

      date: event.date.slice(0, 16),

      location: event.location,

      category: event.category,

      price: event.price,

      imageUrl: event.imageUrl ?? "",

    });


    setEditing(false);

  };





  const handleDelete = async () => {

    try {

      await deleteEvent(id as string);

      router.push("/");


    } catch {

      setError(
        "Ошибка удаления"
      );

    }

  };





  if (loading)
    return <h2>Загрузка...</h2>;



  if (!event)
    return <h2>Событие не найдено</h2>;




  return (

    <main className={styles.page}>


      <button
        className={styles.backButton}
        onClick={() => router.back()}
      >
        ← Назад
      </button>



      {message && (
        <div className={styles.success}>
          {message}
        </div>
      )}



      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}




      {editing ? (

        <div className={styles.form}>


          <input
            className={styles.input}
            value={form.title}
            onChange={(e) =>
              changeField(
                "title",
                e.target.value
              )
            }
            placeholder="Название"
          />



          <textarea
            className={styles.input}
            value={form.description}
            onChange={(e) =>
              changeField(
                "description",
                e.target.value
              )
            }
            placeholder="Описание"
          />



          <input
            className={styles.input}
            type="datetime-local"
            value={form.date}
            onChange={(e) =>
              changeField(
                "date",
                e.target.value
              )
            }
          />



          <input
            className={styles.input}
            value={form.location}
            onChange={(e) =>
              changeField(
                "location",
                e.target.value
              )
            }
            placeholder="Место"
          />



          <select
            className={styles.input}
            value={form.category}
            onChange={(e) =>
              changeField(
                "category",
                e.target.value
              )
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
            className={styles.input}
            value={form.price}
            onChange={(e) =>
              changeField(
                "price",
                e.target.value
              )
            }
            placeholder="Цена (сом)"
          />



          <input
            className={styles.input}
            value={form.imageUrl}
            onChange={(e) =>
              changeField(
                "imageUrl",
                e.target.value
              )
            }
            placeholder="Ссылка на изображение"
          />



          <div className={styles.actions}>


            <button
              className={styles.editButton}
              onClick={handleSave}
              disabled={saving}
            >

              {saving
                ? "Сохранение..."
                : "Сохранить"}

            </button>



            <button
              className={styles.deleteButton}
              onClick={cancelEdit}
            >
              Отмена
            </button>


          </div>


        </div>



      ) : (


        <>


          {event.imageUrl ? (

            <img
              className={styles.image}
              src={event.imageUrl}
              alt={event.title}
            />

          ) : (

            <div className={styles.placeholder}>
              📷
            </div>

          )}



          <h1 className={styles.title}>
            {event.title}
          </h1>



          <div className={styles.info}>

            <p>
              <b>Дата:</b>{" "}
              {new Date(event.date)
                .toLocaleString("ru-RU")}
            </p>


            <p>
              <b>Место:</b>{" "}
              {event.location}
            </p>


            <p>
              <b>Категория:</b>{" "}
              {categoryNames[event.category]}
            </p>


            <p>
              <b>Цена:</b>{" "}
              {
                Number(event.price) === 0
                  ? "Бесплатно"
                  : `${event.price} сом`
              }
            </p>


          </div>



          <p className={styles.description}>
            {event.description}
          </p>




          <div className={styles.actions}>


            <button
              className={styles.editButton}
              onClick={() => setEditing(true)}
            >
              Редактировать
            </button>



            <button
              className={styles.deleteButton}
              onClick={() => setDeleteModal(true)}
            >
              Удалить
            </button>


          </div>




          {deleteModal && (

            <div className={styles.modal}>

              <div className={styles.modalBox}>


                <h3>
                  Удалить событие?
                </h3>


                <div className={styles.actions}>


                  <button
                    className={styles.deleteButton}
                    onClick={handleDelete}
                  >
                    Удалить
                  </button>



                  <button
                    className={styles.editButton}
                    onClick={() =>
                      setDeleteModal(false)
                    }
                  >
                    Отмена
                  </button>


                </div>


              </div>

            </div>

          )}



        </>

      )}


    </main>

  );

}