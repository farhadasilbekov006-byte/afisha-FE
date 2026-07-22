import "./header.scss";

interface HeaderProps {
  onCreate: () => void;
}

export default function Header({ onCreate }: HeaderProps) {
  return (
    <header>
      <div>
        <img src="./img/calendar.png" alt="calendar" />

        <h1>Афиша</h1>
      </div>

      <button onClick={onCreate}>
        + Создать
      </button>
    </header>
  );
}