"use client";

import { useState } from "react";

import "./globals.scss";

import Header from "@/components/Header/header";
import EventFilter from "@/components/eventFilter/eventFilter";
import EventList from "@/components/eventList/eventList";
import EventForm from "@/components/EventForm/eventForm";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = () => {
    window.location.reload();
  };

  return (
    <main>
      <Header onCreate={() => setShowForm(true)} />

      {showForm && (
        <EventForm
          onClose={() => setShowForm(false)}
          onSuccess={handleSuccess}
        />
      )}

      <EventFilter />

      <EventList />
    </main>
  );
}