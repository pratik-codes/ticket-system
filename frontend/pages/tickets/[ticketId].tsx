import { useRouter } from "next/router";

import { useQueryCall } from "../../utils/useQueryCall";

import { useState } from "react";
import { TicketCard } from "../../components/card";
import Dropdown from "../../components/dropdown";
import styles from "../../styles/Home.module.css";
import { useMutationCall } from "../../utils/useMutationCall";

const TicketDetails = () => {
  const [currentTicket, setCurrentTicket] = useState<any>();
  const router = useRouter();
  const ticketId = router.query.ticketId;

  const API_URL = `http://localhost:5000/tickets/${ticketId}`;

  const { data: ticket } = useQueryCall({
    apiUrl: API_URL,
    key: "tickets",
    reactQueryConfig: {
      enabled: !!ticketId,
      onSuccess: (data: any) => setCurrentTicket(data),
    },
  });

  const { mutate, isLoading } = useMutationCall({
    apiUrl: API_URL,
    reactQueryConfig: {
      onSuccess: (data: any) => {
        setCurrentTicket(data);
      },
    },
  });

  const { ticketName, ticketDescription, id, status } = currentTicket || {};

  const onStatusChangeHandler = (data: string) => {
    mutate({ updateStatus: data });
  };

  if (ticket)
    return (
      <>
        {/* {alert} */}
        {isLoading && (
          <div
            className="p-4 mb-4 text-sm text-green-700 bg-green-100  dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span className="font-medium mr-2">Success alert!</span> Ticked
            updated!
          </div>
        )}

        <div>
          <a
            href="/"
            className="inline-flex w-26 m-10 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Back
          </a>
        </div>
        <main className={styles.main}>
          <TicketCard
            ticketName={ticketName}
            ticketDescription={ticketDescription}
            id={id}
          />
          <Dropdown
            currentDropdownStatus={status}
            onClick={onStatusChangeHandler}
          />
        </main>
      </>
    );

  <>Loading...</>;
};

export default TicketDetails;
