"use client";

import { useState } from "react";

import Header from "@/components/Header/header";
import EventFilter from "@/components/eventFilter/eventFilter";
import EventList from "@/components/eventList/eventList";
import EventForm from "@/components/EventForm/eventForm";


export default function EventsPage() {

  const [showForm, setShowForm] = useState(false);


  return (
    <main>

      <Header
        onCreate={() => setShowForm(true)}
      />


      {showForm && (
        <EventForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            window.location.reload();
          }}
        />
      )}


      <EventFilter />

      <EventList />


    </main>
  );
}