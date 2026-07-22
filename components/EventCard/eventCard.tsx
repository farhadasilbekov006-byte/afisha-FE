import { Event } from "@/types/event";
import styles from './eventCard.module.scss'

interface Props {
    event: Event
}

export default function EventCard({event}: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.card_img}>
            {
                event.imageUrl ? (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                        />
                    
                ) : (
                    <div className={styles.card_placeholder}>
                        Нет фото
                    </div>
                )
            }

            </div>
            <h3 className={styles.card_name}>{event.title}</h3>

            <div className={styles.card_eventMeta}>
                <div className={styles.card_eventMeta_date}>
                  <img src="/img/calendar.png" alt="" />
                  <p>
                   {new Date(event.date).toLocaleDateString()}
                  </p>
                  
                  <h3>·</h3>

                </div>
                   
                

                <div className={styles.card_eventMeta_location}>
                   <img src="/img/location.png" alt="" />
                   <p>
                    {event.location}
                   </p>
                </div>

               
            </div>

            <div className={styles.card_eventInfo}>
                <span className={styles.card_eventInfo_category}>
                    {event.category}
                </span>

                <strong className={styles.card_eventInfo_price}>
                    {
                        Number(event.price) === 0
                        ? " Бесплатно"
                        : `${event.price} с`
                    }
                </strong>
            </div>






        </div>
    )
}