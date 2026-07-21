import { api } from "./axios";
import { Event } from "@/types/event";

export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

export const getEventById = async (id: string): Promise<Event> => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const createEvent = async (data: Partial<Event>) => {
  const response = await api.post("/events", data);
  return response.data;
};

export const updateEvent = async (
  id: string,
  data: Partial<Event>
): Promise<Event> => {
  const response = await api.patch(`/events/${id}`, data);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};