"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters, clearFilters } from "@/store/eventSlice";
import style from './eventFilter.module.scss'

export default function EventFilter() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.events.filters);

  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        dispatch(setFilters({ search: searchInput }));
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div className={style.filterPage}>
      <input
        type="text"
        placeholder="Поиск по названию"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={style.filterPage_Search}
      />

      <div className={style.filterPage_Filters}>

      <select
        value={filters.category}
        onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
        className={style.filterPage_Filters_Category}
      >
        <option value="">Все категории</option>
        <option value="lecture">Лекция</option>
        <option value="concert">Концерт</option>
        <option value="sport">Спорт</option>
        <option value="theatre">Театр</option>
        <option value="other">Другие</option>
      </select>

      <input
        type="date"
        value={filters.date}
        onChange={(e) => dispatch(setFilters({ date: e.target.value }))}
        className={style.filterPage_Filters_Date}
        onClick={(e) => e.currentTarget.showPicker?.()}
      />

      <button
        onClick={() => {
          setSearchInput("");
          dispatch(clearFilters());
        }}
      >
        Сбросить
      </button>
      </div>

    </div>
  );
}