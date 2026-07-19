"use client";

import "./globals.scss";
import Header from "@/components/Header/header";
import EventFilter from "@/components/eventFilter/eventFilter";
import EventList from "@/components/eventList/eventList";

export default function Home() {
  return (
    <main>
      <Header />
      <EventFilter />
      <EventList />
    </main>
  );
}