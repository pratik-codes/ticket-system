import { Inter } from "@next/font/google";

import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

interface TicketCard {
  ticketName: string;
  ticketDescription: string;
  id: number;
}

export const TicketCard = ({
  ticketName,
  ticketDescription,
  id,
}: TicketCard) => {
  return (
    <div className={styles.card}>
      <a href={`/tickets/${id}`} rel="noopener noreferrer">
        <h2 className={inter.className}>
          {ticketName} <span>-&gt;</span>
        </h2>
        <p className={inter.className}>{ticketDescription}</p>
      </a>
    </div>
  );
};
