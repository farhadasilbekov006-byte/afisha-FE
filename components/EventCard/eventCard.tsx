import Link from "next/link";
import { Event } from "@/types/event";
import styles from "./eventCard.module.scss";

interface Props {
  event: Event;
}

const categoryNames: Record<string, string> = {
  concert: "Концерт",
  lecture: "Лекция",
  sport: "Спорт",
  theatre: "Театр",
  other: "Другое",
};

export default function EventCard({ event }: Props) {
  return (
    <Link href={`/events/${event.id}`} className={styles.card}>
      <div className={styles.card_img}>
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} />
        ) : (
          <div className={styles.card_placeholder}>
            <span>📷</span>
          </div>
        )}
      </div>

      <h3 className={styles.card_name}>{event.title}</h3>

      <div className={styles.card_eventMeta}>
        <div className={styles.card_eventMeta_date}>
          <img src="/img/calendar.png" alt="Дата" />
          <p>{new Date(event.date).toLocaleDateString("ru-RU")}</p>
          <h3>·</h3>
        </div>

        <div className={styles.card_eventMeta_location}>
          <img src="/img/location.png" alt="Место" />
          <p>{event.location}</p>
        </div>
      </div>

      <div className={styles.card_eventInfo}>
        <span className={styles.card_eventInfo_category}>
          {categoryNames[event.category] ?? event.category}
        </span>

        <strong className={styles.card_eventInfo_price}>
          {Number(event.price) === 0 ? "Бесплатно" : `${event.price} с`}
        </strong>
      </div>
    </Link>
  );
}
