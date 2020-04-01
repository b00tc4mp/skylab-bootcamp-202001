import React from "react";

export default function PublishEvent({createEvent}) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        const { title, description, date, location } = event.target;

        createEvent({title: title.value, description: description.value, date: date.value, location: location.value})
      }}
    >
      <input type="text" placeholder="title" name="title" />
      <input type="text" placeholder="description" name="description" />
      <input type="text" placeholder="location" name="location" />
      <input type="date" placeholder="date" name="date" />
      <button>Publish</button>
    </form>
  );
}
