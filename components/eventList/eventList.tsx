"use client";

import { useEffect } from "react";
import { fetchEvents } from "@/store/eventSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import EventCard from "@/components/EventCard/eventCard";
import style from './eventList.module.scss'

export default function EventList() {
  const dispatch = useAppDispatch();

  const { items, loading, error, filters } = useAppSelector(
    (state) => state.events
  );

  useEffect(() => {
    dispatch(fetchEvents(filters));
  }, [dispatch, filters]);

  if (loading) return <h2>Загрузка...</h2>;
  if (error) return <h2>{error}</h2>;
  if (items.length === 0) return <h2>Ничего не найдено</h2>;

  return (
    <div className={style.eventList}>
      {items.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}